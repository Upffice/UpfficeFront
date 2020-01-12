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
                    <router-link :to="{ name: 'mypage'}">
                        <span style="color: white">{{login_name}} 님</span>
                    </router-link>&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit" v-on:click="logout">Logout</button>
                </form>
            </div>
        </nav>
        <br/>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        data() {
            return {
                customers: [],
                loginInfo: {
                    login_status: "",
                    login_id: ""
                },
                cnt:0,
                login_name: ""
            };
        },
        methods: {
            logout() {
                sessionStorage.removeItem("login_id");
                sessionStorage.removeItem("login_status");
                sessionStorage.clear();
                this.$router.push("/"); // logout 시 첫 로그인 페이지로 이동
            }, // End - clearInput()
            getName() {
                http
                .post("/login/name/" + this.loginInfo.login_id)
                .then(response => {
                    this.login_name = response.data;
                })
            } // End - getName()
        },
        mounted() {
            if (sessionStorage.length > 0) {
                this.loginInfo.login_id = sessionStorage.getItem("login_id");
                this.loginInfo.login_status = sessionStorage.getItem("login_status");

                this.getName(); // 이름 보여주기 위한 메소드
            }
        }

    };
</script>

<style>
    .topMenu {
        text-align: center;
    }

    .btn-secondary {
        margin-right: 5px;
    }
</style>
