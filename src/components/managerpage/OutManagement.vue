<template>                                                                  <!--외부주소록 메인-->
    <div class="list row">

        <div class="col-md-6">
            <h2>외부 주소록</h2>


            <button v-on:click="addOutAddress">직원 추가</button>
            <hr>
            <div class="searchform">
                <div class="form-group">                                            <!--성명,회사명으로 검색-->

                    <input type="text" class="form-control mr-sm-2" v-on:keypress="searchOutAddress"
                           placeholder="검색(성명, 회사명)" id="nameAndCompany"
                           required v-model="nameAndCompany" name="nameAndCompany">

                </div>
                <div class="btn-group">
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="searchOutAddress">검색</button>
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="refreshList">취소</button>
                </div>
            </div>
            <br>
            <hr>

            <table boder="2" class="table table-hover">                                 <!--출력-->
                <thead class="table-secondary">
                <td>이름</td>
                <td>휴대폰</td>
                <td>이메일</td>
                <td>회사</td>
                <td>회사번호</td>

                </thead>
                <tbody>
                <tr v-for="(outAddress,index) in outaddress" :key="index">
                    <td>
                        <router-link :to="{
                            name: 'OutMgmDetail',
                            params: { outAddress: outAddress, out_id: outAddress.out_id }
                        }">
                            {{outAddress.outName}}
                        </router-link>
                    </td>
                    <td>{{outAddress.out_mobile}}</td>
                    <td>{{outAddress.out_email}}</td>
                    <td>{{outAddress.outCompany}}</td>
                    <td>{{outAddress.out_dep_phone}}</td>
                </tr>
                </tbody>
            </table>
            <div class="col-md-6">
                <router-view @refreshData="refreshList"></router-view>
            </div>
        </div>
    </div>


</template>


<script>
    import http from "../../http-common";

    export default {
        name: "outManagement",

        ready: function()
        {
            var self = this
            window.addEventListener('click', function(e){
                if (! e.target.parentNode.classList.contains('menu__link--toggle'))
                {
                    self.close()
                }
            }, false)
        },
        data() {
            return {
                outaddress: [],
                nameAndCompany: "",
                out_id: "",
                showMenu: false,
                dropDowns:{
                    ranking:{open:false}
                }
            };
        },

        methods: {
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
                this.nameAndCompany = "";
            },

            searchOutAddress() {                                                         /*회사명, 성명으로 출력*/
                if (this.nameAndCompany == "") return;
                http
                    .get("/outaddress/outaddress/nameAndCompany/" + this.nameAndCompany)
                    .then(response => {
                        this.outaddress = response.data, // JSON are parsed automatically.
                            console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addOutAddress() {
                this.$router.push('/manager/add-out-address')
            },

            toggle:function (dropdownName)  {
                //alert(dropdownName)
                this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
            },
            close: function()
            {
                for (dd in this.dropDowns)
                {
                    this.dropDowns[dd].open = false;
                }
            },
        },
        mounted() {
            this.retrieveOutAddress();
        },

    }
</script>

<style scoped>
    .searchform {
        max-width: 300px;
        margin: auto;
    }


    .list {
        text-align: center;
        max-width: 90%;
        /*  margin: auto;*/
        margin-left: 15%;
    }

    #nameAndCompany {
        width: 200px;
    }

    .form-group, btn-group {
        float: right;
    }

</style>