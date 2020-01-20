<template>
    <div class="schedule">
        <subMenu></subMenu>
            <div class="calendar">
<!--                <div class="form-inline search">-->
<!--                    <input class="form-control mr-sm-2 searchInput" type="text" placeholder="일정 검색">-->
<!--                    <button class="btn btn-secondary my-2 my-sm-0 searchBtn" type="submit">검색</button>-->
<!--                </div>-->
                <div>
                    <span class="cal_nav">
                        <button class="btn btn-link btn-lg monChangeBtn" v-on:click="onClickPrev(currentMonth)">◀</button>
                        {{currentYear}}년 {{currentMonth}}월
                        <button class="btn btn-link btn-lg monChangeBtn" v-on:click="onClickNext(currentMonth)">▶</button>
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
                        <td class="calendarCell" @click="addSchedule(currentYear,currentMonth,day)" v-for="(day, index2) in row" :key="index2">
                        <span v-if="isToday(currentYear, currentMonth, day)" class="rounded">
                          {{day}}
                        </span>
                            <span v-else>
                          {{day}}
                        </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="modal">
                    <!--modal 컴포넌트 포함 시키기 위한 div-->
                    <modals-container/>
                </div>
            </div>
    </div>
</template>

<script>
    import ScheduleSubMenu from "./ScheduleSubMenu";
    import RegisterPopup from "./RegisterPopup";
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
                emp_id: ""
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
            addSchedule(year, month, day) {
                if(day==""){ // 달력에 없는 일자일 경우(day 정보가 없는 경우)
                    return;
                } else {
                    /*this.$modal.show(RegisterPopup, {
                            registerData : 'data',
                            modal : this.$modal
                    },
                    {
                            name: 'dynamic-modal',
                            width:'400px',
                            height: '600px',
                            draggable: true
                    });*/
                    this.$modal.show(RegisterPopup,{
                        hot_table : 'data',
                        modal : this.$modal },{
                        name: 'dynamic-modal',
                        width : '330px',
                        height : '130px',
                        draggable: true,
                    })
                } // End : if-else
            }
        },
        mounted() {
            if (sessionStorage.length > 0) {
                this.emp_id = sessionStorage.getItem("login_id");
                this.init();
            } else {
                this.$router.push("/");
            }
        }
    }
</script>

<style>
    .calendar {
        width: 80%;
        margin-left: 265px;
    }
    .cal_nav {
        font-size: 30px;
        margin: auto auto auto 265px;
    }
    .monChangeBtn {
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
    .calendarCell:hover{
        background: lightblue;
    }
    .calendarCell {
        width: 100px;
        height: 100px;
    }
</style>