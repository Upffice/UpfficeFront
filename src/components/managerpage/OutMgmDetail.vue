<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" ><strong>외부 연락처 관리(수정/삭제)</strong></h5>
                    <button type="button" class="close" aria-label="Close" style="font-size: 40px; color: black;"
                            @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- 직원 수정/삭제 기능 -->
                <div v-if="outAddress" class="modal-body">
                    <table class="table table-hover">

                        <tr>
                            <th>ID</th>
                            <td>{{outAddress.out_id}}</td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td><input type="text" placeholder="성명 수정" required v-model="outAddress.outName"></td>
                        </tr>
                        <tr>
                            <th>핸드폰 번호</th>
                            <td><input type="text" placeholder="핸드폰 번호 수정" required v-model="outAddress.out_mobile"></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><input type="text" placeholder="이메일 수정" required v-model="outAddress.out_email"></td>
                        </tr>
                        <tr>
                            <th>회사명</th>
                            <td><input type="text" placeholder="회사명 수정" required v-model="outAddress.outCompany"></td>
                        </tr>
                        <tr>
                            <th>회사 전화 번호</th>
                            <td><input type="text" placeholder="회사 전화번호 수정" required v-model="outAddress.out_dep_phone"></td>
                        </tr>

                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="modifyOut(outAddress.out_id)">수정</button>
                    <button type="button" class="btn btn-primary" @click="deleteOut">삭제</button>
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
        name: "OutMgmDetail",
        props: ["outAddress"],
        data() {
            return {
                outaddress: {
                    out_id: "",
                    outName: "",
                    out_mobile: "",
                    out_email:"",
                    outCompany:"",
                    out_dep_phone:""
                },
            };
        },

        methods:{
            modifyOut(id) {
                let data = {
                    outName: this.outAddress.outName,
                    out_mobile: this.outAddress.out_mobile,
                    out_email: this.outAddress.out_email,
                    outCompany: this.outAddress.outCompany,
                    out_dep_phone: this.outAddress.out_dep_phone

                }

                if (data.outName==""|data.out_mobile==""|data.out_email==""|
                    data.outCompany==""|data.out_dep_phone==""){ // 빈 칸 인지 확인하기
                    alert("빈 칸을 확인해주세요!");
                } else {
                    http
                        .put("/outaddress/update/" + id, data)
                        .then(response => {
                            if (response.data == 1) { // 결과값이 1이라면 1개의 데이터가 수정됐다는 뜻, 즉 수정 성공!
                                alert("수정 완료!");
                                this.$emit('close');

                                /*this.$router.push("/manager/out-address")*/
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            }, // End - updatePhone() : 사원 정보 수정하기(휴대폰 번호, 비밀번호)
            deleteOut(){
                http
                    .delete("/outaddress/outaddress/"+ this.outAddress.out_id)
                    .then(response=>{
                        console.log(response.data);
                        this.$emit('close');
                        location.reload();
                    })
                    .catch(e=>{
                        console.log(e);
                    });

            }, //END- delete
        },
    }
</script>

<style scoped>
    .table {
        width: 100%;
        margin: auto;
        border: 1px solid #dddddd;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    th {
        vertical-align: middle;
        text-align: left;
    }
    td {
        text-align: left;
    }
</style>