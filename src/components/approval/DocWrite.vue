<template>


    <div class="card border-primary mb-3" style="max-width: 1100px;">
        <div class="list row">
            <subMenu></subMenu>
        </div>
        <div class="card-header">
            <div class="top" style="font-size: 30px">
                <span class="title"><b>기안문작성</b></span>
                <span class="button-group">
                    <button type="button" class="btn btn-secondary disabled buttons"
                           v-on:click="search_signer">결재선</button>
                    <button type="button" class="btn btn-secondary disabled buttons"
                            v-on:click="tempsaveDoc">임시저장</button>
                    <button type="button" class="btn btn-secondary disabled buttons" v-on:click="saveDoc">상신</button>
                    <button type="button" class="btn btn-secondary disabled buttons" v-on:click="cancelDoc">취소</button>
                </span>
            </div>
            <div class="row">
                <modals-container v-on:submit_signer="receiveModalData"/>
            </div>
            <!--------------------------------------------결제선 테이블 시작------------------------------------------------------->
            <div class="sign-line" style="float: right; padding-right: 65px; padding-bottom: 40px;">
                <table class="sign-table" style="border: black 2px solid">
                    <thead>
                    <tr>
                        <th class="sign-th table-light" rowspan="2" style="width:90px"></th>
                        <th class="table-light" style="border: black 2px solid">기안</th>
                        <th class="table-light" style="border: black 2px solid">결재</th>
                        <th class="table-light" style="border: black 2px solid">결재</th>
                        <th class="table-light" style="border: black 2px solid">결재</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="table-light" style="vertical-align: middle; line-height: 20px;">결<br><br>재</td>
                        <td style="border: black 2px solid"><b>{{approval.writerName}}</b><br><br>사인<br>{{cTime}}</td>
<!--                        <td v-for="signid in signIds" style="border: black 2px solid"><b>{{signid.name}}</b><br><br>사인<br>{{signid.date}}</td>-->

                        <td style="border: black 2px solid"><b>{{approval.signId1}}장범준<br><br></b></td>
                        <td v-if="approval.signId2!=null" style="border: black 2px solid"><b>{{approval.signId2}}장범준<br><br></b></td>
                        <td v-if="approval.signId3!=null"style="border: black 2px solid"><b>{{approval.signId3}}강범준<br><br></b></td>
<!--                        <td style="border: black 2px solid">장범준</td>-->
<!--                        <td style="border: black 2px solid">김범준</td>-->
<!--                        <td style="border: black 2px solid">장범준</td>-->
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--------------------------------------------결재선 테이블 끝--------------------------------------------------------->


            <!--------------------------------------------form테이블 시작---------------------------------------------------------->
            <table class="table tb-bd">
                <th scope="row" style="border: aliceblue; font-size: 18px"><div>문서유형</div>

                </th>
                <td scope="row" style="border: aliceblue;">

                    <select id="type" name="type" required v-model="approval.type" style="width: 80px; height: 25px; float: left;">
                        <option v-for="type in types">{{type}}</option>

                </select>
                </td>


                <tr>
                    <th scope="row" class="table-light"><label for="docNum">문서번호</label></th>
                    <td><input type="text" class="form-control" id="docNum" required v-model="approval.docNum"
                               name="docNum" readonly placeholder="자동기입" style="background-color: aliceblue"></td>
                    <th scope="row" class="table-light"><label for="date">기안일자</label></th>
                    <td><input type="text" class="form-control" id="date" required v-model="approval.date" name="type"
                         style="background-color: aliceblue" :placeholder="cTime" readonly>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="table-light"><label for="writerName">기안자</label></th>
                    <td><input type="text" class="form-control" id="writerName" required v-model="approval.writerName"
                               name="writerName" value="this.writer_info.writer_name" readonly
                               style="background-color: aliceblue"></td>
                    <th scope="row" class="table-light"><label for="writerDepName">기안부서</label></th>
                    <td><input type="text" class="form-control" id="writerDepName" required
                               v-model="approval.writerDepName" name="writerDepName" readonly
                               style="background-color: aliceblue"></td>
                </tr>
                <tr>
                    <th scope="row" class="table-light"><label for="writerPosition">직위/직책</label></th>
                    <td><input type="text" class="form-control" id="writerPosition" required
                               v-model="approval.writerPosition" name="writerPosition" readonly
                               style="background-color: aliceblue"></td>
                    <th scope="row" class="table-light"><label for="refId">참조자</label></th><!--수정-->
                    <td><input type="text" class="form-control" id="refId" required v-model="approval.refId"
                               name="refId" placeholder="참조자를 선택해주세요."></td>
                    <!--                    <td><button>추가</button></td>-->
                </tr>
                <tr>
                    <th scope="row" class="table-light"><label for="comment">의견</label></th>
                    <td colspan="3"><input type="text" class="form-control" id="comment" required
                          q                v-model="approval.comment" name="comment"
                                           placeholder="간단한 의견을 적어주세요.(100byte 이내)"></td>
                </tr>
                <tr>
                    <th scope="row" class="table-light"><label for="title">문서제목</label></th>
                    <td colspan="3"><input type="text" class="form-control" id="title" required v-model="approval.title"
                                           name="title" placeholder="기안문의 제목을 적어주세요.(100byte 이내)"></td>
                </tr>
                <tr>
                    <th scope="row" class="table-light"><label for="refFile">참조</label></th><!--수정-->
                    <td colspan="3"><input type="text" class="form-control" id="refFile" required
                                           v-model="approval.refFile" name="refFile" placeholder="참조사항을 적어주세요."></td>
                </tr>
                <tr>
                    <td colspan="3" rowspan="10" style="height: 500px"><textarea class="form-control" id="appContnt"
                                                                                 required v-model="approval.content"
                                                                                 placeholder="양식을 입력해주세요."/>
                    </td>
                </tr>
            </table>
        </div>
        <!--------------------------------------------form테이블 끝---------------------------------------------------------->
    </div>


