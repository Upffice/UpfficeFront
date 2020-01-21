<template>
    <div class="root"><h4>게시판 등록</h4>
    <div>
        <div>
            <subMenu></subMenu>
        </div>

        <div v-if="!submitted"  class="ppo">
<!--        사용자 정보 입력란-->
        <div class="form-group" >
          <input type="text" class="form-control" id="writer" required v-model="post.post_writer" name="writer" placeholder="작성자">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="subject" required v-model="post.post_subject" name="subject" placeholder="글 제목">
        </div>

            <div class="form-group1">

                <textarea class="form-control" id="exampleTextarea" rows="10" required v-model="post.post_content" name="content" placeholder="1000자 내로 입력하세요"></textarea>
            </div>
            <br>
            <div class="form-group2">
                <label for="exampleInputFile">사진 업로드</label>
                <input class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" type="file">
                <small class="form-text text-muted" id="fileHelp">안녕하세요 저는 정준희에요 멋쟁이 정준희입니다 ㅎㅎ 짱짱맨 정준희</small>
            </div>

        <button v-on:click="savePost" class="btn btn-success">등록</button>
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
    import PostSubmenu from "./PostSubmenu";
    export default {
        name: "add-post",
        data() {
            return {
                post: {
                    post_id: "",
                    board_name: "",
                    post_writer: "",
                    post_subject: "",
                    post_content: "",
                    post_created: "",
                    post_view: ""
                },
                submitted: false,
                empID: ""
            };
        },
        components: {
            subMenu: PostSubmenu
        },
        methods: {
            /* eslint-disable no-console */
            //입력한 데이터 저장하는 메서드
            savePost() {
                var data = {
                    post_id: this.post.post_id,
                    board_name: this.post.board_name,
                    post_dep_id: 0,
                    post_writer: this.post.post_writer,
                    post_subject: this.post.post_subject,
                    post_content: this.post.post_content,
                    post_created: this.post.post_created,
                    post_view: this.post.post_view
                };
                //입력한 데이터들을 컨트롤러에 보내주는 메서드
                http
                    .post("/pst/post", data)
                    .then(response => {
                        this.post.post_id = response.data.post_id;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            backlist(){
                this.$router.push({
                    path:'/pst'
                })
            },
            getName(login_id) {
                /* 사원번호에 해당하는 사원명 가져오는 메소드 */
                http
                    .post("/login/name/" + login_id)
                    .then(response => {
                        this.post.post_writer = response.data; // survey_writer 에 현재 로그인한 사원명이 들어감.
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

<style scoped>

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