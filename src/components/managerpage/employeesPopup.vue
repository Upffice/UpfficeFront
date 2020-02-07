<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="text-align: center; margin: auto"><strong>외부 연락처 관리(수정/삭제)</strong></h5>
                </div>
                <!-- 직원 수정/삭제 기능 -->
                <div v-if="employees" class="modal-body">
                    <table class="table table-hover">

                        <tr>
                            <th>사번</th>
                            <td>{{employees.emp_id}}</td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td><input type="text" placeholder="성명 수정" required v-model="employees.name"></td>
                        </tr>
                        <tr>
                            <th>소속</th>
                            <td><input type="text" placeholder="소속 수정" required v-model="employees.dep_id"></td>
                        </tr>
                        <tr>
                            <th>직책</th>
                            <td><input type="text" placeholder="직책 수정" required v-model="employees.position"></td>
                        </tr>
                        <tr>
                            <th>내선번호</th>
                            <td><input type="text" placeholder="내선번호 수정" required v-model="employees.extension_number">
                            </td>
                        </tr>
                        <tr>
                            <th>입사일</th>
                            <td><input type="text" placeholder="입사일 수정" required v-model="employees.hire_date"></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><input type="text" placeholder="이메일 수정" required v-model="employees.emp_email"></td>
                        </tr>
                        <tr>
                            <th>휴대폰번호</th>
                            <td><input type="text" placeholder="휴대폰번호 수정" required v-model="employees.phone_number"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="modifyEmp(employees.emp_id)">수정</button>
                    <button type="button" class="btn btn-primary" @click="deleteEmp">삭제</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import http from "../../http-common";

    export default {
        name : 'employeesPopup',
        props: ['employees'],
        data() {
            return {
                employee: {
                    emp_id: "",
                    emp_pw: "",
                    emp_name: "",
                    emp_email: "",
                    position: "",
                    hire_date: "",
                    extension_number: "",
                    phone_number: "",
                    dep_id: ""
                },
                dep_name: "", // 부서이름 담을 변수
                emp_img_url: "" // 사원 사진 경로
            }
        },
        watch: {'$route': 'getEmpInfo'},  //라우터 변경되면 메소드 다시 호출
        methods: {
            modifyEmp(id) {
                // 수정 메소드
                let data = {
                    name: this.employees.name,
                    dep_id: this.employees.dep_id,
                    position:this.employees.position,
                    extension_number: this.employees.extension_number,
                    hire_date: this.employees.hire_date,
                    emp_email: this.employees.emp_email,
                    phone_number : this.employees.phone_number
                }

                if (data.name==""|data.dep_id==""|data.position==""|data.extension_number==""|
                    data.hire_date==""|data.emp_email==""|data.phone_number == ""){ // 빈 칸 인지 확인하기
                    alert("빈 칸을 확인해주세요!");
                } else {
                    http
                        .put("/employees/update/" + id, data)
                        .then(response => {
                            if (response.data == 1) { // 결과값이 1이라면 1개의 데이터가 수정됐다는 뜻, 즉 수정 성공!
                                alert("수정 완료!");
                                this.$emit('close');

                               /* this.$router.push("/manager")*/
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

            },
            deleteEmp() {
                // 삭제 메소드
                http
                    .delete("/employees/employees/"+ this.employees.emp_id)
                    .then(response=>{
                        console.log(response.data);
                        this.$emit("refreshData");
                        this.$emit('close');
                        this.$router.push('/manager/employees');
                        /* router.reload(); */
                    })
                    .catch(e=>{
                        console.log(e);
                    });
            }

        },
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