<template>
    <div class="root"><h4>게시판 등록</h4>
    <div class="submitform">
        <div class="sidelist">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst">게시판</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst/add">게시물 작성</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst/add">게시물 조회</router-link>
                </li>
            </ul>
        </div>

        <div v-if="!submitted"  class="ppo">

        <div class="form-group" >
<!--   <label for="writer">작성자</label>-->
          <input type="text" class="form-control" id="writer" required v-model="post.post_writer" name="writer" placeholder="작성자">

        </div>
            <div class="form-group">
                <!--            <label for="created">날짜</label>-->
                <input type="text" class="form-control" id="created" required v-model="post.post_created" name="created" placeholder="날짜는 자동으로 기입됩니다.">
            </div>
        <div class="form-group">
<!--            <label for="subject">글 제목</label>-->
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
        <button class="btn btn-success" v-on:click="savePost">Add</button>
    </div>
    </div>
    </div>

</template>

<script>
    import http from "../../http-common";

    export default {
        name: "add-post",
        data() {
            return {
                post: {
                    post_id: "",
                    board_name: "",
                    header: "",
                    post_writer: "",
                    post_subject: "",
                    post_content: "",
                    post_created: "",
                    post_view: ""
                },
                submitted: false
            };
        },
        methods: {
            /* eslint-disable no-console */
            savePost() {
                var data = {
                    post_id: this.post.post_id,
                    board_name: this.post.board_name,
                    header: this.post.header,
                    post_writer: this.post.post_writer,
                    post_subject: this.post.post_subject,
                    post_content: this.post.post_content,
                    post_created: this.post.post_created,
                    post_view: this.post.post_view
                };
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
            }

        }
    };
</script>

<style scoped>
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