<template>
    <div class="employeesMgm">
        <div>
            <h2>직원 관리</h2>
            <label>사진 업로드 자리</label>
            <button v-on:click="addEmployees">직원 추가</button>
            <div class="form-group">
                <input type="text" v-on:keypress="searchNameAndPosition" placeholder="검색(이름, 직책 입력)"
                       class="form-control mr-sm-2" id="nameAndPosition"
                       required v-model="nameAndPosition" name="nameAndPosition"/>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary my-2 my-sm-0" v-on:click="searchNameAndPosition">검색</button>
                <button class="btn btn-secondary my-2 my-sm-0" v-on:click="refreshList">취소</button>
                <router-link to="/manager/out-address">외부주소록</router-link>
            </div>

        </div>

        <table id="go-to-detail" boder="2" class="table table-hover">                             <!--출력부분-->
            <thead class="table-secondary">
            <tr>
                <th>아이디</th>
                <th>성명</th>
                <th>이메일</th>
                <th>직책</th>
                <th>입사일</th>
                <th>내선번호</th>
                <th>휴대폰번호</th>
                <th>부서</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(employee, index) in employees" :key="index">
                <td>
                    <router-link :to="{
                            name: 'EmployeesMgmDetail',
                            params: { employee: employee, emp_id: employee.emp_id }
                        }">
                        {{employee.emp_id}}
                    </router-link>
                </td>
                <td>{{employee.name}}</td>
                <td>{{employee.emp_email}}</td>
                <td>{{employee.position}}</td>
                <td>{{employee.hire_date}}</td>
                <td>{{employee.extension_number}}</td>
                <td>{{employee.phone_number}}</td>
                <td>{{employee.dep_id}}</td>
            </tr>

            </tbody>
        </table>

        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>

    </div>
</template>

<script>
    import http from "../../http-common";

    export default {
        name: "employeesManagement",
        data() {
            return {
                employees: [],
                emp_id: "",
                nameAndPosition: ""
            };


        },/*END-OF-data*/
        methods: {
            retrieveEmployees() {
                http
                    .get("/employees/employees")
                    .then(response => {
                        this.employees = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveEmployees();
                this.nameAndPosition="";
            },
            /*  goToDetail(id) {
                   console.log("디테일로 갑니까?"),
                  this.$router.push('EmployeesMgmDetail',{
                      params : {employee:this.employee, id: this.employee.emp_id},

                  })
                      console.log(emp_id)
              }*/

            addEmployees() {
                this.$router.push('/manager/add-employees')
            },
            searchNameAndPosition(){
                http
                    .get("/employees/employees/nameAndPosition/" + this.nameAndPosition)
                    .then(response => {
                        this.employees = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },/*END-OF-methods*/
        mounted() {
            this.retrieveEmployees();
        },

    }
</script>

<style scoped>
#nameAndPosition{
    width: 200px;
}
    .form-group,btn-group{
        float: right;
    }

</style>