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
    // import {EventBus} from "../../event-bus.js";

    export default {
        name: "customers-list",
        data() {
            return {
                customers: [],
                // status
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
            // chkLoginStatus() {
            // var flag = false;
            //         EventBus.$on("authenticated", sts => {
            //             console.log("@@지금 로그인 상태는 " + sts);
            //             flag = sts;
            //         });
            //         console.log("eventon 끝난뒤 상태 flag " + flag);
            //         this.status = flag;
            //         // 값이 EventBus.$on에서만 바뀜
            // }
            /* eslint-enable no-console */
        },
        mounted() {
            this.retrieveCustomers();
            // this.chkLoginStatus();
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
