<template>
    <div class="list row">
        <div>
            <h4>양식 다운로드</h4>
            <hr>
            <div>
                <table class="table table-hover" style="margin-top: 20px">
                    <thead thead class="table-secondary">
                    <tr>
                        <td>파일 이름</td>
                        <td>파일</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(downLoadName,index) in downLoadNames" :key="index">
                        <td>{{downLoadName}}</td>
                        <td> <router-link to="#" @click.native="getDown(downLoadName)"><label class="badge badge-success">다운로드</label></router-link></td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div>
                <div class="container">                            <!--@change는 변경될때 메서드 호출 ~watch와 비슷~ -->
                    <input
                            type="file"
                            id="files"
                            style="display: none"
                            ref="files" multiple
                            v-on:change="handleFilesUpload()">
                    <div class="large-12 medium-12 small-12 cell"
                         style="float: left; margin: 0px 20px;">
                        <div v-for="(file, key) in files" :key="key"
                             class="file-listing">{{ file.name }}
                            <span class="remove-file"
                                  v-on:click="removeFile( key )"
                                  style="color: red"
                            ><small>Remove</small></span>
                        </div>
                    </div>
                    <hr>
                    <div class="large-12 medium-12 small-12 cell" style="float: left; margin: 0px 20px;">
                        <button v-on:click="addFiles()">Add Files</button>
                    </div>

                </div>
                <button @click="fileUpload">저장</button>
            </div>

            <hr>
            <div class="container">
                <div class="large-12 medium-12 small-12 cell" style="float: left; margin: 0px 20px;"
                     readonly>
                    <router-link to="#" v-for="(downLoadName,index) in downLoadNames" :key="index"
                                 class="file-listing"
                                 @click.native="getDown(downLoadName)">
                        <div>{{ downLoadName }}</div>
                    </router-link>
                </div>
                <div class="large-12 medium-12 small-12 cell" style="float: left; margin: 0px 20px;">
                    <button @click="getDownAll">Download All</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script>


    import http from "../../http-common";

    export default {
        name: "formManagement",

        data() {
            return {
                files: [],
                downLoadNames: [],
            }
        },
        methods: {
            handleFilesUpload() {
                /*2.input type=file dom(원래file형식의 돔)*/
                let uploadedFiles = this.$refs.files.files;
                for (var i = 0; i < uploadedFiles.length; i++) {
                    /*전역변수 배열끝에 돔에서 가져온 파일 추가*/
                    this.files.push(uploadedFiles[i]);
                }
            },
            removeFile(key) {
                /*key번째 1개 삭제*/
                this.files.splice(key, 1);
            },
            submitFiles() {
                /*페이지 form전송시 호출되는 메서드(param지워도됨)*/
                let formData = new FormData();

                for (var i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    /*append는 덮어쓰기가 아니라 추가*/
                    /*formData 뒤에 key=이름, value=파일 추가*/
                    formData.append('file', file);

                }
                /*key value 확인 for-each문*/
                /*formData.forEach((value, key) => {
                    console.log("key %s: value %s", key, value);
                })*/

                /*param필요없으면 +docnum지워도됨*/
                http.post('/employees/multiple-files/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(r => {
                    var message = r.data
                    console.log('SUCCESS!!');
                    console.log(message)

                }).catch(function () {
                    console.log('FAILURE!!');
                });

            },
            addFiles() {
                console.log("진입");
                console.log(this.$refs);
                /*1.add File 클릭시 실행메서드*/
                this.$refs.files.click();//Dom의 ref=files 클릭한것과 같은효과

            },
            fileUpload() {
                this.submitFiles();
            },

            getDown(filename) {
                /*링크누르면 다운로드 되는 메서드*/
                /*axios post 저수준 api*/
                /**/
                http
                ({
                    url: '/employees/files-download',
                    method: 'POST',
                    responseType: 'blob', // important
                    data: filename,
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(r => {
                        // var message = r.data
                        console.log("r.data");
                        console.log(r.data);
                        var fileURL = window.URL.createObjectURL(new Blob([r.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', filename);
                        document.body.appendChild(fileLink);
                        fileLink.click();
                        console.log('SUCCESS!!');
                        // console.log(message)

                    }).catch(function () {
                    console.log('FAILURE!!');
                });
            },
            getDownAll() {
                /*전체 다운로드*/
                if (this.downLoadNames.length > 0) {
                    for (let i = 0; i < this.downLoadNames.length; i++) {
                        let filename = this.downLoadNames[i];
                        http
                        ({
                            url: '/employees/files-download',
                            method: 'POST',
                            responseType: 'blob', // important
                            data: filename,
                            headers: {
                                "Content-Type": "application/json"
                            },
                        })
                            .then(r => {
                                // var message = r.data
                                console.log("r.data");
                                console.log(r.data);
                                var fileURL = window.URL.createObjectURL(new Blob([r.data]));
                                var fileLink = document.createElement('a');

                                fileLink.href = fileURL;
                                fileLink.setAttribute('download', filename);
                                document.body.appendChild(fileLink);
                                fileLink.click();
                                console.log('SUCCESS!!');
                            }).catch(function () {
                            console.log('FAILURE!!');
                        });
                    }
                }
            },
            getDownloadLink() {
                /*1.'파일명' 다운로드링크받아오는 메서드*/
                /*mounted에 구현하는것 추천*/
                http
                    .get('/employees/down')
                    .then(response => {
                        this.downLoadNames = response.data;
                        console.log(this.downLoadNames);
                    })
                    .catch(r => {
                        this.downLoadNames = ["저장된 파일이 없습니다."]
                        console.log(r);
                    })
            },

        },
        mounted() {
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.getDownloadLink();
            } else {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    .list {
        text-align: center;
        max-width: 90%;
        margin-top: 20px;
    }
</style>