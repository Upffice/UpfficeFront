<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-12 divWidth divPosition">
            <h3>연차</h3>
            <div class="alignRight">
                <button v-on:click="showModal()" class="btn btn-secondary btn-lg">연차신청</button>
            </div>
            <br>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <th>이름</th>
                    <th>총 연차</th>
                    <th>사용 연차</th>
                    <th>잔여 연차</th>
                </tr>
                </thead>
                <tr class="alignCenter">
                    <td>{{this.empName}}</td>
                    <td>{{this.totalAnnual}}</td>
                    <td>{{this.usedAnnual}}</td>
                    <td>{{this.leftAnnual}}</td>
                </tr>
            </table>
        </div>
        <div class="col-md-12 divWidth divPosition">
            <h4>연차 사용 이력</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <th colspan="2">연차 사용일</th>
                </tr>
                </thead>
                <tr class="alignCenter" v-for="(annual, index) in annuals" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{annual}}</td>
                </tr>
            </table>
        </div>
        <modals-container />
    </div>
</template>

<script>
    import http from "../../http-common";
    import WorkingSubMenu from "./WorkingSubMenu";
    import Modal from "./Modal.vue";

    export default {
        name: "annual-detail",
        data() {
            return {
                empId: "",
                empName: '',
                totalAnnual: 0,
                usedAnnual: 0,
                leftAnnual: 0,
                annuals: []
            };
        },
        components: {
            subMenu: WorkingSubMenu,
            Modal: Modal
        },
        methods: {
            /* eslint-disable no-console */
            getName() {
                /* 사원번호에 해당하는 사원명 가져오는 메소드 */
                http
                    .post("/login/name/" + this.empId)
                    .then(response => {
                        this.empName = response.data;
                    })
            }, // End - getName()
            readAnnuals() {// 사용한 연차의 내역을 조회하는 메소드
                http
                    .get("/working/annuals/" + this.empId)
                    .then(response => {
                        this.annuals = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },// End - readAnnuals()
            readTotalAnnual(){//총 연차를 받아오는 메소드
                http
                    .get("/working/totalAnnuals/" + this.empId)
                    .then(response => {
                        this.totalAnnual = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },// End - readTotalAnnual()
            setLeftAnnual(){//사용한 연차와 남은 연차 계산
                this.usedAnnual=this.annuals.length;
                this.leftAnnual=this.totalAnnual-this.usedAnnual;
            },// End - setLeftAnnual()
            showModal() {// 모달 제어를 위한 메소드
                this.$modal.show(Modal,{
                    hot_table : 'data',
                    modal : this.$modal },{
                    name: 'dynamic-modal',
                    width : '300px',
                    height : '255px',
                    draggable: false,
                })
            }// End - showModal()
            /* eslint-enable no-console */
        },// End - methods
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empId = sessionStorage.getItem("login_id");
                this.readTotalAnnual();
                this.readAnnuals();
                this.getName();
            }  else {
                alert("로그인을 해주세요!");
                this.$router.push('/');
            }
        },
        updated(){
            this.setLeftAnnual();
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
    .alignRight {
        text-align: right;
    }
    .divPosition {
        left: 10%;
    }
    .divWidth {
        width: 80%;
    }

</style>