<template>
    <div class="root"><h4>설문조사 등록</h4>
        <div class="submitform">
           <subMenu></subMenu>

            <div v-if="!submitted"  class="ppo">
                <div class="form-group">
                </div>

                <div class="form-group" >

                    <input type="text" class="form-control" id="writer" required v-model="survey.survey_writer" name="writer" placeholder="작성자" readonly>

                </div>

                <div class="form-group">

                    <input type="date" class="form-control" id="start_date" required v-model="survey.start_date" name="start_date" placeholder="설문 시작일">
                </div>
                <div class="form-group">

                    <input type="date" class="form-control" id="end_date" required v-model="survey.end_date" name="end_date" placeholder="설문 종료일">
                </div>

                <div class="form-group">

                    <input type="text" class="form-control" id="subject" required v-model="survey.survey_subject" name="subject" placeholder="글 제목">
                </div>
                <div class="form-group">

                    <input type="text" class="form-control" id="question" required v-model="survey.survey_question" name="question" placeholder="설문 제목 ">
                </div>
                <div class="form-group">

                    <input type="text" class="form-control" id="answer1" required v-model="survey.answer1" name="answer1" placeholder="설문 항목1">
                </div>

                <div class="form-group">

                    <input type="text" class="form-control" id="answer2" required v-model="survey.answer2" name="answer2" placeholder="설문 항목2">
                </div>
                <div class="form-group">

                    <input type="text" class="form-control" id="answer3" required v-model="survey.answer3" name="answer3" placeholder="설문 항목3">
                </div>

                <div class="form-group1">

                    <textarea class="form-control" id="exampleTextarea" rows="10" required v-model="survey.survey_detail" name="content" placeholder="1000자 내로 입력하세요"></textarea>
                </div>
                <br>

                <button v-on:click="saveSurvey" class="btn btn-success">등록</button>
            </div>

            <div v-else>
                <h4>게시물이 등록 되었습니다 !!</h4>
                <button class="btn btn-success" @click="backlist">돌아가기</button>
            </div>
        </div>
    </div>

</template>

<script>
    import http from "../../http-common";
    import PostSubmenu from "../posts/PostSubmenu";
    import SurveySubmenu from "./SurveySubmenu";


    export default {
        name: "addsurvey",
        data() {
            return {
                survey: {
                    survey_id:"",
                    survey_writer:"",
                    survey_subject:"",
                    survey_detail:"",
                    survey_question:"",
                    answer1:"",
                    answer2:"",
                    answer3:"",
                    start_date:"",
                    end_date:""

                },
                submitted: false,
                empID: ""
            };
        },
        components: {
            subMenu: SurveySubmenu
        },

        methods: {
            /* eslint-disable no-console */
            saveSurvey() {
                var data = {
                    survey_id: this.survey.survey_id,
                    survey_writer: this.survey.survey_writer,
                    survey_subject: this.survey.survey_subject,
                    survey_question: this.survey_question,
                    survey_detail: this.survey.survey_detail,
                    start_date: this.survey.start_date,
                    end_date: this.survey.end_date,
                    answer1: this.survey.answer1,
                    answer2: this.survey.answer2,
                    answer3: this.survey.answer3
                };
                http
                    .post("/survey/addsurvey", data)
                    .then(response => {
                        this.survey.survey_id = response.data.survey_id;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            backlist(){
                this.$router.push({
                    path:'/survey'
                })
            },
            getName(login_id) {
                /* 사원번호에 해당하는 사원명 가져오는 메소드 */
                http
                    .post("/login/name/" + login_id)
                    .then(response => {
                        this.survey.survey_writer = response.data; // survey_writer 에 현재 로그인한 사원명이 들어감.
                    })
            } // End - getName()
        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empID = sessionStorage.getItem("login_id"); // 이 컴포넌트에 선언된 empID 변수에 현재 로그인한 사번 넣기
                this.getName(this.empID);   // empID로 사원명 가져오는 메소드 호출
            } else {
                this.$router.push("/");
            }
        }
    };
</script>

<style>
    .submitform{
        max-width: 800px;
        margin: auto;
        border: solid lightgray 1px ;

    }
    .sidelist {
        width: 15%;
        left: 0;
    }
    .ppo{
        text-align: center;
        max-width: 550px;
        width: 100%;
        margin: 0 auto;

    }
    .form-group{
        width: 280px
    }
    .root{
        width: 1200px;

    }
    .btn btn-success{
        display: none;
    }
</style>