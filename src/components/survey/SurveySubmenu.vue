<template>
    <div class="subMenu">

        <ul class="nav nav-pills flex-column">
                <div style="font-weight: bold; margin: 8%; font-size: 20px">
                    설문 게시판
                </div>
            <router-link to="/survey">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    진행 중인 설문
                </li>
            </router-link>
            <router-link to="/endsurvey">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    마감된 설문
                </li>
            </router-link>
            <router-link to="/addsurvey">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    설문 등록하기
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "PostSubmenu"
    }
</script>

<style scoped>

</style>