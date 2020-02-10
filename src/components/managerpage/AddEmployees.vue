<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="text-align: center; margin: auto"><strong>직원 등록</strong></h5>
                </div>
                <!-- 직원 추가 기능 -->
                <div class="modal-body">

                    <div v-if="!added">

                        <table class="table table-hover">
                            <tr>
                                <td colspan="2">
                                    <img v-bind:src="emp_img_url">

                                    <input
                                            style="display: none"
                                            ref="fileInput"
                                            type="file"
                                            @change="onFileSelected"
                                    />
                                    <button @click="$refs.fileInput.click()">Pick File</button>
                                    <button @click="onUpload">Upload</button>

                                </td>
                            </tr>
                            <tr>
                                <th for="emp_id">사원 아이디</th>
                                <td><input type="text" id="emp_id" required v-model="employee.emp_id"
                                           value="emp_id"></td>
                            </tr>
                            <tr>
                                <th for="emp_pw">사원 비밀번호</th>
                                <td><input type="text" id="emp_pw" required v-model="employee.emp_pw"
                                           value={this.emp_pw}></td>
                            </tr>
                            <tr>
                                <th for="name">사원 성명</th>
                                <td><input type="text" id="name" required v-model="employee.name"></td>
                            </tr>
                            <tr>
                                <th>사원 이메일</th>
                                <td><input type="text" id="emp_email" required v-model="employee.emp_email"></td>
                            </tr>
                            <tr>
                                <th>사원 직책</th>
                                <td><input type="text" id="position" required v-model="employee.position"></td>
                            </tr>
                            <tr>
                                <th>사원 입사일</th>
                                <td><input type="text" required v-model="employee.hire_date"></td>
                            </tr>
                            <tr>
                                <th>내선번호</th>
                                <td><input type="text" required v-model="employee.extension_number"></td>
                            </tr>
                            <tr>
                                <th>핸드폰 번호</th>
                                <td><input type="text" required v-model="employee.phone_number"></td>
                            </tr>
                            <tr>
                                <th>부서 번호</th>
                                <td><input type="text" required v-model="employee.dep_id"></td>
                            </tr>
                        </table>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="addEmployees">등록</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="$emit('close')">취소
                            </button>
                        </div>
                    </div>


                    <div v-else>
                        <div class="table">
                            <h5 style="text-align: center"><strong>{{this.employee.name}}</strong>님의 정보가 입력되었습니다.</h5>
                        </div>
                        <div class="modal-footer">
                            <button button type="button" class="btn btn-primary" v-on:click="newEmployees">다른 직원 정보 추가
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
        name: "AddEmployees",
        data() {
            return {
                employee: {
                    emp_id: "",
                    emp_pw: "",
                    name: "",
                    emp_email: "",
                    position: "",
                    hire_date: "",
                    extension_number: "",
                    phone_number: "",
                    dep_id: ""

                },
                added: false,
                selectedFile: null,
                emp_img_url: ""
            }
        },
        methods: {

            onFileSelected(event) {
                console.log(event)
                this.selectedFile = event.target.files[0]//0이 file이고 1이길이
            },
            onUpload() {
                let formData = new FormData();
                formData.append('image', this.selectedFile, this.selectedFile.name);
                console.log(this.selectedFile.name)

                http
                    .post('src/assets', formData, {
                        onUploadProgress: uploadEvent => {
                            console.log('Upload Progress: ' + Math.round(uploadEvent.load / uploadEvent.total * 100) + '%')
                        }
                    })
                    .then(response => {
                        console.log(response)
                        this.emp_img_url = require('../../assets/emp_img/'+this.selectedFile.name+'.jpg');

                    })
            },


            addEmployees() {
                var data = {
                    emp_id: this.employee.emp_id,
                    emp_pw: this.employee.emp_pw,
                    name: this.employee.name,
                    emp_email: this.employee.emp_email,
                    position: this.employee.position,
                    hire_date: this.employee.hire_date,
                    extension_number: this.employee.extension_number,
                    phone_number: this.employee.phone_number,
                    dep_id: this.employee.dep_id
                };
                http
                    .post("/employees/employees/add", data)
                    .then(response => {
                        this.employee.emp_id = response.data.emp_id
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.added = true;
            },
            newEmployees() {
                this.added = false;
                this.employee = {};
            },
            /* goBack() {
                 history.go(-1);
             }*/

        }
    }
</script>

<style scoped>
    .table {
        height: 550px;
    }

    .modal-footer {
        padding-bottom: 0px;
    }
</style>