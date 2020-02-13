<template>
    <div class="list row">
        <div>
            <h4>직원 관리</h4>
            <hr>
            <div style="float: left">
                <button type="button" class="btn btn-primary" v-on:click="addEmployees">직원 등록</button>
            </div>

            <div class="form-inline my-2 my-lg-0" style="margin-bottom: 2px; float: right">
                <fieldset>
                    <input type="text" class="form-control mr-sm-2" v-on:keypress="searchNameAndPosition"
                           placeholder="검색(성명, 직책 입력)" id="nameAndPosition"
                           required v-model="nameAndPosition" name="nameAndPosition"/>
                    <button class="btn btn-secondary" type="submit"
                            v-on:click="searchNameAndPosition">검색
                    </button>
                    <button class="btn btn-secondary" type="submit"
                            v-on:click="refreshList">취소
                    </button>
                </fieldset>
            </div>

            <!-- {{$route.params}}-->
            <table class="table table-hover" style="margin-top: 20px">
                <!--출력부분-->
                <thead class="table-secondary">
                <tr>
                    <th style="width: 90px">아이디</th>
                    <th style="width: 90px">성명</th>
                    <th>이메일</th>
                    <th style="width: 80px">직책</th>
                    <th>입사일</th>
                    <th>내선번호</th>
                    <th>휴대폰번호</th>
                    <th style="width: 90px">부서</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(employee, index) in currentPosts" :key="index" v-on:click="emp_modi_del(employee)">
                    <td>
                        {{employee.emp_id}}
                    </td>
                    <td>{{employee.name}}</td>
                    <td>{{employee.emp_email}}</td>
                    <td>{{employee.position}}</td>
                    <td>{{employee.hire_date}}</td>
                    <td>{{employee.extension_number}}</td>
                    <td>{{employee.phone_number}}</td>
                    <td>{{employee.dep_id}}</td>

                    <!--<td>{{this.dep_name, getDep_Name(this.employee.dep_id)}}</td>-->
                </tr>
                </tbody>
            </table>

            <div class="page">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="page-link" @click="gotoStart()">&laquo;</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="prev()"><</button>
                    </li>
                    <li v-for="(pageNum, index) in currentPages" :key="index" class="page-item"
                        :class="{'active':isSelected(index)}">
                        <button class="page-link" @click="changePage(pageNum)">{{pageNum}}</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="next()">></button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="gotoEnd()">&raquo;</button>
                    </li>
                </ul>
            </div>


        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
        <!--modal 컴포넌트 포함 시키기 위한 div-->
        <modals-container/>
    </div>
</template>

