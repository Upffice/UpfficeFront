<template>                                                                  <!--내부주소록 첫화면-->
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h3>내부 주소록</h3>
            <div class="form-inline my-2 my-lg-0" style="margin-bottom: 2px; float: right">
                <fieldset>
                    <!--이름,직책 으로 검색-->
                    <input type="text" v-on:keypress="searchNameAndPosition" placeholder="이름, 직책 입력"
                           class="form-control mr-sm-2" id="nameAndPosition"
                           required v-model="nameAndPosition" name="nameAndPosition"/>

                    <button class="btn btn-primary" type="submit"
                            v-on:click="searchNameAndPosition">검색
                    </button>
                    <button class="btn btn-secondary" type="submit"
                            v-on:click="refreshList">취소
                    </button>
                </fieldset>
            </div>


            <table class="table table-hover" style="margin-top: 20px">                             <!--출력부분-->
                <thead class="table-secondary">
                <tr>
                    <th colspan="2">경영부</th>
                </tr>
                </thead>
                <tr v-if="employee.dep_id==1000" v-for="(employee, index) in employees" :key="index">
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
                <thead class="table-primary">
                <tr>
                    <th colspan="2">인사부</th>
                </tr>
                </thead>
                <tr v-if="employee.dep_id==1100" v-for="(employee, index) in employees" :key="index">
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
                <thead class="table-secondary">
                <tr>
                    <th colspan="2">홍보부</th>
                </tr>
                </thead>
                <tr v-if="employee.dep_id==1200" v-for="(employee, index) in employees" :key="index">
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
                <thead class="table-primary">
                <tr>
                    <th colspan="2">영업부</th>
                </tr>
                </thead>
                <tr v-if="employee.dep_id==1300" v-for="(employee, index) in employees" :key="index">
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
                <thead class="table-secondary">
                <tr>
                    <th colspan="2">기술부</th>
                </tr>
                </thead>
                <tr v-if="employee.dep_id==1400" v-for="(employee, index) in employees" :key="index">
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
        <div>
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
                employees: [],
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
        max-width: 100%;
        /*  margin: auto;*/
        margin-left: 15%;
    }

    .btn {
        margin: 20px 0px 20px 0px
    }

    .col-md-6 {
        /* margin-left: 5%;*/
        padding: 0 5% 0 5%;
        max-width: 50rem;
        /*30rem;*/
        border-right: 1px solid lightgrey;
    }

    h3 {
        text-align: left;
    }
</style>