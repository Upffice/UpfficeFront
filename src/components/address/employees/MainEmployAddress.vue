<template>
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>내부 주소록</h4>
            <hr>
            <div>

               <textarea placeholder="검색어입력"></textarea><button>검색</button>
            </div>
            <br>

            <table boder="2" class="table table-hover">
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
            /* eslint-enable no-console */
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