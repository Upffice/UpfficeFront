<template>
    <div v-if="login_status">
        <!--수정 가능한 항목 : 사진, 이메일, 휴대폰 번호, 비밀번호-->
        <!--왼쪽에 사진, 업로드-수정부분-->
        <!--비밀번호 변경 누르면 변경 창 띄우기? - 현재 비밀번호, 비밀번호, 확인 해서 수정-->
        <table class="table table-hover">
            <tr>
                <td rowspan="17">이미지 들어갈 부분<br>
                {{employee.emp_name}} 님</td>
                <th>사번</th>
                <td>{{employee.emp_id}}</td>
            </tr>
            <tr>
                <th>비밀번호</th>
                <td><button>비밀번호변경</button></td>
            </tr>
            <tr>
                <th>소속</th>
                <td>{{dep_name}}</td>
            </tr>
            <tr>
                <th>직책</th>
                <td>{{employee.position}}</td>
            </tr>
            <tr>
                <th>내선번호</th>
                <td>{{employee.extension_number}}</td>
            </tr>
            <tr>
                <th>입사일</th>
                <td>{{employee.hire_date}}</td>
            </tr>
            <tr>
                <th>이메일</th>
                <td>{{employee.emp_email}}</td>
            </tr>
            <tr>
                <th>휴대폰 번호</th>
                <td>{{employee.phone_number}}</td>
            </tr>
        </table>

    </div>

    <div v-else>
        ex) 마이페이지에서 로그아웃 한 경우
        로그인 페이지로 redirect 해야함
    </div>
</template>

<script>
    import http from "../../http-common";
export default {
    name: "employee-info",
    data() {
        return {
          employee: {
            emp_id: "",
            emp_pw: "",
            emp_name: "",
            emp_email: "",
            position: "",
            hire_date: "",
            extension_number: "",
            phone_number: "",
            dep_id: ""
          },
          login_status : "",
          dep_name : ""
          // 정보수정 시 확인하는 변수 추가...?
        };
    },
    methods: {
        getEmpInfo(id) {
            http
            .post("/mypage/" + id)
            .then(response => {
                this.employee.emp_pw = response.data.emp_pw;
                this.employee.emp_name = response.data.emp_name;
                this.employee.emp_email = response.data.emp_email;
                this.employee.position = response.data.position;
                this.employee.hire_date = response.data.hire_date;
                this.employee.extension_number = response.data.extension_number;
                this.employee.phone_number = response.data.phone_number;
                this.employee.dep_id = response.data.dep_id;

                this.getDep_Name(this.employee.dep_id); // 사원 정보 중 부서 이름 가져오기
            })
            .catch(e => {
                console.log(e);
            });
        }, // 사원 정보 가져오기
        getDep_Name(dep_id) {
            http
            .post("/dep/" + dep_id)
            .then(response => {
                this.dep_name = response.data;
            })
            .catch(e => {
                    console.log(e);
            });
        } // 부서 정보 가져오기
    },
    mounted() {
        if (localStorage.length > 0) {
            this.employee.emp_id = localStorage.getItem("login_id");
            this.login_status = localStorage.getItem("login_status");
            this.getEmpInfo(this.employee.emp_id); // 사원 정보 가져오기

        }

    }

}
</script>

<style scoped>

</style>