</template>

<script>
    import ApprovalSubMenu from "./ApprovalSubMenu";
    import http from "../../http-common";
    import SearchSigner from "./SearchSigner";

    export default {
        name: "write",
        data: function () {
            return {
                visible:false,
                login_id: "",
                selectedData:"approval",
                types:["결재","합의","협조"],
                cTime:"",
                approval: {
                    docNum: "",
                    type: "결재",
                    title: "",
                    writerId: "",
                    date: "",
                    comment: "",
                    refId1: "",
                    refId2: "",
                    refId3: "",
                    refFile: "",
                    content: "",
                    signId1: "",
                    signId2: "",
                    signId3: "",
                    signDate1: "",
                    signDate2: "",
                    signDate3: "",
                    statusCheck: "",
                    status1: "",
                    status2: "",
                    status3: "",
                    writerName: "",
                    writerPosition: "",
                    writerDepId: "",
                    writerDepName: ""
                },
            }
        },
        components: {
            subMenu: ApprovalSubMenu
        },
        methods: {
            receiveModalData : function(sign1,sign2,sign3){
                console.log("메서드진입")

                this.approval.signId1 = sign1;
                this.approval.signId2 = sign2;
                this.approval.signId3 = sign3;
                console.log("메서드진입")
                console.log("this.approval.signId1")
                console.log(this.approval.signId1)
                alert("데이터를 받았습니다.")
            },
            saveDoc: function () {
                /*submit(상신)누르면 controller접근해서 데이터 받아오고 쏴주는 로직*/
                /*전역변수 지역변수(DB접근명)로 담아주는 변수*/
                var data = {
                        app_doc_num: this.approval.docNum,
                        app_type: this.approval.type,
                        app_doc_title: this.approval.title,
                        app_writer_id: this.approval.writerId,
                        app_date: this.approval.date,
                        app_comment: this.approval.comment,
                        app_ref_id1: this.approval.refId1,
                        app_ref_id2: this.approval.refId2,
                        app_ref_id3: this.approval.refId3,
                        app_ref_file: this.approval.refFile,
                        app_content: this.approval.content,
                        app_sign_id1: this.approval.signId1,
                        app_sign_id2: this.approval.signId2,
                        app_sign_id3: this.approval.signId3,
                        app_sign_date1: this.approval.signDate1,
                        app_sign_date2: this.approval.signDate2,
                        app_sign_date3: this.approval.signDate3,
                        app_status_check: this.approval.statusCheck,
                        app_status1: this.approval.status1,
                        app_status2: this.approval.status2,
                        app_status3: this.approval.status3,
                        app_writer_name: this.approval.writerName,
                        app_writer_position: this.approval.writerPosition,
                        app_writer_depid: this.approval.writerDepId,
                        app_writer_depname: this.approval.writerDepName

                    };
                http
                    .post("/app/doc/write", data)
                    .then(response => {
                        this.approval = response.data;
                        alert("DB에 저장되었습니다.");
                        this.$router.push('/app/');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            search_signer(){
                /*결제자 누르면 검색창(modal)띄워주는 로직*/
                this.$modal.show(SearchSigner,{
                    // handlers: {
                    //     doSomethingInComponent: (...args) => {
                    //         //do something
                    //         //this - is your component where was called modal
                    //         //args - corrected arguments from modal
                    //         console.log(args, this);
                    //     },
                    //https://github.com/euvl/vue-js-modal/issues/192
                    hot_table : 'data',
                    modal : this.$modal },{
                    name: 'dynamic-modal',
                    width : '600px',
                    height : '600px',
                    draggable: true
                })
            },
            showsignDoc() {
                /*결재선(검색 modal)띄우고 선택한 것 비동기로 문서에 표시해주는 로직*/
                console.log("showsignDoc_method");
            },
            tempsaveDoc() {
                /*임시저장, 임시저장함으로 보내고, 임시저장함으로 이동하는 로직*/
                console.log("tempsaveDoc_method");
            },
            cancelDoc() {
                /*취소경고, 문서작성취소, 문서함메인으로 돌려주는 로직*/
                console.log("cancelDoc_method");

                var result = confirm("입력을 취소하시겠습니까?");
                if(result) {
                    alert("입력이 취소되었습니다!");
                    this.$router.push('/app');
                }

            },
            getEmpInfo(id) {    // 매개변수 id는 this.employee.emp_id 이다. : mounted()때 호출되는 메소드.
                http
                    .post("/mypage/" + id)
                    .then(response => {
                        // 응답 데이터를 employee 데이터에 대입하기.
                        this.approval.writerName = response.data.emp_name;
                        this.approval.writerPosition = response.data.position;
                        this.approval.writerDepId = response.data.dep_id;

                        this.approval.writerId = id;

                        var d = new Date();
                        var currentDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                        var currentTime = " " + d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                        this.cTime = currentDate;
                        this.getDep_Name(this.approval.writerDepId);     // 사원 정보 중 부서 이름 가져오기
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }, // End - getEmpInfo : 사원 정보 가져오기, mounted()일 때 실행 됨.
            getDep_Name(dep_id) {
                http
                    .post("/dep/" + dep_id)
                    .then(response => {
                        this.approval.writerDepName =  response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            /*페이지 로딩전 id에서 session으로 접근, 데이터 가져오는 로직*/

            if (sessionStorage.length > 0) {
                this.login_id = sessionStorage.getItem("login_id");

                this.getEmpInfo(this.login_id);
            }else{
                alert("로그인을 해주세요!");
                this.$router.push('/');
            }

        },
        // computed :{
        //     dataChanged : function () {
        //         if(this.approval.signId1 != ''){
        //             this.receiveModalData();
        //         }
        //     }
        // }

    }
</script>

<style scoped>

    .card {
        margin: auto auto auto 300px;
        border: 1.5px solid black;
    }

    .title {
        text-align: left;
        margin: 30px;
    }

    .table {
        width: 1100px;
        max-width: 1100px;
        /*border:1.5px solid black;*/
        /*border-collapse: collapse;*/
    }

    .card-header {
        margin: 0;
        padding: 0;
        background-color: aliceblue;

    }

    .top {
        text-align: left;
        margin: 30px
    }

    th {
        width: 150px;
    }

    .button-group {
        margin-top: 0px;
        margin-left: 500px;
    }

    .sign-line {

    }

    .sign-table {
        max-width: 300px;
        height: 150px;
    }

    .sign-th {

    }

    input {
        background-color: transparent;
        border: transparent;
        width: border-box;

    }

    textarea {
        height: 500px;
        width: 159%;
        background-color: transparent;
        border: transparent;
        float: left;

    }

    .tb-bd {
        /*border: black 2px solid;*/
    }

</style>