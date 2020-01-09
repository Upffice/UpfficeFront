<template>
    <div class="topMenu">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <router-link class="navbar-brand" to="/">upffice</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/bbs">board</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/customer">customer</router-link>
                    </li>
                </ul>
                <form v-if="!loginInfo.login_status" class="form-inline my-2 my-lg-0">
                    <span style="color: white">로그인이 필요합니다</span>
                </form>
                <form v-else class="form-inline my-2 my-lg-0">
                    <span style="color: white">MY PAGE</span>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit" v-on:click="clearInput">로그아웃</button>
                </form>
            </div>
        </nav>
        <br/>
    </div>
</template>

<script>
    import {EventBus} from "../event-bus";

    export default {
        data() {
            return {
                customers: [],
                loginInfo: {
                    login_status: "",
                    login_id: ""
                },
                cnt:0
            };
        },
        methods: {
            clearInput() {
                localStorage.clear();
                // localStorage.removeItem("login_id");
                // localStorage.removeItem("login_status");
            }
        },
        created() {
            this.loginInfo.login_id = localStorage.getItem("login_id");
            this.loginInfo.login_status = localStorage.getItem("login_status");
            console.log(this.loginInfo.login_id + " - topmenu@@@@")
            console.log(this.loginInfo.login_status + " - topmenu status");
            EventBus.$emit("re-render", true);
        }

    };
</script>

<style>
    .topMenu {
        text-align: center;
    }

    .btn-primary {
        margin-right: 5px;
    }
</style>
