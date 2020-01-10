<template>
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>내부 주소록</h4>
            <hr>
            <div>
                <SearchEmployees></SearchEmployees>
            </div>

            <table boder="2" class="table table-hover">
                <thead>부서1</thead>
                <tr class="table-primary" v-for="(employees, index) in employees" :key="index">
                    <td>{{employees.name}}</td>
                    <td>
                        <router-link :to="{
                            name: 'board-details',
                            params: { employees: employees, emp_id: employees.emp_id }
                        }">
                            {{employees.position}}
                        </router-link>
                    </td>
                </tr>
                <thead>부서2</thead>
                <tr class="table-primary" v-for="(employees, index) in employees" :key="index">
                    <td>{{employees.name}}</td>
                    <td>
                        <router-link :to="{
                            name: 'board-details',
                            params: { employees: employees, emp_id: employees.emp_id }
                        }">
                            {{employees.position}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"/>
        </div>
    </div>
</template>


<script>

       import AddressSubMenu from "../AddressSubMenu";
       import http from "../../../http-common";
       import SearchEmployees from "./SearchEmployees";

       export default {
           name: "MainEmployAddress",
           data() {
               return {
                   employees: []
               };
           },
           methods: {
               /* eslint-disable no-console */
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
               }
               /* eslint-enable no-console */
           },
           mounted() {
               this.retrieveEmployees();
           },
           components: {
               AddressSubMenu: AddressSubMenu,
               SearchEmployees: SearchEmployees
           }
       }
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }

    .sidelist {
        position: fixed;
        left: 0;
    }
</style>