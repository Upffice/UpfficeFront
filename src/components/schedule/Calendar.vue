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
                                {{getSchedule(currentYear, currentMonth, day)}}
                        <span v-if="isToday(currentYear, currentMonth, day)" class="rounded">
                          {{day}}
                        </span>

                        <span v-else>
                          {{day}}
                        </span>
                            </div>
                        <!--테이블 셀에 스크롤 달기 위한 div 태그 넣기 : 날짜가 있는 칸이면 내용 출력-->
                        <div v-if="day!==''" class="scrollDiv">
                            일정:{{}}
<!--                            <span v-for="(schedule, index3) in scheduleList" :key="index3">a{{schedule.sche_name}}</span>-->
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
    import * as response from "vue";

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
                sche_name: "",
                sche_date: "",
                schedule: []
            }
        },
        methods: {
            init:function(){
                this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
                this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
                this.initCalendar();
            },
            initCalendar:function(){
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
            },
            getEndOfDay: function(year, month){
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
            getStartWeek: function(targetYear, targetMonth){
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
            onClickPrev: function(month){
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
            onClickNext: function(month){
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
            isToday: function(year, month, day){
                let date = new Date();
                return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate();
            },
            showCellDetail(year, month, day) {  // 테이블 cell 클릭 시 상세 정보 모달 띄우기
                if(day!==""){

                }

            },
            // getAllSchedules(sche_date) { // 모든 스케줄 가져오기
            //     http
            //         .get("/schedule/all/" + this.emp_id, sche_date)
            //         .then(response=> {
            //             /* eslint-disable no-console */
            //             console.log("getAllSchedules" + response.data);
            //             this.scheduleList = response.data;
            //         })
            //         .catch(e => {
            //             /* eslint-disable no-console */
            //             console.log(e);
            //         });
            // },
            getSchedule(year, month, day){
                // 한 자릿 수일 때 0추가
                if(month < 10)  month = "0" + month;
                if(day < 10) day = "0" + day;

                // 해당 년, 월, 일
                let sche_date = year + "-" + month + "-" + day;
                let selected_cal = sessionStorage.getItem("calendar");

                if (selected_cal !== null) { // 선택한 calendar_id 배열 가져오기

                    if(selected_cal.includes('0')) { // selected_cal 에 0이 포함되어 있다면 전체 일정이 check 되어 있으므로 전체 일정만 불러오기 위해 selected_cal 에 0만 넣는다.

                        console.log("gelAllSchedule이 실행되어야하는디..? - calendar_id " + selected_cal+"/ "+ sche_date)
                        http
                            .post("/schedule/all/" + this.emp_id, sche_date)
                            .then(response=> {
                                 /* eslint-disable no-console */
                                 this.scheduleList = response.data;
                                for(let i=0; i<this.scheduleList.length; i++) {
                                    this.sche_name = this.scheduleList[i].sche_name;
                                    console.log("sche_name : " + this.sche_name);
                                }
                            })
                            .catch(e => {
                                /* eslint-disable no-console */
                                console.log(e);
                            });
                    }
                    //else {
                    //     console.log("/schedule/list/ 이 실행되어야하는디..?")
                    //     http
                    //         .post("/schedule/list/" + this.emp_id, selected_cal, sche_date)
                    //         .then(response=> {
                    //             /* eslint-disable no-console */
                    //             console.log("getSchedule"+response.data);
                    //             this.scheduleList = response.data;
                    //         })
                    //         .catch(e => {
                    //             /* eslint-disable no-console */
                    //             console.log(e);
                    //         });
                    // }

                } // End : if-else

            },
            // getSche_name() {
            //     if(this.scheduleList.length >0){
            //         this.schedule = this.scheduleList[i];
            //         console.log("aaa"+this.schedule[0].sche_name);
            //         // for(let i=0; i<this.scheduleList.length; i++) {
            //         //     // this.sche_name = this.scheduleList[i].sche_name;
            //         //     this.schedule = this.scheduleList[i];
            //         //     console.log("aaa"+this.schedule.sche_name);
            //         // }
            //     }
            //
            //     return "";
            // }
        },
        mounted() {
            if (sessionStorage.length > 0) {
                this.emp_id = sessionStorage.getItem("login_id");
                this.init();
            } else {
                this.$router.push("/");
            }
        },

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
        overflow: auto;
        width: 100px;
        height:100px;
        margin: 15px auto;  /*top 10px*/
        font-size: 11px;
        text-overflow: ellipsis; /*말 줄임표 위한 설정*/
        white-space: nowrap; /*말 줄임표 위한 설정*/
        overflow-x: hidden; /*가로 스크롤바 없애기*/
        -ms-overflow-style: none; /*IE에서 스크롤바 투명하게 하기*/
    }
    .scrollDiv::-webkit-scrollbar { /*IE 제외한 브라우저에서 스크롤바 투명하게 하기*/
        width: 1px;
        background: transparent;
    }
</style>