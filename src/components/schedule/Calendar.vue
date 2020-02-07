<template>
    <div class="schedule">
        <subMenu></subMenu>
            <div class="calendar">
                <div>
                    <span class="cal_nav">
                        <button class="btn btn-link btn-lg changeBtn" v-on:click="onClickPrev(currentMonth)">◀</button>
                        {{currentYear}}년 {{currentMonth}}월
                        <button class="btn btn-link btn-lg changeBtn" v-on:click="onClickNext(currentMonth)">▶</button>
                    </span>
                    <div class="form-inline search">
                        <input class="form-control mr-sm-2 searchInput" type="text" placeholder="일정 검색">
                        <button class="btn btn-secondary my-2 my-sm-0 searchBtn" type="submit">검색</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <td v-for="(weekName, index) in weekNames" v-bind:key="index">
                            {{weekName}}
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
                        <td class="calendarCell" v-for="(day, index2) in row" :key="index2">
                         <div v-if="day!==''">
                            <span v-if="isToday(currentYear, currentMonth, day)" class="rounded">
                              {{day}}
                            </span>

                            <span v-else>
                              {{day}}
                            </span>
                            </div>
                        <!--테이블 셀에 스크롤 달기 위한 div 태그 넣기 : 날짜가 있는 칸이면 내용 출력-->
                        <div v-if="day!==''&& hasScheduleToday(currentYear,currentMonth,day)" class="scrollDiv">
                            <span v-if="sche[0] == getCurrDate(currentYear,currentMonth,day)" v-for="(sche, index) in schedule" :key="index">
                                <span style="font-size: 15px" :style="{color: getCalColor(sche[1].calendar_id)}">
                                    ●
                                </span>&nbsp;
                                {{sche[1].sche_name}}<br>  <!-- 일정의 캘린별 색과 이름 넣기-->
                            </span>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                    <!--modal 컴포넌트 포함 시키기 위한 div-->
                    <modals-container/>
            </div>
    </div>
</template>

