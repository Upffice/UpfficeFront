<template>

    <div class="container">

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
            <tr class="table-light">
                <th v-for="(approval, index) in approvals" :key=index" scope="row">Light</th>
                <td>{{this.approval.app_doc_num}}</td>
                <td>{{this.approval.app_type}}</td>
                <td>{{this.approval.app_doc_title}}</td>
                <!--<td>{{this.approval.idx}}</td>
                <td>{{this.approval.dep_name}}</td>
                <td>{{this.approval.app_doc_num}}</td>
                <td>{{this.approval.app_type}}</td>
                <td>{{this.approval.app_doc_title}}</td>
                <td>{{this.approval.emp_id}}</td>
                <td>{{this.approval.app_doc_date}}</td>-->

            </tr>
            </tbody>
        </table>
    </div>


</template>

<script>
    import http from "../../http-common";
    import ApprovalSubMenu from "./ApprovalSubMenu";

    export default {
        name: "Approval",
        data(){
            return{
                approvals:[]
            };
        },
        components: {
            subMenu:ApprovalSubMenu
        },
        methods : {
        /* updateInformation() {

             var data = {
                 index: this.approval.idx,
                 depName: this.approval.dep_name,
                 docNum: this.approval.app_doc_num,
                 docType: this.approval.app_type,
                 docTitle: this.approval.app_doc_title,
                 empId: this.approval.emp_id,
                 docDate: this.approval.app_doc_date
             }*/
        getApprovals(){
           http
           .get("/app")
            .then(response =>{
                this.approvals = response.data;
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
         },
               refreshList(){
            this.getApprovals();
               }
        },
        mounted() {
            this.getApprovals();
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

        margin: auto;
        width: 1000px;

    }

</style>