<template>                                                                  <!--외부주소록 메인-->
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div class="col-md-6">
            <h4>외부 주소록</h4>
            <hr>
            <div class="searchform">
                <div class="form-group">                                            <!--성명,회사명으로 검색-->

                    <input type="text" v-on:keypress="searchOutAddress" placeholder="성명, 회사명 입력" class="form-control" id="nameAndCompany"
                           required v-model="nameAndCompany" name="nameAndCompany">

                </div>
                <div class="btn-group">
                    <button v-on:click="searchOutAddress">검색</button>
                </div>

            </div>

            <table boder="2" class="table table-hover">                                 <!--출력-->
                <thead class="table-primary">
                <td>이름</td>
                <td>휴대폰</td>
                <td>이메일</td>
                <td>회사</td>
                <td>부서 전화번호</td>

                </thead>
                <tr v-for="(outAddress,index) in outaddress" :key="index">
                    <td>

                        {{outAddress.outName}}

                    </td>
                    <td>{{outAddress.out_mobile}}</td>
                    <td>{{outAddress.out_email}}</td>
                    <td>{{outAddress.outCompany}}</td>
                    <td>{{outAddress.out_dep_phone}}</td>


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
                nameAndCompany:"",
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
            },

            searchOutAddress(){                                                         /*회사명, 성명으로 출력*/
                http
                    .get("/outaddress/outaddress/nameAndCompany/"+ this.nameAndCompany)
                    .then(response => {
                        this.outaddress = response.data, // JSON are parsed automatically.
                            console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.retrieveOutAddress();
        },
        components: {
            AddressSubMenu

        },

    }
</script>

<style>
    .searchform {
        max-width: 300px;
        margin: auto;
    }
    .search-result {
        margin-top: 20px;
        text-align: left;
    }
    .form-control{

    }
    .list {
        text-align: center;
        max-width: 90%;
        /*  margin: auto;*/
        margin-left: 15%;
    }


</style>