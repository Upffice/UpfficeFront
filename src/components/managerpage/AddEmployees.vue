<template>
    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="text-align: left"><strong>직원 등록</strong></h5>
                    <button type="button" class="close" aria-label="Close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- 직원 추가 기능 -->
                <div class="modal-body" style="padding: 0 16px 5px 16px">

                    <div v-if="!added">

                        <table class="table table-hover">
                            <tr>
                                <td v-if="!emp_img_url" colspan="2">
                                    <img class="img" v-bind:src="url">
                                </td>
                                <td v-else colspan="2">
                                    <img class="img" v-bind:src="emp_img_url">
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
                            <div class="file_name">
                                <input type="file"
                                       id="files"
                                       style="display: none"
                                       ref="files"
                                       @change="handleFilesUpload()"/>
                                <div class="add-img">
                                    <div v-for="(file, key) in files" :key="key"

                                    ><p class="file-listing">{{ file.name}}</p>
                                        <span class="remove-file"
                                              v-on:click="removeFile( key )"
                                              style="color: red"
                                        ><small>Remove</small></span>
                                    </div>
                                </div>
                            </div>

                            <!-- <button @click="$refs.fileInput.click()">Pick image</button>-->
                            <!-- <button v-on:click="addFiles()">Add image</button>-->

                            <input type="file" @change="onFileChange" style="width: 200px">

                            <button type="button" class="btn btn-primary" v-on:click="addEmployees">등록</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="cancel">취소
                            </button>
                        </div>
                    </div>


                    <div v-else>
                        <div style="height: 35rem">
                            <h5 style="text-align: center"><strong>{{this.employee.name}}</strong>님의 정보가 입력되었습니다.</h5>
                        </div>
                        <div class="modal-footer">
                            <button button type="button" class="btn btn-primary" v-on:click="newEmployees">다른 직원 정보 추가
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    @click="cancel">취소
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
                files: [],
                downLoadNames: "",

                emp_img_url: "",
                url: "http://localhost:8080/emp_img/10000.jpg"
            }
        },
        methods: {
            onFileChange(e) {
                const file = e.target.files[0];
                this.emp_img_url = URL.createObjectURL(file);
                this.files = file;
            },
            handleFilesUpload() {
                /*2.input type=file dom(원래file형식의 돔)*/
                let uploadedFiles = this.$refs.files.files;
                for (var i = 0; i < uploadedFiles.length; i++) {
                    /*전역변수 배열끝에 돔에서 가져온 파일 추가*/
                    this.files.push(uploadedFiles[i]);
                }
            },
            addFiles() {
                console.log("진입");
                console.log(this.$refs);
                /*1.add File 클릭시 실행메서드*/
                this.$refs.files.click();//Dom의 ref=files 클릭한것과 같은효과
            },
            removeFile(key) {
                /*key번째 1개 삭제*/
                this.files.splice(key, 1);
            },
            fileUpload() {
                this.submitFiles();
                console.log("file + " + this.files.name);
                this.downLoadNames = 'http://localhost:8080/emp_img/' + this.employee.emp_id + '.jpg';  // 사원 이미지 경로 설정

            },
            submitFiles() {
                /*페이지 form전송시 호출되는 메서드(param지워도됨)*/
                let formData = new FormData();
                formData.append('file', this.files);

                http.post('/employees/image/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(r => {
                    var message = r.data;
                    console.log('SUCCESS!!');
                    console.log(message)

                }).catch(function () {
                    console.log('FAILURE!!');
                });

            },

            addEmployees() {
                let data = {
                    emp_id: this.employee.emp_id,
                    emp_pw: this.employee.emp_pw,
                    name: this.employee.name,
                    emp_email: this.employee.emp_email,
                    position: this.employee.position,
                    hire_date: this.employee.hire_date,
                    extension_number: this.employee.extension_number,
                    phone_number: this.employee.phone_number,
                    dep_id: this.employee.dep_id
                }
                if (data.emp_id == "" | data.emp_pw == "" | data.name == "" | data.emp_email == "" | data.position == "" | data.dep_id == "" |
                    data.hire_date == "" | data.extension_number == "" | data.phone_number == "") { // 빈 칸 인지 확인하기
                    alert("빈 칸을 확인해주세요!");

                } else {
                    http
                        .post("/employees/employees/add", data)
                        .then(response => {
                            this.employee.emp_id = response.data.emp_id;
                            console.log(response.data);
                            this.fileUpload();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    this.added = true;
                }
            },
            newEmployees() {
                this.added = false;
                this.employee = {};
                this.emp_img_url = "";
            },
            /* goBack() {
                 history.go(-1);
             },*/
            cancel() {
               this.$emit('close');
                location.reload();
            },

        }
    }
</script>

<style scoped>
    .table {
        margin-bottom: 0;
    }

    .modal-footer {
        padding-bottom: 0px;
    }
    .modal-header{
        padding: 10px 16px 10px 16px;
    }

    .file-listing {
        width: 120px;
        margin: 0 1px 0 0;
        position: relative;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis; /*말 줄임표 위한 설정*/
        white-space: nowrap; /*말 줄임표 위한 설정*/
    }

    .add-img {
        height: 30px;
    }

    .img {
        margin: auto;
        width: 100px;
        height: 105px;
        border-radius: 70%;
        overflow: hidden;
        display: block;
    }

    th, td {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .close{
        font-size: 40px;
        color: black;
        padding: 5px 16px 5px 16px;
    }

</style>