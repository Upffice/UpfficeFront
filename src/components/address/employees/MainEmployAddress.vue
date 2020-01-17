<template>                                                                  <!--내부주소록 첫화면-->
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>내부 주소록</h4>
            <hr>
            <div class="searchform">
                <div class="form-group">                                         <!--이름으로 검색-->
                    <input type="text"  v-on:keypress="searchNameAndPosition" placeholder="이름, 직책 입력" class="form-control" id="nameAndPosition"
                           required v-model="nameAndPosition" name="nameAndPosition">
                </div>
                <div class="btn-group">
                    <button v-on:click="searchNameAndPosition">검색</button>
                </div>

            </div>

            <table boder="2" class="table table-hover">                             <!--출력부분-->
               <thead class="table-primary">부서1</thead>
               <tr v-for="(employee, index) in employees" :key="index">
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
    </div>


</template>


<script>
    import http from "../../../http-common";
    import AddressSubMenu from "../AddressSubMenu";

    export default {
        name: "MainEmployAddress",
        data() {
            return {
                nameAndPosition:"",
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
            },
            searchNameAndPosition(){                                                           /*이름으로 검색*/
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
            this.retrieveEmployees();
        },
        components: {
            AddressSubMenu,
        },

    }
</script>

<style>
    .list {
        text-align: center;
        max-width: 90%;
        /*  margin: auto;*/
        margin-left: 15%;
    }

</style>