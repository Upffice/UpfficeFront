<template>

    <div v-if="this.survey">
        <div>

            <subMenu></subMenu>

        </div>

        <h4>설문조사</h4>
        <!--여기부터-->
        <div v-if="flex">
            <div>
                <label>작성자: </label> {{this.survey.survey_writer}}
            </div>
            <div>
                <label>제목: </label> {{this.survey.survey_subject}}
            </div>
            <div>
                <label for="one">질문: {{this.survey.answer1}}</label>
                <input type="radio" id="one" name="a" :value="1" v-model="survey.answer">

                <label for="two">질문: {{this.survey.answer2}}</label>
                <input type="radio" id="two" name="a" :value="2" v-model="survey.answer">

                <label for="three">질문: {{this.survey.answer3}}</label>
                <input type="radio" id="three" name="a" :value="3" v-model="survey.answer">
            </div>
            aaa {{this.survey.answer}} bbb

            <div class="card border-dark mb-5" style="max-width: 40rem;">
                <div class="card-body">
                    <h4 class="card-title"></h4>
                    <p class="card-text">{{this.survey.survey_detail}}</p>
                </div>
            </div>

            <button class="btn btn-success" type="button" @click="savevote">고고</button>
            <button class="btn btn-success" type="button" @click="modify">게시물 수정</button>
        </div>
        <!--여기까지 div로 묶고 검사-->
        <div v-else>
            <label>제목</label>
            <input type="text" class="form-control" id="subject"
                   required v-model="survey.survey_subject" name="subject">
            <label>내용</label>
            <textarea class="form-control textArea" rows="15" required v-model="survey.survey_detail">{{survey.survey_detail}},


            </textarea><br>

            <button class="btn btn-success" type="button" @click="updatePost">수정하기</button>
        </div>
    </div>

    <div v-else>
        <br/>
        <p>Please click on a Board...</p>
    </div>

</template>

<script>
    import http from "../../http-common";
    import SurveySubmenu from "./SurveySubmenu";
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: "survey",

        data() {

            return {
                flex: true,// 나중에 조건 검사하면 글 작성자==나 일때 false로 바꾸기
                empID: ""
                // answer: "",
                // answer1: "",
                // answer2: "",
                // answer3: ""
            }
        },
        components: {
            subMenu: SurveySubmenu
        },

        props: ["survey"],
        methods: {
            savevote(){
                var vote ={
                    selection:this.survey.answer,
                    emp_id: this.empID,
                    survey_id: this.survey.survey_id
                };
                http
                .put("/survey/vote",vote)
                .then(response => {
                    // this.survey.answer =response.data.answer;
                    console.log("들어가는 값?"+response.data.selection);
                    // console.log(this.survey.answer)
                })
            },
            testbutton() {
                // if(this.survey.answer=="바다"){
                //     this.survey.answer=1;
                // }
                console.log(this.survey.answer)
            },

            deletePost() {
                http
                    .delete("/pst/delete/" + this.post.post_id)
                    .then(response => {
                        console.log(response.data);
                        // this.$emit("refreshData");
                        this.$router.push('/pst');
                    })
                alert("삭제되었습니다.")
                    .catch(e => {
                        console.log(e);
                    });
            },
            modify() {
                this.flex = false
            },
            updatePost() {
                let postData = {
                    post_subject: this.post.post_subject,
                    post_content: this.post.post_content,

                }
                http
                    .put("/pst/update/" + this.post.post_id, postData)
                    .then(response => {
                        console.log("수정완료");
                        alert("수정되었습니다")
                        this.$router.push("/pst/posts")
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empID = sessionStorage.getItem("login_id");

            } else {
                this.$router.push("/");
            }
        }
    };
</script>
<style>
    /*.sidelist {*/
    /*    position: fixed;*/
    /*    left: 0;*/
    /*}*/
    .card {
        position: center;
        text-align: left;
        left: 400px;
        height: 400px;
    }

    .form-control {
        width: 60%;
        margin: auto;
    }

</style>