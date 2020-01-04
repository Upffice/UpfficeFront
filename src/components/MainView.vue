<template>
    <div class="mainForm">
        <div v-if="!logIned">
            <div class="form-group">
              <label for="emp_id">id</label>
              <input type="text" id="emp_id" required v-model="employees.emp_id">
            </div>

            <div class="form-group">
              <label for="emp_pw">pw</label>
              <input type="password" id="emp_pw" required v-model="employees.emp_pw">
            </div>
            <button v-on:click="chkInput" class="btn btn-success">LogIn</button>
        </div>

        <div v-else>
            <h4>You logIned successfully!</h4>
            로그인 되었을 때 메인

        </div>
    </div>
</template>

<script>
    import http from "../http-common";

 let login_emp_id;
 export default {
   name: "employee-login",
   data() {
     return {
       employees: {
         emp_id: "",
         emp_pw:"",
       },
       logIned: false
     };
   },
   methods: {
     /* eslint-disable no-console */
           chkInput() {
                   if(document.getElementById('emp_id').value == "" ||
                       document.getElementById('emp_pw').value == "") {
                       alert("사번이나 비밀번호의 빈 칸을 확인해주세요!");
                    } else {
                         //getEmp_id();
                                var data = {
                                  emp_id: this.employees.emp_id,
                                  emp_pw: this.employees.emp_pw
                                };

                                http
                                  .post("/login", data)
                                  .then(response => {
                                    this.employees.emp_id = response.data;
                                    login_emp_id = response.data;
                                    chkLogin();
                                  })
                                  .catch(e => {
                                    console.log(e);
                                  });
                    }
           },


      chkLogin() {
           if(login_emp_id != 0){
                this.logIned = true;
                // pushEmpId();
           } else {
                alert("사번이나 비밀번호가 틀렸습니다!");
                this.logIned = false;
           }
      }
            /* eslint-enable no-console */
        }
    };
</script>

<style>
    .mainForm {
        max-width: 300px;
        margin: auto;
    }
</style>
