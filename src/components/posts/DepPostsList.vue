<template>
    <div class="list row">

        <div>
            <subMenu></subMenu>
        </div>
        <div class="col-md-20">
            <h4>부서 게시판</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td width="10%">번호</td>
                    <td width="15%">작성자</td>
                    <td>제목</td>
                    <td width="20%">작성일</td>
                    <td width="10%">조회수</td>
                </tr>
                </thead>
                <tbody>
                <tr id="text-over" v-for="(post, index) in posts" :key="index">
                    <td>{{post.post_id}}</td>
                    <td>{{post.post_writer}}</td>
                    <td class="maljul"><router-link :to="{
                            name: 'dep_post-details',
                            params: { post: post, post_id: post.post_id }
                        }">

                        <span v-on:click="updateView(post.post_id)">{{post.post_subject}}</span>
                    </router-link></td>
                    <td>{{post.created}}</td>
                    <td>{{post.post_views }}</td>

                </tr>

                </tbody>

            </table>


        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button class="btn btn-primary" type="button" @click="write">글쓰기</button>

    </div>

</template>

<script>
    import http from "../../http-common";
    import PostSubmenu from "./PostSubmenu";


    export default {
        name: "post-list",
        data() {
            return {
                posts: [],
                empID: "",
                dep_id: ""
            };

        },
        components: {
            subMenu: PostSubmenu
        },
        methods: {
            /* eslint-disable no-console */
            retrieveBoards() {
                http
                    .get("/pst/posts/"+this.dep_id)
                    .then(response => {
                        this.posts = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(this.dep_id);
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveBoards(this.dep_id);
            },
            /* eslint-enable no-console */
            write(){
                this.$router.push({
                    path:'/dep_pst/add'
                })
            },

            updateView(p_id){

                http
                    .put("/pst/view/"+p_id)
                    .then(response =>{
                        // eslint-disable-next-line no-console
                        console.log(response.data);
                        this.$emit("refreshData");
                        this.$router.push('/dep_pst/PostsList/'+p_id);
                    })
                    .catch(e =>{
                        // eslint-disable-next-line no-console
                        console.log(e);
                    });
            },
            getEmpInfo(id) {    // 매개변수 id는 this.employee.emp_id 이다. : mounted()때 호출되는 메소드.
                http
                    .post("/mypage/" + id)
                    .then(response => {
                        // 응답 데이터를 employee 데이터에 대입하기.
                        this.dep_id = response.data.dep_id;
                        this.retrieveBoards();
                        //console.log(this.dep_id);
                    })
                    .catch(e => {
                        /* eslint-disable no-console */
                        console.log(e);
                    });
            }

        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.empID = sessionStorage.getItem("login_id"); // 이 컴포넌트에 선언된 empID 변수에 현재 로그인한 사번 넣기
                this.getEmpInfo(this.empID);

            } else {
                this.$router.push("/");
            }
        },



    };

</script>

<style>
    .list {

        text-align: left;
        max-width: 800px;
        margin: auto;
    }
    .sidelist{
        position: fixed;
        left: 0;
    }
    .maljul{
        text-overflow: ellipsis; overflow: hidden;
        width: 500px;
        white-space: nowrap;

    }
    table{
        table-layout: fixed;

    }
</style>