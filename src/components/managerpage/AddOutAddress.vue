<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" ><strong>외부 연락처 등록</strong></h5>
                    <button type="button" class="close" aria-label="Close" style="font-size: 40px; color: black;"
                            @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- 직원 추가 기능 -->
                <div class="modal-body">

                    <div v-if="!added">
                        <table class="table table-hover">
                            <tr>
                                <th for="out_id">외부 아이디</th>
                                <td><input type="text" id="out_id" required v-model="outaddress.out_id" disabled placeholder="자동생성"
                                style="text-align: center"></td>
                            </tr>

                            <tr>
                                <th for="name">외부업체 성명</th>
                                <td><input type="text" id="name" required v-model="outaddress.outName"></td>
                            </tr>

                            <tr>
                                <th>외부업체 핸드폰 번호</th>
                                <td><input type="text" required v-model="outaddress.out_mobile"></td>
                            </tr>

                            <tr>
                                <th>외부 업체 이메일</th>
                                <td><input type="text" id="out_id_email" required v-model="outaddress.out_email"></td>
                            </tr>
                            <tr>
                                <th>외부 업체명</th>
                                <td><input type="text" id="out_company" required v-model="outaddress.outCompany"></td>
                            </tr>
                            <tr>
                                <th>외부업체 부서 번호</th>
                                <td><input type="text" id="out_dep_phone" required v-model="outaddress.out_dep_phone">
                                </td>
                            </tr>
                        </table>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="addOut">등록</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="$emit('close')">취소
                            </button>
                        </div>
                    </div>


                    <div v-else>
                        <div class="table">
                            <h5 style="text-align: center"><strong>{{this.outaddress.outCompany}}</strong>의 정보가 입력되었습니다.
                            </h5>
                        </div>
                        <div class="modal-footer">
                            <button button type="button" class="btn btn-primary" v-on:click="newOutAddress">다른 회사 연락처
                                추가
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    @click="$emit('close')">취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";

    export default {
        name: "AddOutAddress",
        data() {
            return {
                outaddress: {
                    out_id: "",
                    outName: "",
                    out_mobile: "",
                    out_email: "",
                    outCompany: "",
                    out_dep_phone: ""

                },
                added: false
            }
        },
        methods: {
            addOut() {
                var data = {
                    out_id: this.outaddress.out_id,
                    outName: this.outaddress.outName,
                    out_mobile: this.outaddress.out_mobile,
                    out_email: this.outaddress.out_email,
                    outCompany: this.outaddress.outCompany,
                    out_dep_phone: this.outaddress.out_dep_phone
                };
                http
                    .post("/outaddress/outaddress/add", data)
                    .then(response => {
                        this.outaddress.out_id = response.data.out_id
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.added = true;
            },
            newOutAddress() {
                this.added = false;
                this.outaddress = {};

                location.reload();
            },

        }
    }
</script>

<style scoped>
    .table {
        height: 270px;
    }

    .modal-footer {
        padding-bottom: 0px;
    }
</style>