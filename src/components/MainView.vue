<template>
    <div class="mainForm">
        <div v-if="!logIned">
            <div class="form-group">
              <label for="emp_id">id</label>
              <input type="text" id="emp_id" required v-model="input.emp_id">
            </div>

            <div class="form-group">
              <label for="emp_pw">pw</label>
              <input type="password" id="emp_pw" required v-model="input.emp_pw">
            </div>
            <button v-on:click="login" class="btn btn-success">LogIn</button>
        </div>

        <div v-else>
            <h4>You logIned successfully!</h4>
            로그인 되었을 때 메인

        </div>
    </div>
</template>

<script>
    import http from "../http-common";

 var login_emp_id=0;
 export default {
   name: "employee-login",
   data() {
     return {
       input: {
         emp_id: "",
         emp_pw: ""
       },
       logIned: false
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
                 login_emp_id = response.data;
                 console.log(login_emp_id + " : 로그인 아이디 받아온 거");
                 console.log(logIned + " : 로그인 아이디 받아온 결과");
              })
              .catch(e => {
                console.log(e);
              });

           if(login_emp_id != 0) {
                this.logIned = true;
                                 console.log(login_emp_id + " : 아디비번 빈칸 아닐 때 로그인 아이디 받아온 거");
                                 console.log(logIned + " : 아디비번 빈칸 아닐 때 로그인 아이디 받아온 결과");
                //this.$emit("authenticated", true);
                //this.$router.replace({ name: "secure" });
             } else {
                alert("The username and / or password is incorrect");
             }
         } else {
            alert("A username and password must be present");
          } // End : if-else
    } // End - login()

   }
   };
</script>

<style>
    .mainForm {
        max-width: 300px;
        margin: auto;
    }
</style>
