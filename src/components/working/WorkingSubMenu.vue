<template>
    <div class="subMenu">
        시계자리<br>
        출근시간:{{this.workingIn}}<br>
        퇴근시간:{{this.workingOut}}<br>
        근무시간:{{this.workingTime}}<br>
        <button v-if="!this.workingIn" v-on:click="saveWorkingIn()" class="btn btn-outline-danger btn-working">출근</button>
        <button v-else class="btn btn-danger disabled btn-working">출근</button>

        <button v-if="!this.workingOut" v-on:click="saveWorkingOut()" class="btn btn-outline-info btn-working">퇴근</button>
        <button v-else class="btn btn-info disabled btn-working">퇴근</button>
        <br>
        [근태관리]
        <ul class="nav nav-pills flex-column">
            <router-link to="/working/status">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    내 근태 현황
                </li>
            </router-link>
            <router-link to="/working/annual">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    내 연차 내역
                </li>
            </router-link>
        </ul>
        <button v-on:click="showModal()" class="btn btn-secondary btn-lg btn-block">연차신청</button>
        <div v-if="modalShow">
            <Modal></Modal>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import Modal from "./Modal";

    export default {
        name: "WorkingSubMenu",
        data() {
            return {
                empId: 1,
                workingIn: "",
                workingOut: "",
                workingTime:"",
                modalShow: false
            };
        },
        components: {
            Modal: Modal
        },
        methods: {
            /* eslint-disable no-console */
            readWorkingIn() {
                http
                    .get("/working/readIn/" + this.empId)
                    .then(response => {
                        this.workingIn = response.data;
                        console.log("read" + response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            readWorkingOut() {
                http
                    .get("/working/readOut/" + this.empId)
                    .then(response => {
                        this.workingOut = response.data;
                        console.log("read" + response.data);
                        this.calcWorkingTime();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            saveWorkingIn() {
                http
                    .get("/working/saveIn/" + this.empId)
                    .then(response => {
                        this.workingIn = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            saveWorkingOut() {
                http
                    .get("/working/saveOut/" + this.empId)
                    .then(response => {
                        this.workingOut = response.data;
                        console.log(response.data);
                        this.calcWorkingTime();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            saveWorkingTime() {
                http
                    .get("/working/saveTime/" + this.empId)
                    .then(response => {
                        this.workingOut = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            calcWorkingTime() {
                let wit = new Date(Date.parse("0001-01-01 "+this.workingIn));
                let date = new Date(Date.parse("0001-01-01 "+this.workingOut));

                date.setHours(date.getHours()-wit.getHours());
                date.setMinutes(date.getMinutes()-wit.getMinutes());
                date.setSeconds(date.getSeconds()-wit.getSeconds());

                this.workingTime=date.toString().substr(16,8);
            },
            showModal() {
                this.modalShow = !this.modalShow;
                console.log(this.modalShow);
            },
            applyAnnual() {

            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.readWorkingIn();
            this.readWorkingOut();
        }
    };
</script>

<style>
    .btn-working {
        align: center;
    }
</style>
