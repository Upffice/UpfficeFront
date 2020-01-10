<template>
    <div v-if="this.employees">

        <h4>&#60;상세정보&#62;</h4>
        <div>
            <label>이름: </label> {{this.employees.name}}
        </div>
        <div>
            <label>email: </label> {{this.employees.emp_email}}
        </div>
        <div>
            <label>직책: </label> {{this.employees.position}}
        </div>
        <div>
            <label>부서: </label> {{this.employees.dep_id}}
        </div>
        <div>
            <label>휴대폰: </label> {{this.employees.phone_number}}
        </div>

        <!-- <span class="button is-small btn-danger" v-on:click="deleteBoard()">지우지말고취소</span>-->
        <span>메시지</span>
        <router-link to="/employees">취소</router-link>
    </div>
    <div v-else>
        <br/>
        <p>Please click on a Board...</p>
    </div>
</template>

<script>
    import http from "../../../http-common";
    export default {
        name: "employees",
        props: ["employees"],
        methods: {
            /* eslint-disable no-console */
            updateActive(status) {
                var data = {
                    id: this.employees.emp_id,
                    name: this.employees.name,
                    email: this.employees.emp_email,
                    position:this.employees.position,
                    department:this.this.employees.dep_id,
                    phone:this.employees.phone_number,
                    active: status
                };

                http
                    .put("/employees/" + this.employees.id, data)
                    .then(response => {
                        this.employees.active = response.data.active;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteBoard() {
                http
                    .delete("/employees/employees/" + this.employees.b_id)
                    .then(response => {
                        console.log(response.data);
                        this.$emit("refreshData");
                        this.$router.push('/');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            /* eslint-enable no-console */
        }
    }
</script>

<style scoped>

</style>