<script>
    import http from "../../http-common";
    import AddEmployees from "./AddEmployees";
    import EmployeesMgmDetail from "./EmployeesMgmDetail";

    export default {
        name: "employeesManagement",
        data() {
            return {
                employees: [],
                dep_name: "",
                emp_id: "",
                dep_id: "",
                nameAndPosition: "",

                currentPosts: [],
                count: 0,   //총 길이
                countList: 10, // 한 페이지에 나올 게시글 개수
                totalPage: 1, // 페이지 번호 묶음 (5 개씩 묶음)
                page: 1,
                countPage: 5,
                startPage: 1,
                endPage: 0,
                totalPages: [],
                currentPages: [], // 현재 페이지 번호들 배열 5개 짜리


            };

        },/*END-OF-data*/

        methods: {
            retrieveEmployees() {
                http
                    .get("/employees/employees")
                    .then(response => {
                        this.employees = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                        this.setPagination();
                        this.setCurrentPosts();

                        this.getDep_Name(this.employees.dep_id);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveEmployees();
                this.nameAndPosition = "";
            },
            searchNameAndPosition() {
                http
                    .get("/employees/employees/nameAndPosition/" + this.nameAndPosition)
                    .then(response => {
                        this.employees = response.data;
                        console.log(response.data);
                        this.setPagination();
                        this.setCurrentPosts();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addEmployees() {
                /*this.$router.push('/manager/add-employees')*/

                this.$modal.show(AddEmployees, {
                        name: 'AddEmployees',
                        modal: this.$modal,
                    },
                    {
                        width: '500px',
                        height: '780px',
                        draggable: true,
                    });
            },

            emp_modi_del(employee) { // employee-Detail modal 띄우는 메소드

                this.$modal.show(EmployeesMgmDetail, {
                        name: 'EmployeesMgmDetail',
                        employees: employee,
                        modal: this.$modal,
                    },
                    {
                        width: '500px',
                        height: '770px',
                        draggable: true,
                    });
                console.log(employee.emp_id);

            },
            getDep_Name(dep_id) {
                console.log("getDep_name입니다")
                http
                    .post("/dep/" + dep_id)
                    .then(response => {
                        this.dep_name = response.data;
                        console.log(this.dep_name + "부서이름가져오나");
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }, // 부서 정보 가져오기

            setPagination() {
                this.count = this.employees.length;
                /*console.log(this.employees.length + "길이 찍어보기")*/
                this.totalPage = this.count / this.countList; // 총 페이지 개수
                if (this.count % this.countList > 0) {
                    this.totalPage = Math.ceil(this.totalPage);
                }
                if (this.totalPage < this.page) {
                    this.page = this.totalPage;
                }

                for (let i = 0; i < this.totalPage; i++) {
                    this.totalPages[i] = i + 1;
                }

                this.startPage = ((this.page - 1) / this.countPage) * this.countPage + 1; // 시작 페이지

                if (this.totalPage < 5) {
                    this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                } else {
                    this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                }

                this.currentPages = [];
                let j = this.startPage - 1;
                for (let i = 0; i <= (this.endPage - this.startPage) && j <
                this.totalPage; i++) {
                    this.currentPages[i] = this.totalPages[j];
                    j++;
                    /* console.log("curr " + i + "번째 " + this.currentPages[i]);
                     console.log("startPage : " + this.startPage)
                     console.log("endPage : " + this.endPage)
                     console.log("totalPage : " + this.totalPage)
                     console.log("totalPages : " + this.totalPages)*/

                }
            },
            setCurrentPosts() {
                this.currentPosts = [];
                let j = (this.page - 1) * this.countList;
                for (let i = 0; i < this.countList && j < this.employees.length; i++) {
                    this.currentPosts[i] = this.employees[j];
                    j++;
                }

            },

            changePage(pageNum) {
                this.page = pageNum;
                this.setCurrentPosts();
                /*console.log(this.page)*/
            },
            isSelected(index) { //<< >>버튼 메서드, 눌렀을때 색깔 바뀌는거
                /* 선택된 class 바인딩 위해 return 반환하는 메서드*/
                if (index == (this.page - 1) % this.countPage) {
                    return true
                } else {
                    return false
                }
            },
            prev() {
                if (this.startPage != 1) {
                    this.startPage = this.startPage - 5;
                    this.page = this.startPage;
                    if (this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage - 1;
                    for (let i = 0; i <= (this.endPage - this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        console.log("curr " + i + "번째 " + this.currentPages[i]);
                    }
                    this.setCurrentPosts();
                }
            },
            next() {
                if (this.endPage < this.totalPage) {
                    this.startPage = this.endPage + 1;
                    this.page = this.startPage;
                    if (this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage - 1;
                    for (let i = 0; i <= (this.endPage - this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        /* console.log("curr " + i + "번째 " + this.currentPages[i]);*/
                    }
                    this.setCurrentPosts();
                }
            },
            gotoStart() {
                // location.reload();
                this.changePage(1);
                this.setPagination()
            },
            gotoEnd() {
                let pack = Math.ceil(this.totalPage / this.countPage)//몇덩이인지(페이지묶음수)
                for (let i = 0; i < pack; i++)
                    this.next()
                this.changePage(this.totalPage);
            }


        },/*END-OF-methods*/
        mounted() {
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.retrieveEmployees();
            } else {
                this.$router.push("/");
            }
        },

    }
</script>

<style scoped>

    .list {
        text-align: center;
        max-width: 90%;
        margin-top: 20px;
    }

    #nameAndPosition {
        width: 200px;
    }


    .page {
        display: table;
        text-align: center;
        margin: auto;
        padding-top: 30px;
        position: relative;
    }

    .page-link {
        background-color: #0e0b37;
    }

    .btn {
        margin: 20px 0px 20px 0px
    }
</style>