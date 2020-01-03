<template>
    <div class="mainForm">
        <div v-if="!logIned">
            <div class="form-group">
                <label for="id">id</label>
                <input type="text">
            </div>

            <div class="form-group">
                <label for="pw">pw</label>
                <input type="password">
            </div>
            <button v-on:click="logInUpffice" class="btn btn-success">LogIn</button>
        </div>

        <div v-else>
            <h4>You logIned successfully!</h4>
            로그인 되었을 때 메인
            지영++
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "add-customer",
        data() {
            return {
                user: {
                    id: "",
                    pw: ""
                },
                logIned: false
            };
        },
        methods: {
            /* eslint-disable no-console */
            logInUpffice() {
                var data = {
                    id: this.user.id,
                    pw: this.user.pw
                };

                http
                    .post("/user", data)
                    .then(response => {
                        this.user.id = response.data.id;
                        this.user.pw = response.data.pw;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.logIned = true;
            }
            /* eslint-enable no-console */
        }
    };
</script>

<style>
    .mainForm {
        max-width: 300px;
        margin: auto;
    }
</style>
