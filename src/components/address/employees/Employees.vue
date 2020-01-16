<template>                                                                  <!--상세페이지 출력부분-->
    <div class="list row">
    <div v-if="this.employee">
<br><br><br><br><br><br><br><br>
        <h4>&#60;상세정보&#62;</h4>

        <table boder="2" class="table table-hover">                             <!--이름 눌렀을때 나오는 부분-->
            <tr><a>사진</a></tr>
            <tr><th>이름</th><td>{{this.employee.name}}</td></tr>
            <tr><th>부서</th><td>{{this.employee.dep_id}}</td></tr>
            <tr><th>직책</th><td>{{this.employee.position}}</td></tr>
            <tr><th>휴대폰</th><td>{{this.employee.phone_number}}</td></tr>
            <tr><th>email</th><td>{{this.employee.emp_email}}</td></tr>
            <tr><th>내선번호</th><td> {{this.employee.extension_number}}</td></tr>
            <tr><td>메시지</td><td>  <router-link to="/mainEmployAddress">취소</router-link></td></tr>
        </table>
        <span></span>

    </div>
    <div v-else>
        <br/>
        <p>Please click on a Board...</p>
    </div>
    </div>

</template>

<script>
    import http from "../../../http-common";

    export default {
        name: "employees-details",
        props: ["employee"],
        methods: {

        }
    }
</script>

<style>
    .list {

        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>