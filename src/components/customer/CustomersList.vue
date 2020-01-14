<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-6">
            <h4>Customers List</h4>
            <ul>
                <li v-for="(customer, index) in customers" :key="index">
                    <router-link :to="{
                            name: 'customer-details',
                            params: { customer: customer, id: customer.id }
                        }">
                        {{customer.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import CustomerSubMenu from "./CustomerSubMenu";

    export default {
        name: "customers-list",
        data() {
            return {
                customers: [],
                emp_id : ""
            };
        },
        components: {
            subMenu: CustomerSubMenu
        },
        methods: {
            /* eslint-disable no-console */
            retrieveCustomers() {
                http
                    .get("/customer/customers")
                    .then(response => {
                        this.customers = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveCustomers();
            }
        },
        mounted() {
            if (sessionStorage.length > 0) {
                this.emp_id = sessionStorage.getItem("login_id");
                this.retrieveCustomers();
            } else {
                this.$router.push("/");
            }
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>
