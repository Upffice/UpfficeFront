<template>
    <div class="list row">

        <div class="sidelist">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst">게시판</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst/add">게시물작성</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/pst/search">게시물찾기</router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-20">
            <h4>Post List</h4>
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


            <button class="btn btn-primary" type="button" @click="write">글쓰기</button>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>


    </div>


</template>

<script>
    import http from "../../http-common";


    export default {
        name: "post-list",
        data() {
            return {
                posts: []

            };

        },

        methods: {
            /* eslint-disable no-console */
            retrieveBoards() {
                http
                    .get("/pst/posts")
                    .then(response => {
                        this.posts = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
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
                // eslint-disable-next-line no-console
                // console.log("눌림");
            },
            // modify(index){
            //     this.$router.push({
            //         name : 'ModifyPosts',
            //         params : {
            //             post_id : index
            //         }
            //     })
            // }
        },
        mounted() {
            this.retrieveBoards();
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