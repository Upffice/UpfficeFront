<template>
    
</template>

<script>
    import ApprovalSubMenu from "./ApprovalSubMenu";
    import http from "../../http-common";

    export default {
        name: "DocWrite",
        data(){
            return{
                approval : {
                    docNum          :   "",
                    type            :   "",
                    title           :   "",
                    writerId        :   "",
                    date            :   "",
                    comment         :   "",
                    refId1          :   "",
                    refId2          :   "",
                    refId3          :   "",
                    refFile         :   "",
                    content         :   "",
                    signId1         :   "",
                    signId2         :   "",
                    signId3         :   "",
                    signDate1     :   "",
                    signDate2     :   "",
                    signDate3     :   "",
                    statusCheck     :   "",
                    status1         :   "",
                    status2         :   "",
                    status3         :   "",
                    writerName      :   "",
                    writerPosition  :   "",
                    writerDepId     :   "",
                    writerDepName   :   ""
                }
            }
        },
        components : {
            subMenu : ApprovalSubMenu
        },
        methods: {
            /* eslint-disable no-console */
            saveDoc() {
                var data = {
                    app_doc_num : this.approval.docNum,
                    app_type : this.approval.type,
                    app_doc_title : this.approval.title,
                    app_writer_id : this.approval.writerId,
                    app_date : this.approval.date,
                    app_comment : this.approval.comment,
                    app_ref_id1 : this.approval.refId1,
                    app_ref_id2 : this.approval.refId2,
                    app_ref_id3 : this.approval.refId3,
                    app_ref_file : this.approval.refFile,
                    app_content : this.approval.content,
                    app_sign_id1 : this.approval.signId1,
                    app_sign_id2 : this.approval.signId2,
                    app_sign_id3 : this.approval.signId3,
                    app_sign_date1 : this.approval.signDate1,
                    app_sign_date2 : this.approval.signDate2,
                    app_sign_date3 : this.approval.signDate3,
                    app_status_check : this.approval.statusCheck,
                    app_status1 : this.approval.status1,
                    app_status2 : this.approval.status2,
                    app_status3 : this.approval.status3,
                    app_writer_name : this.approval.writerName,
                    app_writer_position : this.approval.writerPosition,
                    app_writer_depid : this.approval.writerDepId,
                    app_writer_depname : this.approval.writerDepName
                };

                http
                    .post("/doc/write", data)
                    .then(response => {
                        this.approval = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                // this.submitted = true;
            },
            newCustomer() {
                // this.submitted = false;
                this.approval = {};
            }
            /* eslint-enable no-console */
        }
    }
</script>

<style scoped>

</style>