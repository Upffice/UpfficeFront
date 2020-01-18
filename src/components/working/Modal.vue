<template>
    <div class="container">
        <div class="input-group col-md-12">
            연차를 신청할 날짜를 선택해주세요.
            <input type="date" :min="min" :max="max" v-model="applyDate" class="form-control col-md-12">
        </div>
        <div class="row col-md-12">
            <button type="button" class="btn btn-success" @click="applyAnnual()" value="삭제">신청</button>
            <button type="button" class="btn btn-warning" @click="$emit('close')" value="취소">닫기</button>
        </div>
    </div>
</template>
<script>
    import http from "../../http-common";

    export default {
        name: "working-modal",
        data: function () {
            return {
                applyDate: '',
                min: '',
                max: '',
                empId:''
            }
        }, props: [
            'hot_table',
        ], methods: {
            /* eslint-disable no-console */
            applyAnnual() {// 연차 신청 처리를 하는 메소드
                http
                    .get("/working/applyAnnual/" + this.empId+"?date="+this.applyDate)
                    .then(response => {
                        alert(this.applyDate+" 연차 신청 완료");
                        location.reload();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },// End - applyAnuual()
            settingInput() {// Input의 날짜 범위 설정
                var moment = require('moment');
                this.min = moment().format('YYYY-MM-DD');
                this.max = moment().format('YYYY') + "-12-31";
            }// End - settingInput()
            /* eslint-enable no-console */
        },
        mounted() {
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empId = sessionStorage.getItem("login_id");// sessionStorage에서 사번 가져오기
                this.settingInput();
            }
        }// End - mounted()
    };// End - export default
</script>