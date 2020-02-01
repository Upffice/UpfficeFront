
<template>

    <div class="list row">

        <div>
            <subMenu></subMenu>
        </div>
        <div class="col-md-20">
            <h4>부서 게시판</h4>
            <div v-if="this.board">
                {{this.board_name}}
            </div>
            <div v-else>
                안나온다
            </div>

            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td width="10%">번호</td>
                    <td width="15%">작성자</td>
                    <td>제목</td>
                    <td width="20%">작성일</td>
                    <td width="10%">조회수</td>
                    <td width="10%"></td>
                </tr>
                </thead>
                <tbody>
                <tr id="text-over" v-for="(post, index) in dep_board" :key="index">
                    <td>{{post.post_id}}</td>
                    <td>{{post.post_writer}}</td>
                    <td class="maljul"><router-link :to="{
                            name: 'dep_post-details',
                            params: { post: post, post_id: post.post_id }
                        }">

                        <span >{{post.post_subject}}</span>
                    </router-link></td>
                    <td>{{post.created}}</td>
                    <td>{{post.post_views }}</td>
                    <td>{{post.board_name}}</td>

                </tr>

                </tbody>

            </table>


        </div>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>

    </div>
</template>
<script>
    import http from "../../http-common";
    import PostSubmenu from "./PostSubmenu";

    export default {
        name: "DepPage",
        props: ["board"],
        data(){
            return{
                dep_board :[],
                board: [],
                board_name : ""
            };

        },
        components: {
            subMenu: PostSubmenu
        },
        methods: {
            BoardAll(){
                http
                    .get("/pst/dep_posts/"+"공지")
                    .then(response =>{
                        this.dep_board=response.data;
                        console.log(response.data+"= DepPage");
                        console.log(this.dep_board + "받은 dep_board");
                    })

            },
            getEmpInfo(id) {    // 매개변수 id는 this.employee.emp_id 이다. : mounted()때 호출되는 메소드.
                http
                    .post("/mypage/" + id)
                    .then(response => {
                        // 응답 데이터를 employee 데이터에 대입하기.
                        this.dep_id = response.data.dep_id;
                        this.BoardAll();
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
                this.BoardAll();
            } else {
                this.$router.push("/");
            }
        },



    };
</script>

<style scoped>

</style>