<script>
    import ScheduleSubMenu from "./ScheduleSubMenu";
    import http from "../../http-common";

    export default {
        name: 'Calendar',
        components: {
            subMenu: ScheduleSubMenu
        },
        data () {
            return {
                weekNames: ["월요일", "화요일", "수요일","목요일", "금요일", "토요일", "일요일"],
                rootYear: 1904,
                rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
                currentYear: new Date().getFullYear(),
                currentMonth: new Date().getMonth()+1,
                currentDay: new Date().getDate(),
                currentMonthStartWeekIndex: null,
                currentCalendarMatrix: [],
                endOfDay: null,
                memoData: [],
                emp_id: "",
                scheduleList: [],    // 모든 schedule 리스트를 담을 배열
                sche_name: "",       // 가져온 일정의 이름
                sche_date: [],       // 일정 날짜? -- 안 쓰는 변수 정리하기
                schedule: [],        // 가져온 일정 담을 배열
                selected_cal : [],   // ScheduleSubMenu 에서 선택한 캘린더 체크박스 목록
                calendarList: []     // 캘린더 목록
            }
        },
        methods: {
            init(){
                this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
                this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
                this.initCalendar();
            },
            getCalColor(calendar_id) {
                for(let i=0; i<this.calendarList.length; i++) {
                    if(this.calendarList[i].calendar_id == calendar_id) {
                        return this.calendarList[i].calendar_color;
                    }
                }
            },
            getCurrDate(year, month, day) {
                if(month < 10)  month = "0" + month;    // 형식을 맞추기 위하여 달이 한 자리 수일 때 앞에 0을 추가 해준다.
                if(day < 10) day = "0" + day;           // 형식을 맞추기 위하여 일자가 한 자리 수일 때 앞에 0을 추가 해준다.
                let sche_date = year + "-" + month + "-" + day;

                return sche_date;
            },
            hasScheduleToday(year,month,day) {
                if(month < 10)  month = "0" + month;    // 형식을 맞추기 위하여 달이 한 자리 수일 때 앞에 0을 추가 해준다.
                if(day < 10) day = "0" + day;           // 형식을 맞추기 위하여 일자가 한 자리 수일 때 앞에 0을 추가 해준다.
                let sche_date = year + "-" + month + "-" + day;

                for(let k=0; k<this.schedule.length; k++) {
                    let a = [];
                    a[k] = this.schedule[k].toString().split(",");
                    if(a[k][0] == sche_date) return true;
                }
            },
            getAllSchedules() {
                this.sche_date = [];
                this.sche_name = [];
                this.schedule = [];

                let year = this.currentYear;
                let month = this.currentMonth;

                if(month < 10)  month = "0" + month;    // 형식을 맞추기 위하여 달이 한 자리 수일 때 앞에 0을 추가 해준다.

                for(let i=1; i<=this.endOfDay; i++) {
                    let date = i;
                    if(date < 10) date = "0" + date;
                    let sche_date = year + "-" + month + "-" + date;

                        http
                            .post("/schedule/all/" + this.emp_id, sche_date)
                            .then(response=> {
                                /* eslint-disable no-console */
                                this.scheduleList = response.data;
                                for(let j=0; j<this.scheduleList.length; j++) {
                                    this.schedule.push([sche_date, this.scheduleList[j]]);    //  배열에 해당 날짜와 일정 이름 넣기
                                }
                            })
                            .catch(e => {
                                /* eslint-disable no-console */
                                console.log(e);
                            });
                }
            },
            initCalendar(){
                this.currentCalendarMatrix = [];
                let day=1;
                for(let i=0; i<6; i++){
                    let calendarRow = [];
                    for(let j=0; j<7; j++){
                        if(i==0 && j<this.currentMonthStartWeekIndex){
                            calendarRow.push("");
                        }
                        else if(day<=this.endOfDay){
                            calendarRow.push(day);
                            day++;
                        }
                        else{
                            calendarRow.push("");
                        }
                    }
                    this.currentCalendarMatrix.push(calendarRow);
                }
                // currentCalendarMatrix 생성된 후
                this.getAllSchedules();
            },
            getEndOfDay(year, month){
                switch(month){
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                        break;
                    case 2:
                        if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                            return 29;
                        }
                        else{
                            return 28;
                        } // 윤달 체크 조건
                        break;
                    default:
                        console.log("unknown month " + month);
                        return 0;
                        break;
                }
            },
            getStartWeek(targetYear, targetMonth){
                let year = this.rootYear;
                let month = 1;
                let sumOfDay = this.rootDayOfWeekIndex;
                while(true){
                    if(targetYear > year){
                        for(let i=0; i<12; i++){
                            sumOfDay += this.getEndOfDay(year, month+i);
                        }
                        year++;
                    }
                    else if(targetYear == year){
                        if(targetMonth > month){
                            sumOfDay += this.getEndOfDay(year, month);
                            month++;
                        }
                        else if(targetMonth == month){
                            return (sumOfDay)%7;
                        }
                    }
                }
            },
            onClickPrev(month){
                month--;
                if(month<=0){
                    this.currentMonth = 12;
                    this.currentYear -= 1;
                }
                else{
                    this.currentMonth -= 1;
                }
                this.init();
            },
            onClickNext(month){
                month++;
                if(month>12){
                    this.currentMonth = 1;
                    this.currentYear += 1;
                }
                else{
                    this.currentMonth += 1;
                }
                this.init();
            },
            isToday(year, month, day){
                let date = new Date();
                return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate();
            },
/*            getSchedule(year, month, day){
                // 한 자릿 수일 때 0추가
                if(month < 10)  month = "0" + month;
                if(day < 10) day = "0" + day;

                // 해당 년, 월, 일
                let sche_date = year + "-" + month + "-" + day;

                if (this.selected_cal !== null) { // 선택한 calendar_id 배열 가져오기

                    if(this.selected_cal.includes('0')) { // selected_cal 에 0이 포함되어 있다면 전체 일정이 check 되어 있으므로 전체 일정만 불러오기 위해 selected_cal 에 0만 넣는다.

                        console.log("gelAllSchedule이 실행되어야하는디..? - calendar_id " + this.selected_cal + "/ "+ sche_date)
                        http
                            .post("/schedule/all/" + this.emp_id, sche_date)
                            .then(response=> {
                                 /!* eslint-disable no-console *!/
                                this.scheduleList = response.data;
                                for(let i=0; i<this.scheduleList.length; i++) {
                                    this.sche_name = this.scheduleList[i].sche_name;
                                    console.log("sche_name : " + this.sche_name);
                                }

                            })
                            .catch(e => {
                                /!* eslint-disable no-console *!/
                                console.log(e);
                            });
                    }
                    //else {
                    //     console.log("/schedule/list/ 이 실행되어야하는디..?")
                    //     http
                    //         .post("/schedule/list/" + this.emp_id, selected_cal, sche_date)
                    //         .then(response=> {
                    //             /!* eslint-disable no-console *!/
                    //             console.log("getSchedule"+response.data);
                    //             this.scheduleList = response.data;
                    //         })
                    //         .catch(e => {
                    //             /!* eslint-disable no-console *!/
                    //             console.log(e);
                    //         });
                    // }

                } // End : if-else

            },*/
            getCalendarList() {
                http
                    .post("/calendar/list/" + this.emp_id)
                    .then(response=> {
                        /* eslint-disable no-console */
                        this.calendarList = response.data;
                    })
                    .catch(e => {
                        /* eslint-disable no-console */
                        console.log(e);
                    });
            }
        },
        mounted() {
            if (sessionStorage.length > 0) {
                this.emp_id = sessionStorage.getItem("login_id");
                this.init();
                this.getCalendarList();
            } else {
                this.$router.push("/");
            }
        }

    }
</script>

<style>
    .calendar {
        width: 75%;
        margin-left: 265px;
    }
    .cal_nav {
        font-size: 30px;
        margin: auto auto auto 265px;
    }
    .changeBtn {
        font-size: 25px;
    }
    .rounded {
        -moz-border-radius:20px 20px 20px 20px;
        border-radius:20px 20px 20px 20px;
        border:solid 1px #ffffff;
        background-color:#2b6bd1;
        padding:10px;
        color:#ffffff;
    }
    .search {
        float: right;
    }
    .searchInput {
        width: 300px;
    }
    .calendarCell {
        width: 100px;
        height: 150px;
    }
    .scrollDiv {
        text-align: left;
        overflow: auto;
        width: 100px;
        height:100px;
        margin: 15px auto;  /*top 10px*/
        font-size: 11px;
        /*text-overflow: ellipsis; !*말 줄임표 위한 설정*!*/
        /*white-space: nowrap; !*말 줄임표 위한 설정*!*/
        overflow-x: hidden; /*가로 스크롤바 없애기*/
        -ms-overflow-style: none; /*IE에서 스크롤바 투명하게 하기*/
    }
    .scrollDiv::-webkit-scrollbar { /*IE 제외한 브라우저에서 스크롤바 투명하게 하기*/
        width: 1px;
        background: transparent;
    }
</style>