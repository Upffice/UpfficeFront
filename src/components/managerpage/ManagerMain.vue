<template>
    <div class="managerMainForm">
        <div v-if="!loginInfo.loginStatus">
            <div>
                <label for="manager_id">아이디</label>
                <input type="text" id="manager_id" v-on:keyup.enter="login"
                       required v-model="input.manager_id" placeholder="관리자 아이디입력">
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" id="manager_pw" v-on:keyup.enter="login"
                       required v-model="input.manager_pw" placeholder="비빌번호 입력">
            </div>
            <button v-on:click="login">로그인</button>
        </div>

        <div v-else>

            {{this.$router.push("/manager/employees")}}

        </div>
    </div>
</template>

<script>


    export default {
        name: "manager-login",
        data() {
            return {
                input: {
                    manager_id: "",
                    manager_pw: ""
                },
                loginInfo: {
                    loginStatus: "", //로그인 상태 담을 변수
                    loginStatus: "" //로그인 상태 담을 변수

                }
            }
        },
        methods: {
            login() {
                if (this.input.manager_id != "" && this.input.manager_pw != "") {
                    if (this.input.manager_id === "manager" && this.input.manager_pw === "00000") {
                        this.loginInfo.loginId = this.input.manager_id;
                        this.loginInfo.loginStatus = true;        // loginStatus 에 현재 로그인 상태 true로 바꾸기
                        sessionStorage.setItem("login_id", this.loginInfo.loginId);           // sessionStorage 에 로그인 아이디(사번) 저장하기
                        sessionStorage.setItem("login_status", this.loginInfo.loginStatus);   // sessionStorage 에 로그인 상태 저장하기
                    }
                    for (let i = 0; i < 1; i++) {
                        location.reload();// 로그인 시 한 번만 새로고침
                    }

                    console.log(this.loginInfo.loginStatus);

                } else {
                    alert("빈 칸을 확인해주세요!");
                }
            }
        }, //methods
        mounted() {
            if (sessionStorage.length > 0) {
                // 로그인 상태를 <div> 태그에서 판별하기 위해 this.loginInfo.loginStatus 로 대입한다.
                this.loginInfo.loginStatus = sessionStorage.getItem("login_status");
            }
        }

    };
</script>

<style>
    .managerMainForm {
        max-width: 300px;
        margin: 100px auto auto;
    }

    .inputLbl {
        margin-right: 220px;
        font-weight: bold;
    }

    .loginBtn {
        width: 300px;
    }
</style>
