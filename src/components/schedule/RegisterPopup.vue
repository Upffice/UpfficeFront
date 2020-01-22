<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">일정 등록</h5>
                </div>
                <!--    <div class="registerPopup">
                    &lt;!&ndash;<일정 카테고리 추가>
                    카테고리 이름, 색(id는 자동부여)
                    <일정 추가>
                    일정 이름, 일정시작일, 일정마감일, 일정 시작 시간, 일정 마감시간,
                    일정 장소, 일정 디테일, emp_id, dep_id, calendar_id (sche id는 자동부여)&ndash;&gt;
                </div>-->
                <div class="modal-body">
                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">

                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">

                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">

                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">

                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">

                        <label class="col-form-label col-form-label-sm ">Small input</label>
                        <input class="form-control form-control-sm popupInput" type="text" placeholder=".form-control-sm">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="register">확인</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                del_password:'',
            }
        },props : [
            'registerData',
        ],methods : {
            register(){

                this.$emit('close')
            }
        }
    };
</script>
<style scoped>
    .popupInput {
        width: 100%;
    }

</style>
