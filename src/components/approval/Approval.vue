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
<!--            <tr class="table-light"  v-for="(app, index) in approvals" :key="index">-->
<!--                <td v-bind:app.depname="approval.app_writer_depname">{{app.app_writer_depname}}</td>-->
<!--                <td>{{index+1}}</td>-->
<!--                <td>{{this.approval.app_writer_depname}}</td>-->
<!--                <td>{{approval.app_doc_num}}</td>-->
<!--                <td>{{approval.app_type}}</td>-->
<!--                <td>{{approval.app_doc_title}}</td>-->
<!--                <td>{{approval.app_writer_name}}</td>-->
<!--                <td>{{approval.app_date}}</td>-->
<!--                <td>{{}}</td>-->



<!--            </tr>-->
            </tbody>
        </table>
    </div>


</template>

<script>
    import http from "../../http-common";
    import ApprovalSubMenu from "./ApprovalSubMenu";

    export default {
        name: "approval",
        data(){
            return{
                approvals:[],
                approval : {
                    app_writer_depname : "",
                    app_doc_num : "",
                    app_type : "",
                    app_doc_title : "",
                    app_writer_name : "",
                    app_date : ""
                },
                // appData : {
                //     writer_depname : this.approval.app_writer_depname,
                //     doc_num : this.approval.app_doc_num,
                //     type : this.approval.app_type,
                //     doc_title : this.approval.app_doc_title,
                //     writer_name : this.approval.app_writer_depname,
                //     date : this.approval.app_date
                // }

            };
        },
        components: {
            subMenu:ApprovalSubMenu
        },
        methods : {

        getApprovals(){


           http
           .get("/app/"+1)
            .then(response =>{
                // this.approval = response.data;
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
            console.log("haha");
        }
    }
</script>

<style scoped>

    /*.list {*/
    /*    text-align: left;*/
    /*    max-width: 450px;*/
    /*    margin: auto;*/
    /*}*/
    /*.table{*/

    /*    margin: auto;*/
    /*    width: 1000px;*/

    /*}*/

</style>