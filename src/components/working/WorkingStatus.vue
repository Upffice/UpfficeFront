<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-12">
            <h4>근태</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>날짜</td>
                    <td>출근시각</td>
                    <td>퇴근시각</td>
                    <td>근무시간</td>
                </tr>
                </thead>
                <tr v-for="(working, index) in workings" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{working}}</td>
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
                workings: [],
                thisMonth:'',
                empId:""
            };
        },// End - data
        components: {
            subMenu: WorkingSubMenu
        },// End - components
        methods: {
            /* eslint-disable no-console */

            /* eslint-enable no-console */
        },// End - methods
        mounted() {// mounted 될때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empId = sessionStorage.getItem("login_id");
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
