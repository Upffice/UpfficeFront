<template>
    <div class="myPage">
        <!--수정 가능한 항목 : 휴대폰 번호, 비밀번호-->
        <!--왼쪽에 사진, 업로드-수정부분-->
        <!--비밀번호 변경 누르면 변경 창 띄우기? - 현재 비밀번호, 비밀번호, 확인 해서 수정-->
        <h4>마이페이지</h4>
        <table class="table table-hover mypageTbl">
            <tr>
                <td rowspan="17">이미지 들어갈 부분<br>
                {{employee.emp_name}} 님</td>
                <th>사번</th>
                <td>{{employee.emp_id}}</td>
            </tr>
            <tr>
                <th>비밀번호</th>
                <td><button class="btn btn-secondary" @click="openWin">비밀번호변경</button></td>
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
                <td><input class="form-control" type="text" placeholder="000-0000-0000" required v-model="employee.phone_number"></td>
            </tr>
        </table><br><br>
        <button class="btn btn-primary btn-lg" @click="updatePhone(employee.emp_id)">수정하기</button>
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
        }, // 부서 정보 가져오기
        updatePhone(id) {
            let phone = this.employee.phone_number;
            if(phone == "") {
                alert("Don't leave the input of phone number blank!");
            } else {
                http
                    .put("/mypage/update/phone/" + id, phone)
                    .then(response => {
                        if (response.data == 1) {
                            alert("수정 완료!")
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }, // End - updatePhone()
        openWin() {
            var ret = window.open("/mypage/popup?id="+this.employee.emp_id, "비밀번호 수정", "width=500", true );

        }
    },
    mounted() {
        if (sessionStorage.length > 0) {
            this.employee.emp_id = sessionStorage.getItem("login_id");
            this.getEmpInfo(this.employee.emp_id); // 사원 정보 가져오기
        }
    }

}
</script>

<style scoped>
    .myPage {
        margin: auto;
        width: 90%;
    }
    .form-control {
        width: 200px;
        margin: auto;
    }
    .mypageTbl {
        margin: 30px auto auto;
    }
</style>