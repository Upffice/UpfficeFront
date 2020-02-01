<template>                                                                  <!--외부주소록 메인-->
    <div class="list row">

        <div class="col-md-6">
            <h2>외부 주소록</h2>
            <hr>
            <!--전체, 회사별 정렬하기 위한 dropdown-->
            <form class="btn-group" role="group" style="margin-bottom: 10px; float: left">
                <select v-model="selectedNum" type="button" class="btn btn-primary"
                        style="width: 90px; margin-right: 10px;  margin-top: 20px;">
                    <option class="dropdown-menu show" value="" disabled="">분류</option>
                    <option class="dropdown-item" value="1" v-on:click="sort">전체</option>
                    <option class="dropdown-item" value="2" v-on:click="sort">회사별</option>
                </select>
            </form>
            <p>{{selectedNum}}</p>

            <!--직원추가-->
            <div style="float: left">
                <button v-on:click="addOutAddress">직원 추가</button>
            </div>
            <div class="form-inline my-2 my-lg-0" style="margin-bottom: 2px; float: right">
                <!--성명,회사명으로 검색-->
                <fieldset>
                    <input type="text" class="form-control mr-sm-2" v-on:keypress="searchOutAddress"
                           placeholder="검색(성명, 회사명)" id="nameAndCompany"
                           required v-model="nameAndCompany" name="nameAndCompany">
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="searchOutAddress">검색</button>
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="refreshList">취소</button>
                </fieldset>
            </div>


            <table class="table table-hover" style="margin-top: 20px">                                 <!--출력-->
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

        data() {
            return {
                outaddress: [],
                nameAndCompany: "",
                out_id: "",
                selectedNum: "",
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
            SortOfOutCompany() {
                http
                    .get("/outaddress/outaddress/outCompany")
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
            sort() {
                if (this.selectedNum === 1) {
                    this.retrieveOutAddress();
                } else if (this.selectedNum === 2) {
                    this.SortOfOutCompany();
                }
            },

        },
        mounted() {
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.retrieveOutAddress();
            } else {
                this.$router.push("/");
            }
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
        margin: auto;
    }

    #nameAndCompany {
        width: 200px;
    }

    .form-group, btn-group {
        float: right;
    }

</style>