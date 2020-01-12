<template>
    <div class="mainForm">
        <div v-if="!loginInfo.loginStatus">
            <div class="form-group">
                <label class="col-form-label col-form-label-lg idLbl" for="emp_id">사번</label>
                <input class="form-control form-control-lg" type="text" id="emp_id" v-on:keyup.enter="login" required v-model="input.emp_id" placeholder="사번을 입력해주세요">
            </div>

            <div class="form-group">
                <label class="col-form-label col-form-label-lg pwLbl" for="emp_pw">비밀번호</label>
                <input class="form-control form-control-lg"  type="password" v-on:keyup.enter="login" id="emp_pw" required v-model="input.emp_pw" placeholder="비밀번호를 입력해주세요">
            </div><br>

            <button v-on:click="login()" class="btn btn-primary btn-lg loginBtn">Login</button>
        </div>

        <div v-else>
            <h4>You logIned successfully!</h4>
            로그인 되었을 때 메인
<!--            {{this.$router.push("/mypage")}}-->
            <!--이 부분에 위 처럼 push해서 요약 페이지로 넘기기-->
        </div>

    </div>
</template>

<script>
import http from "../http-common";
// import {EventBus} from "../event-bus";

 export default {
   name: "employee-login",
   data() {
     return {
       input: {
         emp_id: "",
         emp_pw: ""
       },
       loginInfo: {
           loginStatus: "",
           loginId: ""
       },
       login_emp_id: 0
     };
   },
   methods: {
     /* eslint-disable no-console */
    login() {
         if(this.input.emp_id != "" && this.input.emp_pw != "") {
              var data = {
                emp_id: this.input.emp_id,
                emp_pw: this.input.emp_pw
              };
              http
              .post("/login", data)
              .then(response => {
                 this.login_emp_id = response.data;

                  if(this.login_emp_id != 0) {
                      this.loginInfo.loginId = this.login_emp_id;
                      this.loginInfo.loginStatus = true;
                      sessionStorage.setItem("login_id", this.loginInfo.loginId);
                      sessionStorage.setItem("login_status", this.loginInfo.loginStatus);

                      for(let i=0; i<1; i++) {
                          location.reload();// 로그인 시 한 번만 새로고침
                      }

                  } else {
                      alert("The username and / or password is incorrect");
                  }

              })
              .catch(e => {
                console.log(e);
              });

         } else {
            alert("A username and password must be present");
          } // End : if-else
    } // End - login()

   }, // End - methods
     mounted() {
         if (sessionStorage.length > 0) {
             this.loginInfo.loginStatus = sessionStorage.getItem("login_status");
         }
     }
   };
</script>

<style>
    .mainForm {
        max-width: 300px;
        margin: 100px auto auto;
    }
    .idLbl {
        margin-right: 250px;
        font-weight: bold;
    }
    .pwLbl {
        margin-right: 220px;
        font-weight: bold;
    }
    .loginBtn{
        width: 300px;
    }
</style>
