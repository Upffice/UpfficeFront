<template>
    <div class="list row">
        <AddressSubMenu></AddressSubMenu>
        <div>
            <h3>양식 다운로드</h3>

            <div class="btn-group" style="margin-bottom: 2px; float: right">
                <div class="file-listing">
                    <input type="file"
                           id="files"
                           style="display: none"
                           ref="files" multiple
                           v-on:change="handleFilesUpload()">
                    <div>
                        <div
                                v-for="(file, key) in files" :key="key">
                            {{ file.name}}
                            <span class="remove-file"
                                  v-on:click="removeFile( key )"
                                  style="color: red"
                            ><small>&nbsp;&nbsp;&nbsp; Remove</small></span>
                        </div>
                    </div>
                </div>
                <div style="float: right;">

                    <button class="btn btn-primary"
                            @click="getDownAll">모든 파일 다운
                    </button>
                </div>
            </div>


            <!--------------------------------------- 테이블 시작 ------------------------------------------->

            <div>
                <table class="table table-hover" style="margin-top: 20px">
                    <thead thead class="table-primary">
                    <tr>
                        <td style="width: 15%">번호</td>
                        <td>파일 이름</td>
                        <td style="width: 30%">파일</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(downLoadName,index) in currentPosts " :key="index"><!--downLoadNames / currentPosts-->
                        <td>{{(index+1)}}</td>
                        <td class="td_name">{{downLoadName}}</td>
                        <td>
                            <router-link to="#" @click.native="getDown(downLoadName)"><label
                                    class="badge badge-success">다운로드</label></router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="page">
                    <ul class="pagination">
                        <li class="page-item">
                            <button class="page-link" @click="gotoStart()">&laquo;</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="prev()"><</button>
                        </li>
                        <li v-for="(pageNum, index) in currentPages" :key="index" class="page-item"
                            :class="{'active':isSelected(index)}">
                            <button class="page-link" @click="changePage(pageNum)">{{pageNum}}</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="next()">></button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="gotoEnd()">&raquo;</button>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    </div>

</template>

<script>
    import http from "../../http-common";
    import AddressSubMenu from "../address/AddressSubMenu";

    export default {
        name: "formFile",
        data() {
            return {
                files: [],
                downLoadNames: [],

                currentPosts: [],
                count: 0,   //총 길이
                countList: 10, // 한 페이지에 나올 게시글 개수
                totalPage: 1, // 페이지 번호 묶음 (5 개씩 묶음)
                page: 1,
                countPage: 5,
                startPage: 1,
                endPage: 0,
                totalPages: [],
                currentPages: [], // 현재 페이지 번호들 배열 5개 짜리

                searchWord: "",
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

                http
                    .post('/employees/multiple-files/',
                        formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    .then(r => {
                        var message = r.data
                        console.log('SUCCESS!!');
                        console.log(message);
                    })
                    .catch(function () {
                        console.log('FAILURE!!');
                    });

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
                        /*  console.log(this.downLoadNames);*/
                        this.setPagination();
                        this.setCurrentPosts();


                    })
                    .catch(r => {
                        this.downLoadNames = ["저장된 파일이 없습니다."]
                        console.log(r);
                    })
            },
            setPagination() {
                this.count = this.downLoadNames.length;
                /*console.log(this.downLoadNames.length + "길이 찍어보기")*/
                this.totalPage = this.count / this.countList; // 총 페이지 개수
                if (this.count % this.countList > 0) {
                    this.totalPage = Math.ceil(this.totalPage);
                }
                if (this.totalPage < this.page) {
                    this.page = this.totalPage;
                }

                for (let i = 0; i < this.totalPage; i++) {
                    this.totalPages[i] = i + 1;
                }

                this.startPage = ((this.page - 1) / this.countPage) * this.countPage + 1; // 시작 페이지

                if (this.totalPage < 5) {
                    this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                } else {
                    this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                }

                this.currentPages = [];
                let j = this.startPage - 1;
                for (let i = 0; i <= (this.endPage - this.startPage) && j <
                this.totalPage; i++) {
                    this.currentPages[i] = this.totalPages[j];
                    j++;
                    /* console.log("curr " + i + "번째 " + this.currentPages[i]);
                     console.log("startPage : " + this.startPage)
                     console.log("endPage : " + this.endPage)
                     console.log("totalPage : " + this.totalPage)
                     console.log("totalPages : " + this.totalPages)*/

                }
            },
            setCurrentPosts() {
                this.currentPosts = [];
                let j = (this.page - 1) * this.countList;
                for (let i = 0; i < this.countList && j < this.downLoadNames.length; i++) {
                    this.currentPosts[i] = this.downLoadNames[j];
                    j++;
                }

            },

            changePage(pageNum) {
                this.page = pageNum;
                this.setCurrentPosts();
                /*console.log(this.page)*/
            },
            isSelected(index) { //<< >>버튼 메서드, 눌렀을때 색깔 바뀌는거
                /* 선택된 class 바인딩 위해 return 반환하는 메서드*/
                if (index == (this.page - 1) % this.countPage) {
                    return true
                } else {
                    return false
                }
            },
            prev() {
                if (this.startPage != 1) {
                    this.startPage = this.startPage - 5;
                    this.page = this.startPage;
                    if (this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage - 1;
                    for (let i = 0; i <= (this.endPage - this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        /* console.log("curr " + i + "번째 " + this.currentPages[i]);*/
                    }
                    this.setCurrentPosts();
                }
            },
            next() {
                if (this.endPage < this.totalPage) {
                    this.startPage = this.endPage + 1;
                    this.page = this.startPage;
                    if (this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage - 1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage - 1;
                    for (let i = 0; i <= (this.endPage - this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        /* console.log("curr " + i + "번째 " + this.currentPages[i]);*/
                    }
                    this.setCurrentPosts();
                }
            },
            gotoStart() {
                // location.reload();
                this.changePage(1);
                this.setPagination()
            },
            gotoEnd() {
                let pack = Math.ceil(this.totalPage / this.countPage)//몇덩이인지(페이지묶음수)
                for (let i = 0; i < pack; i++)
                    this.next()
                this.changePage(this.totalPage);
            }

        },
        mounted() {
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.getDownloadLink();
            } else {
                this.$router.push("/");
            }
        },
        components:{
            AddressSubMenu
        }
    }
</script>

<style scoped>
    .list {
        text-align: center;
        max-width: 90%;
        margin-left: 18%;
        margin-right: 5%;
        margin-top: 20px;
    }

    .page {
        display: table;
        text-align: center;
        margin: auto;
        padding-top: 30px;
        position: relative;
    }

    .btn {
        margin: 20px 3px 20px 0px;
        position: relative;
    }

    .btn-group {
        float: right;
    }

    .file-listing {
        width: 200px;
        height: 80px;
        margin: 0 1px 0 0;
        position: relative;
        text-align: left;
        overflow: auto;
        text-overflow: ellipsis; /*말 줄임표 위한 설정*/
        white-space: nowrap; /*말 줄임표 위한 설정*/
        -ms-overflow-style: none; /*IE에서 스크롤바 투명하게 하기*/

    }

    .file-listing::-webkit-scrollbar { /*IE 제외한 브라우저에서 스크롤바 투명하게 하기*/
        width: 1px;
        background: transparent;
    }

    .td_name {
        padding-left: 10%;
        text-align: left;
    }

    tbody > tr > td {
        height: 5px;
        padding: 8px 8px 8px 8px;
    }
    h3 {
        text-align: left;
        float: left;
    }

</style>