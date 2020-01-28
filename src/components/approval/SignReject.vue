<template>

    <div class="container">

        <h2 style="float: left; margin-left: 200px">결재완료함</h2>

        <div class="list row">
            <subMenu></subMenu>
        </div>

        <table class="table table-hover">
            <thead>
            <tr class="table-primary">
                <th scope="col">No</th>
                <th scope="col">부서</th>
                <th scope="col">문서번호</th>
                <th scope="col">유형</th>
                <th scope="col">문서제목</th>
                <th scope="col">기안자</th>
                <th scope="col">기안일</th>
            </tr>
            </thead>
            <tbody>

            <!--로그인 정보에서 받아올 부분-->
            <tr v-if="approvals[index].app_status_check == 'reject' &&approvals[index].app_writer_id==login_id"
                class="table-light" v-for="(app, index) in approvals" :key="index">
                <td>{{approvals.length-index}}</td>
                <td>{{app.app_writer_depname}}</td>
                <td>{{app.app_doc_num}}</td>
                <td>{{app.app_type}}</td>
                <td>
                    <router-link :to="{
                        name : 'reject-details',
                        params:{appProps : app, id : app.app_doc_num}
                    }">
                        {{app.app_doc_title}}
                    </router-link>
                </td>
                <td>{{app.app_writer_name}}</td>
                <td>{{app.app_date}}</td>

            </tr>
            </tbody>
        </table>

    </div>


</template>

<script>
    import http from "../../http-common";
    import ApprovalSubMenu from "./ApprovalSubMenu";
    // import {EventBus} from "../../event-bus";

    export default {
        name: "reject",
        data: function () {
            return {
                login_id: "",
                approvals: [],
                a: 0
            };
        },
        components: {
            subMenu: ApprovalSubMenu
        },
        methods: {

            getApprovals(id) {
                http
                    .get("/app/" + id)
                    .then(response => {
                        this.approvals = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList(id) {
                this.getApprovals(id);
            }
        },
        mounted() {
            /*페이지 로딩전 id에서 session으로 접근, 데이터 가져오는 로직*/

            if (sessionStorage.length > 0) {
                this.login_id = sessionStorage.getItem("login_id");
                this.getApprovals(this.login_id);
            } else {
                alert("로그인을 해주세요!");
                this.$router.push('/');
            }

        }
    }
</script>

<style scoped>

    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
    .table{

        margin: auto auto auto 150px;
        width: 1000px;

    }

</style>