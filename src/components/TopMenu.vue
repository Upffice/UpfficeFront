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
                    <li class="nav-item">
                        <router-link class="nav-link" to="/pst">Posts</router-link>
                    </li>
                </ul>


                <!-- 로그인 안 한 상태 => v-if : loginInfo.login_status 사용함으로써 로그인이 필요한 상태인지 구분 -->
                <form v-if="!loginInfo.login_status" class="form-inline my-2 my-lg-0">
                    <span style="color: white">로그인이 필요합니다</span>
                </form>

                <!-- 로그인 한 상태 => v-else : 로그인 된 후 top menu 오른쪽에 이름을 띄우며, 이름 클릭 시 마이페이지로 이동 -->
                <form v-else class="form-inline my-2 my-lg-0">
                    <router-link :to="{ name: 'mypage'}"> <!-- name이 mypage인 컴포넌트를 router에서 자동 매핑해준다-->
                        <span style="color: white">{{login_name}} 님</span> <!-- 이름 : mounted() 일 때, 로그인 성공 상태이면 getName()으로 가져옴 -->
                    </router-link>&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-secondary my-2 my-sm-0" v-on:click="logout">Logout</button> <!-- 로그아웃 버튼 -->
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
                /* 로그아웃 메소드 */
                sessionStorage.clear();         // logout 시 세션 스토리지 비우기 : sessionStorage.length 가 0이 된다.
                this.$router.push("/"); // logout 시 첫 로그인 페이지로 이동
            }, // End - clearInput()
            getName() {
                /* 사원번호에 해당하는 사원명 가져오는 메소드 */
                http
                .post("/login/name/" + this.loginInfo.login_id)
                .then(response => {
                    this.login_name = response.data;
                })
            } // End - getName()
        },
        mounted() {
            /* 로그인 성공 조건 : 로그인 하면 세션 스토리지에 요소들이 저장되므로 length 가 0 이상. */
            if (sessionStorage.length > 0) {
                // TopMenu 컴포넌트 변수에 세션 스토리지에 저장된 값 넣기
                this.loginInfo.login_id = sessionStorage.getItem("login_id");
                this.loginInfo.login_status = sessionStorage.getItem("login_status");

                this.getName(); // 이름 가져오기 위한 메소드
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
