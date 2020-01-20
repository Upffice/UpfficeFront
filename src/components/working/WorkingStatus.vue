<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-12">
            <h4>근태</h4>
            <button class="btn btn-success btn-lg btn-block" v-on:click="weeks.week1.show = !weeks.week1.show">
                1주차
            </button>
            <table v-if="weeks.week1.show" class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in weeks.week1.workings" :key="index">
                    <td>{{working.workingDate}}</td>
                    <td>{{working.workingIn}}</td>
                    <td>{{working.workingOut}}</td>
                    <td>{{working.workingTime}}</td>
                </tr>
            </table>
            <button class="btn btn-success btn-lg btn-block" v-on:click="weeks.week2.show = !weeks.week2.show">
                2주차
            </button>
            <table v-if="weeks.week2.show" class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in weeks.week2.workings" :key="index">
                    <td>{{working.workingDate}}</td>
                    <td>{{working.workingIn}}</td>
                    <td>{{working.workingOut}}</td>
                    <td>{{working.workingTime}}</td>
                </tr>
            </table>
            <button class="btn btn-success btn-lg btn-block" v-on:click="weeks.week3.show = !weeks.week3.show">
                3주차
            </button>
            <table v-if="weeks.week3.show" class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in weeks.week3.workings" :key="index">
                    <td>{{working.workingDate}}</td>
                    <td>{{working.workingIn}}</td>
                    <td>{{working.workingOut}}</td>
                    <td>{{working.workingTime}}</td>
                </tr>
            </table>
            <button class="btn btn-success btn-lg btn-block" v-on:click="weeks.week4.show = !weeks.week4.show">
                4주차
            </button>
            <table v-if="weeks.week4.show" class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in weeks.week4.workings" :key="index">
                    <td>{{working.workingDate}}</td>
                    <td>{{working.workingIn}}</td>
                    <td>{{working.workingOut}}</td>
                    <td>{{working.workingTime}}</td>
                </tr>
            </table>
            <button class="btn btn-success btn-lg btn-block" v-on:click="weeks.week5.show = !weeks.week5.show">
                5주차
            </button>
            <table v-if="weeks.week5.show" class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in weeks.week5.workings" :key="index">
                    <td>{{working.workingDate}}</td>
                    <td>{{working.workingIn}}</td>
                    <td>{{working.workingOut}}</td>
                    <td>{{working.workingTime}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import WorkingSubMenu from "./WorkingSubMenu";

    export default {
        name: "working-status",
        data() {
            return {
                // workings: [],
                pageMonth: '',
                firstWeek: [],
                weeks: {
                    week1: {workings: [], show: false},
                    week2: {workings: [], show: false},
                    week3: {workings: [], show: false},
                    week4: {workings: [], show: false},
                    week5: {workings: [], show: false}
                },
                empId: '',
                show: false
            };
        },// End - data
        components: {
            subMenu: WorkingSubMenu
        },// End - components
        methods: {
            /* eslint-disable no-console */
            readWorkings() {// 근태기록을 조회하는 메소드
                var workings = [];
                http
                    .get("/working/workings/" + this.empId)
                    .then(response => {
                        // this.workings = response.data; // JSON are parsed automatically.
                        workings = response.data;
                        console.log(response.data);
                        this.divideWeekly(workings);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },// End - readWorkings()
            divideWeekly(workings) {// 근태기록을 주차별로 나누는 메소드
                var moment = require('moment');
                var i = 0;
                for (var j=0; i<workings.length&&this.weekOfMonth(moment(workings[i].workingDate.toString())) == 1; j++) {
                    this.weeks.week1.workings[j] = workings[i];
                    i++;
                }
                for ( j=0; i<workings.length&&this.weekOfMonth(moment(workings[i].workingDate.toString())) == 2; j++) {
                    this.weeks.week2.workings[j] = workings[i];
                    i++;
                }for (j=0; i<workings.length&&this.weekOfMonth(moment(workings[i].workingDate.toString())) == 3; j++) {
                    this.weeks.week3.workings[j] = workings[i];
                    i++;
                }
                for (j=0; i<workings.length&&this.weekOfMonth(moment(workings[i].workingDate.toString())) == 4; j++) {
                    this.weeks.week4.workings[j] = workings[i];
                    i++;
                }
                for (j=0; i<workings.length; j++) {
                    this.weeks.week5.workings[j] = workings[i];
                    i++;
                }
            },// End -  divideWeekly(workings)
            weekOfMonth(date) {// 특정 날짜가 달의 몇 번째 주에 해당하는 지 반환 하는 메소드
                const firstDayOfMonth = date.clone().startOf('month');
                const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

                const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');

                return Math.ceil((date.date() + offset) / 7);
            }// End -  weekOfMonth(date)
            /* eslint-enable no-console */
        },// End - methods
        mounted() {// mounted 될때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empId = sessionStorage.getItem("login_id");
                this.readWorkings();
            } else {
                this.$router.push("/");
            }
        } // End - mounted()
    };// End - export default
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>
