<template>
    <div class="subMenu">

        <ul class="nav nav-pills flex-column">
                <div style="font-weight: bold; margin: 8%; font-size: 20px; text-align: center;">
                    설문
                </div>
            <button class="btn btn-primary btn-lg" @click="addSurvey" style="width: 80%; margin: auto auto 20px;">설문 등록</button>
            <router-link to="/survey">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr" style="font-weight: bold;">
                    진행 중인 설문
                </li>
            </router-link>
            <router-link to="/endsurvey">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr" style="font-weight: bold;">
                    마감된 설문
                </li>
            </router-link>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "PostSubmenu",

        methods:{
            addSurvey(){
                this.$router.push("addsurvey");
            }
        }
    }
</script>

<style scoped>

</style>