<template>
    <div class="list row">
    <div v-if="this.employees">
<br><br><br><br><br><br><br><br><br>
        <h4>&#60;상세정보&#62;</h4>
        <div>
            <label>이름: </label> {{this.employees.name}}
        </div>
        <div>
            <label>부서: </label> {{this.employees.dep_id}}
        </div>
        <div>
            <label>직책: </label> {{this.employees.position}}
        </div>
        <div>
            <label>휴대폰: </label> {{this.employees.phone_number}}
        </div>
        <div>
            <label>email: </label> {{this.employees.emp_email}}
        </div>
        <div>
            <label>내선번호: </label> {{this.employees.extension_number}}
        </div>

        <span>메시지</span>
        <router-link to="/mainEmployAddress">취소</router-link>
    </div>
    <div v-else>
        <br/>
        <p>Please click on a Board...</p>
    </div>
    </div>

</template>

<script>


    export default {
        name: "employees",
        props: ["employees"],
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