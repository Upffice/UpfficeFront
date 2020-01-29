<template>                                                                  <!--내부주소록 첫화면-->
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>내부 주소록</h4>
            <hr>
            <div class="searchform">
                <div class="form-group">                                         <!--이름,직책 으로 검색-->
                    <input type="text" v-on:keypress="searchNameAndPosition" placeholder="이름, 직책 입력"
                           class="form-control mr-sm-2" id="nameAndPosition"
                           required v-model="nameAndPosition" name="nameAndPosition">
                </div>
                <div class="btn-group">
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="searchNameAndPosition">검색</button>
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="refreshList">취소</button>
                </div>
            </div>
            <br>
            <hr>

            <table boder="2" class="table table-hover">                             <!--출력부분-->
                <thead class="table-secondary"><tr>
                    <th colspan="2">경영전략실</th>
                </tr></thead>
                <tr v-if="employee.dep_id==0" v-for="(employee, index) in employees" :key="index">
                    <td>
                        <router-link :to="{
                   name : 'employees-details',
                   params: { employee: employee, emp_id: employee.emp_id}
                       }">
                            {{employee.name}}
                        </router-link>
                    </td>

                    <td>{{employee.position}}</td>
                </tr>
                <thead class="table-primary"><tr><th colspan="2">개발팀</th></tr></thead>
                <tr v-if="employee.dep_id==1" v-for="(employee, index) in employees" :key="index">
                    <td>
                        <router-link :to="{
                   name : 'employees-details',
                   params: { employee: employee, emp_id: employee.emp_id}
                       }">
                            {{employee.name}}
                        </router-link>
                    </td>

                    <td>{{employee.position}}</td>
                </tr>
                <thead class="table-primary"><tr><th colspan="2">인사팀</th></tr></thead>
                <tr v-if="employee.dep_id==2" v-for="(employee, index) in employees" :key="index">
                    <td>
                        <router-link :to="{
                   name : 'employees-details',
                   params: { employee: employee, emp_id: employee.emp_id}
                       }">
                            {{employee.name}}
                        </router-link>
                    </td>

                    <td>{{employee.position}}</td>
                </tr>
                <thead class="table-primary"><tr><th colspan="2">홍보마케팅팀</th></tr></thead>
                <tr v-if="employee.dep_id==3" v-for="(employee, index) in employees" :key="index">
                    <td>
                        <router-link :to="{
                   name : 'employees-details',
                   params: { employee: employee, emp_id: employee.emp_id}
                       }">
                            {{employee.name}}
                        </router-link>
                    </td>

                    <td>{{employee.position}}</td>
                </tr>
                <thead class="table-primary"><tr><th colspan="2">영업팀</th></tr></thead>
                <tr v-if="employee.dep_id==4" v-for="(employee, index) in employees" :key="index">
                    <td>
                        <router-link :to="{
                   name : 'employees-details',
                   params: { employee: employee, emp_id: employee.emp_id}
                       }">
                            {{employee.name}}
                        </router-link>
                    </td>

                    <td>{{employee.position}}</td>
                </tr>
            </table>

        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
        <router-link to="/"></router-link>
    </div>


</template>


<script>
    import http from "../../../http-common";
    import AddressSubMenu from "../AddressSubMenu";

    export default {
        name: "MainEmployAddress",
        data() {
            return {
                nameAndPosition: "",
                employees: []
            };

        },
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
            searchNameAndPosition() {                                                           /*이름으로 검색*/
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

        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.retrieveEmployees();

            } else {
                this.$router.push("/");
            }

        },
        components: {
            AddressSubMenu,
        },

    }
</script>

<style scoped>
    .list {
        text-align: center;
        max-width: 90%;
        /*  margin: auto;*/
        margin-left: 15%;
    }
    .table {
        width: 80%;
        margin: auto;
        text-align: center;
    }

</style>