<template>
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>내부 주소록</h4>
            <hr>
            <div>

                <SearchEmployees></SearchEmployees>
            </div>
            <br>
            <div>
                <EmployeesList @employees-list="childMsg"></EmployeesList>
                {{em_list}}
            </div>
        </div>

    </div>


</template>


<script>

    import AddressSubMenu from "../AddressSubMenu";
    import SearchEmployees from "./SearchEmployees";
    import EmployeesList from "./EmployeesList";

    export default {
        name: "MainEmployAddress",

        components: {
            AddressSubMenu,
            SearchEmployees,
            EmployeesList
        },
        data() {
            return {
                em_list: ''
            };

        },
        methods:{
            childMsg(payload){
                this.em_list = payload;
            }
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