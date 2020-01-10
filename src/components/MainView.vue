<template>
    <div class="mainForm">
        <div v-if="!loginInfo.loginStatus">
            <div class="form-group">
                <label class="col-form-label col-form-label-lg" for="emp_id">ID</label>
                <input class="form-control form-control-lg" type="text"id="emp_id" v-on:keyup.enter="login" required v-model="input.emp_id" placeholder="사번">
            </div>

            <div class="form-group">
                <label class="col-form-label col-form-label-lg" for="emp_pw">PW</label>
                <input class="form-control form-control-lg"  type="password" v-on:keyup.enter="login" id="emp_pw" required v-model="input.emp_pw" placeholder="비밀번호">
            </div><br>

            <button v-on:click="login" class="btn btn-primary btn-lg">Login</button>
        </div>

        <div v-else>
            <h4>You logIned successfully!</h4>
            로그인 되었을 때 메인

        </div>
    </div>
</template>

<script>
import http from "../http-common";

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
                 console.log(this.login_emp_id + " : 로그인 아이디 받아온 거");

                  if(this.login_emp_id != 0) {
                      this.loginInfo.loginId = this.login_emp_id;
                      this.loginInfo.loginStatus = true;
                      localStorage.setItem("login_id", this.loginInfo.loginId);
                      localStorage.setItem("login_status", this.loginInfo.loginStatus);
                      console.log("로컬스토리지 : " + localStorage.getItem("login_id"));
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

   } // End - methods

   };
</script>

<style>
    .mainForm {
        max-width: 300px;
        margin: auto;
    }
</style>
