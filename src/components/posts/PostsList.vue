<template>
    <div class="list row">

        <div>
            <subMenu></subMenu>
        </div>
        <div class="col-md-20">
            <h4>전사 게시판</h4>
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
                <tr id="text-over" v-for="(post, index) in currentPosts" :key="index" >
                    <td>{{post.post_id}}</td>
                    <td>{{post.post_writer}}</td>
                    <td class="maljul"><router-link :to="{
                            name: 'post-details',
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
        <button v-if="empID==10002"class="btn btn-primary" type="button" @click="write">글쓰기</button>

        <div>
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" @click="gotoStart()">&laquo;</button>
                </li>
                <li class="page-item">
                    <button class="page-link" @click="prev()"><</button>
                </li>
                <li v-for="(pageNum, index) in currentPages" :key="index" class="page-item active">
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

</template>

<script>
    import http from "../../http-common";
    import PostSubmenu from "./PostSubmenu";


    export default {
        name: "post-list",
        data() {
            return {
                posts: [],
                currentPosts: [],
                empID: "",
                count: 0,
                countList:10, // 한 페이지에 나올 게시글 개수
                totalPage:1, // 페이지 번호 묶음 (5 개씩 묶음)
                page:1,
                countPage:5,
                startPage:1,
                endPage:0,
                totalPages: [],
                currentPages: [], // 현재 페이지 번호들 배열 5개 짜리


            };

        },
        components: {
            subMenu: PostSubmenu
        },
        methods: {
            /* eslint-disable no-console */
            setPagination() {
                this.count = this.posts.length;
                this.totalPage = this.count / this.countList; // 총 페이지 개수

                if(this.count % this.countList > 0){
                    this.totalPage++; // 나머지가 있으면 totalPage 하나 더 추가
                }
                if(this.totalPage < this.page){
                    this.page=this.totalPage;
                }

                for(let i=0; i<this.totalPage; i++) {
                    this.totalPages[i] = i+1;
                }

                this.startPage = ((this.page -1)/this.countPage) * this.countPage +1; // 시작 페이지

                if(this.totalPage < 5) {
                    this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                } else {
                    this.endPage = this.startPage + this.countPage -1; // 마지막 페이지
                }

                this.currentPages = [];
                let j = this.startPage-1;
                for(let i=0; i<=(this.endPage-this.startPage) && j < this.totalPage; i++) {
                    this.currentPages[i] = this.totalPages[j];
                    j++;
                    console.log("curr "+ i + "번째 " + this.currentPages[i]);
                }

            },
            retrieveBoards() {
                http
                    .get("/pst/posts/"+0)
                    .then(response => {
                        this.posts = response.data; // JSON are parsed automatically.
                        this.setPagination();
                        this.setCurrentPosts();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            setCurrentPosts() {
                this.currentPosts = [];
                let j = (this.page-1) * this.countList;
                for(let i=0; i<this.countList && j < this.posts.length; i++) {
                    this.currentPosts[i] = this.posts[j];
                    j++;
                }

            },
            refreshList() {
                this.retrieveBoards();
            },
            /* eslint-enable no-console */
            write(){
                this.$router.push({
                    path:'/pst/add'
                })
            },

            updateView(p_id){

                http
                    .put("/pst/view/"+p_id)
                    .then(response =>{
                        // eslint-disable-next-line no-console
                        console.log(response.data);
                        this.$emit("refreshData");
                        this.$router.push('/pst/PostsList/'+p_id);
                    })
                    .catch(e =>{
                        // eslint-disable-next-line no-console
                        console.log(e);
                    });
            },
            changePage(pageNum) {
                this.page = pageNum;
                this.setCurrentPosts();
            },
            prev() {
                if(this.startPage != 1) {
                    this.startPage = this.startPage -5;
                    this.page = this.startPage;
                    if(this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage -1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage-1;
                    for(let i=0; i<=(this.endPage-this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        console.log("curr "+ i + "번째 " + this.currentPages[i]);
                    }
                    this.setCurrentPosts();
                }
            },
            next() {
                if(this.endPage < this.totalPage) {
                    this.startPage = this.endPage +1;
                    this.page = this.startPage;
                    if(this.totalPage < 5) {
                        this.endPage = this.totalPage;  // endPage 가 totalPage 와 같다
                    } else {
                        this.endPage = this.startPage + this.countPage -1; // 마지막 페이지
                    }

                    this.currentPages = [];
                    let j = this.startPage-1;
                    for(let i=0; i<=(this.endPage-this.startPage) && j < this.totalPage; i++) {
                        this.currentPages[i] = this.totalPages[j];
                        j++;
                        console.log("curr "+ i + "번째 " + this.currentPages[i]);
                    }
                    this.setCurrentPosts();
                }
            },
            gotoStart() {
                location.reload();
            },
            gotoEnd() {

            }
        },
        mounted() {
            // mounted 될 때 로그인이 되어있는 상태라면
            if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
                this.retrieveBoards();
                this.empID = sessionStorage.getItem("login_id"); // 이 컴포넌트에 선언된 empID 변수에 현재 로그인한 사번 넣기
                // this.paging();
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