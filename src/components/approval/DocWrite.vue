<template>



    <div class="card border-primary mb-3" style="max-width: 1100px;">
        <div class="list row">
            <subMenu></subMenu>
        </div>
        <div class="card-header">
            <div class="top" style="font-size: 30px">
                <span class="title"><b>기안문작성</b></span>
                <span class="button-group">
                    <button type="button" class="btn btn-secondary disabled buttons">결재선</button>
                    <button type="button" class="btn btn-secondary disabled buttons">임시저장</button>
                    <button type="button" class="btn btn-secondary disabled buttons">상신</button>
                    <button type="button" class="btn btn-secondary disabled buttons">취소</button>
                </span>
            </div>
            <div class="sign-line" style="float: right; padding-right: 65px; padding-bottom: 40px;">
                <table class="sign-table" style="border: black 2px solid">
                    <thead>
                        <tr>
                            <th class="sign-th table-light" rowspan="2"style="width:90px"></th>
                            <th class="table-light" style="border: black 2px solid">기안</th>
                            <th class="table-light" style="border: black 2px solid">결재</th>
                            <th class="table-light" style="border: black 2px solid">결재</th>
                            <th class="table-light" style="border: black 2px solid">결재</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-light" style="vertical-align: middle; line-height: 20px;">결<br><br>재</td>
                            <td style="border: black 2px solid">김범준<br><br>사인<br>20.01.14</td>
                            <td style="border: black 2px solid">장범준</td>
                            <td style="border: black 2px solid">김범준</td>
                            <td style="border: black 2px solid">장범준</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="table">
                <tr>
                    <th scope="row" class="table-light">문서번호</th>
                    <td>Column content</td>
                    <th scope="row" class="table-light">기안일자</th>
                    <td>Column content</td>
                </tr>
                <tr>
                    <th scope="row" class="table-light">기안자</th>
                    <td>Column content</td>
                    <th scope="row" class="table-light">기안부서</th>
                    <td>Column content</td>
                </tr>
                <tr>
                    <th scope="row" class="table-light">직위/직책</th>
                    <td>Column content</td>
                    <th scope="row" class="table-light">참조자</th>
                    <td>Column content</td>
                </tr>
                <tr>
                    <th scope="row" class="table-light">의견</th>
                    <td colspan="3">Column content</td>
                </tr>
                <tr>
                    <th scope="row" class="table-light">문서제목</th>
                    <td colspan="3">Column content</td>
                </tr>
                <tr>
                    <th scope="row" class="table-light">참조</th>
                    <td colspan="3">Column content</td>
                </tr>
                <tr>
                    <td colspan="3" rowspan="10" style="height: 500px">Column content</td>
                </tr>
            </table>
        </div>
    </div>


</template>

<script>
    import ApprovalSubMenu from "./ApprovalSubMenu";
    import http from "../../http-common";

    export default {
        name: "write",
        data() {
            return {
                approval: {
                    docNum: "",
                    type: "",
                    title: "",
                    writerId: "",
                    date: "",
                    comment: "",
                    refId1: "",
                    refId2: "",
                    refId3: "",
                    refFile: "",
                    content: "",
                    signId1: "",
                    signId2: "",
                    signId3: "",
                    signDate1: "",
                    signDate2: "",
                    signDate3: "",
                    statusCheck: "",
                    status1: "",
                    status2: "",
                    status3: "",
                    writerName: "",
                    writerPosition: "",
                    writerDepId: "",
                    writerDepName: ""
                }
            }
        },
        components: {
            subMenu: ApprovalSubMenu
        },
        methods: {
            /* eslint-disable no-console */
            saveDoc() {
                var data = {
                    app_doc_num: this.approval.docNum,
                    app_type: this.approval.type,
                    app_doc_title: this.approval.title,
                    app_writer_id: this.approval.writerId,
                    app_date: this.approval.date,
                    app_comment: this.approval.comment,
                    app_ref_id1: this.approval.refId1,
                    app_ref_id2: this.approval.refId2,
                    app_ref_id3: this.approval.refId3,
                    app_ref_file: this.approval.refFile,
                    app_content: this.approval.content,
                    app_sign_id1: this.approval.signId1,
                    app_sign_id2: this.approval.signId2,
                    app_sign_id3: this.approval.signId3,
                    app_sign_date1: this.approval.signDate1,
                    app_sign_date2: this.approval.signDate2,
                    app_sign_date3: this.approval.signDate3,
                    app_status_check: this.approval.statusCheck,
                    app_status1: this.approval.status1,
                    app_status2: this.approval.status2,
                    app_status3: this.approval.status3,
                    app_writer_name: this.approval.writerName,
                    app_writer_position: this.approval.writerPosition,
                    app_writer_depid: this.approval.writerDepId,
                    app_writer_depname: this.approval.writerDepName
                };

                //     http
                //         .post("/app/doc/write", data)
                //         .then(response => {
                //             this.approval = response.data;
                //             console.log(response.data);
                //         })
                //         .catch(e => {
                //             console.log(e);
                //         });
                //
                //     // this.submitted = true;
                // },
                // newCustomer() {
                //     // this.submitted = false;
                //     this.approval = {};
                // }
                /* eslint-enable no-console */
            }
        }
    }
</script>

<style scoped>

    .card{
        margin: auto auto auto 300px;
        border:1.5px solid black;
    }
    .title{
        text-align: left;
        margin: 30px;
    }

    .table{
        width: 1100px;
        max-width: 1100px;
    }
    .card-header{
        margin: 0;
        padding: 0;
        background-color: aliceblue;

    }
    .top{
        text-align: left;
        margin : 30px
    }
    th{
        width: 150px;
    }
    .button-group{
        /*text-align: right;*/
        /*margin-right: 20px;*/

        margin-top: 0px;
        margin-left: 500px;
    }

    .sign-line{

    }
    .sign-table{
        max-width: 300px;
        height: 150px;
    }
    .sign-th{

    }
</style>