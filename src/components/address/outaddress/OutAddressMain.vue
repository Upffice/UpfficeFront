<template>
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>외부 주소록</h4>
            <hr>

            <table boder="2" class="table table-hover">
                <thead class="table-primary">
                <td>이름</td>
                <td>휴대폰</td>
                <td>이메일</td>
                <td>회사</td>
                <td>부서 전화번호</td>

                </thead>
                <tr v-for="(outaddress,index) in outaddress" :key="index">
                    <td>

                            {{outaddress.outName}}

                    </td>
                    <td>{{outaddress.out_mobile}}</td>
                    <td>{{outaddress.out_email}}</td>
                    <td>{{outaddress.out_company}}</td>
                    <td>{{outaddress.out_dep_phone}}</td>


                </tr>

            </table>
        </div>

    </div>


</template>


<script>
    import http from "../../../http-common";
    import AddressSubMenu from "../AddressSubMenu";

    export default {
        name: "outAddressMain",
        data(){
            return{
                outaddress:[]
            }
        },
        methods:{
            retrieveOutAddress() {
                http
                    .get("/outaddress/outaddress")
                    .then(response => {
                        this.outaddress = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveOutAddress();
            }
        },
        mounted() {
            this.retrieveOutAddress();
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