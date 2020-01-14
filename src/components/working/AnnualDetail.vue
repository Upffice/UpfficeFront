<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-6">
            <h4>연차</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>이름</td>
                    <td>총 연차</td>
                    <td>사용 연차</td>
                    <td>잔여 연차</td>
                </tr>
                </thead>
                <tr>
                    <td>{{this.name}}</td>
                    <td>{{this.totalAnnual}}</td>
                    <td>{{this.usedAnnual}}</td>
                    <td>{{this.leftAnnual}}</td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <h4>연차 사용 이력</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td></td>
                    <td>연차 사용일</td>
                </tr>
                </thead>
                <tr v-for="(annual, index) in annuals" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{annual}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import WorkingSubMenu from "./WorkingSubMenu";

    export default {
        name: "annual-detail",
        data() {
            return {
                empId: 1,
                name: "대표",
                totalAnnual: "",
                usedAnnual: "",
                leftAnnual: "",
                annuals: []
            };
        },
        components: {
            subMenu: WorkingSubMenu
        },
        methods: {
            /* eslint-disable no-console */
            readAnnual() {
                http
                    .get("/working/annuals/" + this.empId)
                    .then(response => {
                        this.annuals = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            countAnnual() {
                http
                    .get("/working/annuals/count" + this.empId)
                    .then(response => {
                        this.usedAnnual = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.readAnnual();
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
