<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">사원 관리(수정/삭제)</h5>
                </div>
                <!-- 일정 추가 기능 -->
                <div class="modal-body">
                    <table class="table table-hover">

                        <tr>
                            <th>사번</th>
                            <td>{{employee.emp_id}}</td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td><input type="text" placeholder="성명 수정" required v-model="employee.name"></td>
                        </tr>
                        <tr>
                            <th>소속</th>
                            <td><input type="text" placeholder="소속 수정" required v-model="employee.dep_id"></td>
                        </tr>
                        <tr>
                            <th>직책</th>
                            <td><input type="text" placeholder="직책 수정" required v-model="employee.position"></td>
                        </tr>
                        <tr>
                            <th>내선번호</th>
                            <td><input type="text" placeholder="내선번호 수정" required v-model="employee.extension_number"></td>
                        </tr>
                        <tr>
                            <th>입사일</th>
                            <td><input type="text" placeholder="입사일 수정" required v-model="employee.hire_date"></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><input type="text" placeholder="이메일 수정" required v-model="employee.emp_email"></td>
                        </tr>
                        <tr>
                            <th>휴대폰번호</th>
                            <td><input type="text" placeholder="휴대폰번호 수정" required v-model="employee.phone_number"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="modifyEmp">수정</button>
                    <button type="button" class="btn btn-primary" @click="deleteEmp">삭제</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import http from "../../http-common";

    export default {
        data(){
            return {

            }
        },
        props : [
            'registerData'
        ],
        methods : {
            modifyEmp() {
                // 수정 메소드
            },
            deleteEmp() {
                // 삭제 메소드
            }

        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.emp_id = sessionStorage.getItem("login_id");
            }else {
                this.$router.push("/");
            }
        }
    };
</script>
<style scoped>
    .popupInput {
        width: 100%;
    }
    .dateInput {
        width: 45%;
        float: left;
    }
    .timeInput {
        width: 40%;
        float: left;
        margin-right: 20px;
    }
</style>