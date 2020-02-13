<template>                                                                  <!--상세페이지 출력부분-->
    <div class="list row">
        <div v-if="this.employee">
            <!--class="card border-primary"-->
            <div class="card-border" style="border: 1px solid">
                <div class="card-header" align="center">&#60;상세정보&#62;</div>               <!--이름 눌렀을때 나오는 부분-->
                <div class="card-body">
                    <div class="img_div">
                        {{this.getImg(this.employee.emp_id)}}
                        <img v-bind:src="this.emp_img_url"><br>
                    </div>
                    <h4 class="card-title" align="center">{{this.employee.name}}</h4>


                    <table boder="2" class="table table-hover" align="center">
                        <tr>
                            <th>부서</th>
                            <td>{{this.dep_name, this.getDep_Name(this.employee.dep_id)}}</td>
                        </tr>
                        <tr>
                            <th>직책</th>
                            <td>{{this.employee.position}}</td>
                        </tr>
                        <tr>
                            <th>휴대폰</th>
                            <td>{{this.employee.phone_number}}</td>
                        </tr>
                        <tr>
                            <th>email</th>
                            <td>{{this.employee.emp_email}}</td>
                        </tr>
                        <tr>
                            <th>내선번호</th>
                            <td> {{this.employee.extension_number}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <router-link class="btn btn-outline-primary" to="/mainEmployAddress">취소</router-link>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>

        </div>
        <div v-else>
            <div class="card-border" style="text-align: center">
                <h5>◁◀직원 이름을 선택하시오</h5>
            </div>
        </div>
    </div>

</template>

<script>
    import http from "../../../http-common";

    export default {
        name: "employees-details",
        props: ["employee"],
        data() {
            return {
                dep_name: "",
                emp_img_url: "" // 사원 사진 경로
            }
        },
        methods: {
            getDep_Name(dep_id) {
                http
                    .post("/dep/" + dep_id)
                    .then(response => {
                        this.dep_name = response.data;
                    })
                    .catch(e => {
                        /* eslint-disable no-console */
                        console.log(e);
                    });
            },
            getImg(emp_id) {
                /*this.emp_img_url = require('http://localhost:8080/emp_img/'+ emp_id + '.jpg');*/
                this.emp_img_url = 'http://localhost:8080/emp_img/'+ emp_id + '.jpg';
            }
        },
       /* mounted() {
            this.emp_img_url = 'http://localhost:8080/emp_img/'+ this.employee.emp_id + '.jpg';
        }*/
    }
</script>

<style scoped>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
        position: fixed;
    }

    td {
        width: 70%;
        margin: auto;
        text-align: center;
    }

    th {
        margin: auto;
        text-align: center;
    }


    img {
        margin: auto;
        width: 120px;
        height: 120px;
        border-radius: 70%;
        overflow: hidden;
        display: block;
        object-fit: cover;
    }


    .card-border {
        width: 25rem;
        height: 35rem;
        border-radius: 4px;
        margin: 7rem 0 0 20%;

    }

</style>