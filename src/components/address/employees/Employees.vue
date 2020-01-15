<template>
    <div class="list row">
    <div v-if="this.employee">
<br><br><br><br><br><br><br><br><br>
        <h4>&#60;상세정보&#62;</h4>
        <div>
            <label>이름: </label> {{this.employee.name}}
        </div>
        <div>
            <label>부서: </label> {{this.employee.dep_id}}
        </div>
        <div>
            <label>직책: </label> {{this.employee.position}}
        </div>
        <div>
            <label>휴대폰: </label> {{this.employee.phone_number}}
        </div>
        <div>
            <label>email: </label> {{this.employee.emp_email}}
        </div>
        <div>
            <label>내선번호: </label> {{this.employee.extension_number}}
        </div>

        <span>메시지</span>
        <router-link to="/mainEmployAddress">취소</router-link>
    </div>
    <div v-else>
        <br/>
        <p>Please click on a Board...</p>
    </div>
    </div>

</template>

<script>
    import http from "../../../http-common";

    export default {
        name: "employees-details",
        props: ["employee"],
        methods: {
            updateActive() {
                var data = {
                    id: this.employees.emp_id,
                    name: this.employees.name,
                    email: this.employees.emp_email,
                    position:this.employees.position,
                    department:this.employees.dep_id,
                    phone:this.employees.phone_number
                };

                http
                    .put("/employees/" + this.employee.id, data)
                    .then(response => {
                        this.employee.active = response.data.active;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

        }
    }
</script>

<style>
    .list {

        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>