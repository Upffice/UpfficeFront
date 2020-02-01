<template>
    <div class="employeesMgm">
        <div>
            <h2>직원 관리</h2>
            <hr>

            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                <small id="fileHelp" class="form-text text-muted">
                    This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                </small>
            </div>


            <button v-on:click="addEmployees">직원 추가</button>


            <div class="form-inline my-2 my-lg-0" style="margin-bottom: 2px; float: right">
                <fieldset>
                    <input type="text" v-on:keypress="searchNameAndPosition" placeholder="검색(이름, 직책 입력)"
                           class="form-control mr-sm-2" id="nameAndPosition"
                           style="margin-right: 0px !important;  margin-top: 10px;"
                           required v-model="nameAndPosition" name="nameAndPosition"/>


                    <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                            style="margin-left: 0px;  margin-top: 10px !important; " v-on:click="searchNameAndPosition">
                        검색
                    </button>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                            style="margin-left: 0px;  margin-top: 10px !important; " v-on:click="refreshList">취소
                    </button>
                </fieldset>
            </div>

            <table id="go-to-detail" class="table table-hover" style="margin-top: 20px">
                <!--출력부분-->
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
        </div>
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
                this.nameAndPosition = "";
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
            searchNameAndPosition() {
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
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.retrieveEmployees();
            } else {
                this.$router.push("/");
            }

        },

    }
</script>

<style scoped>
    #nameAndPosition {
        width: 200px;
    }

    .form-group, btn-group {
        float: right;
    }

</style>