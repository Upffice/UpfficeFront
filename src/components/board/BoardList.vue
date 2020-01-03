<template>
    <div class="list row">
        <subMenu></subMenu>
        <div class="col-md-6">
            <h4>Board List</h4>
            <table class="table table-hover">
                <thead>
                <tr class="table-primary">
                    <td>작성자</td>
                    <td>글 제목</td>
                </tr>
                </thead>
                <tr v-for="(board, index) in boards" :key="index">
                    <td>{{board.user_name}}</td>
                    <td>
                        <router-link :to="{
                            name: 'board-details',
                            params: { board: board, b_id: board.b_id }
                        }">
                            {{board.subject}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import BoardSubMenu from "./BoardSubMenu";

    export default {
        name: "boards-list",
        data() {
            return {
                boards: []
            };
        },
        components: {
            subMenu: BoardSubMenu
        },
        methods: {
            /* eslint-disable no-console */
            retrieveBoards() {
                http
                    .get("/bbs/boards")
                    .then(response => {
                        this.boards = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveBoards();
            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.retrieveBoards();
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>
