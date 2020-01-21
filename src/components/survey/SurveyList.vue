<template>
    <div>
        <div class="sidelist">
          <subMenu></subMenu>
        </div>
        <div class="col-md-20">
            <h4>Survey List</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td width="10%">번호</td>
                    <td width="15%">작성자</td>
                    <td>제목</td>
                    <td width="20%" >시작일</td>
                    <td width="20%">종료일</td>
                </tr>
                </thead>
                <tbody>
                <tr id="text-over" v-for="(survey, index) in surveylist" :key="index">
                    <td>{{survey.survey_id}}</td>
                    <td>{{survey.survey_writer}}</td>
                    <td class="maljul"><router-link :to="{
                            name: 'survey-details',
                            params: { survey: survey, survey_id: survey.survey_id }
                        }">

                        {{survey.survey_subject}}
                    </router-link></td>
                    <td>{{time(survey.start_date)}}</td>
                    <td>{{time(survey.end_date) }}</td>

                </tr>

                </tbody>

            </table>

            <button class="btn btn-primary" type="button" @click="write">글쓰기</button>
        </div>

    </div>
</template>

<script>
    import http from "../../http-common";
    import SurveySubmenu from "./SurveySubmenu";
    export default {
        name: "SurveyList",
        data(){
            return{
                surveylist:[],
                keyword: ""
            };
        },
        components: {
            subMenu: SurveySubmenu
        },

        methods:{
            requestSurvey(){
                http
                .get("/survey/allsurvey")
                .then(response =>{
                    this.surveylist =response.data;
                    console.log(response.data);
                })
                .catch(e =>{
                    console.log(e);
                })
            },

            write(){
                this.$router.push({
                    path:'/survey/addsurvey'
                })
            },
            time(date){
                var moment=require("moment");

                return moment(date).format("YYYY년 MM월 DD일");
            }
        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.requestSurvey();
            } else {
                this.$router.push("/");
            }
        }

    };
</script>

<style scoped>

</style>