<template>
    <div class="subMenu">
        <ul class="nav nav-pills flex-column">

            <div style="font-weight: bold; margin: 8%; font-size: 20px"><h4>공용주소록</h4></div>
            <router-link to="/mainEmployAddress">
                <li class="small-menu">내부주소록</li>
            </router-link>
            <router-link to="/mainOutAddress">
                <li class="small-menu">외부주소록</li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {};
</script>

<style>
    .subMenu {
        position: absolute;
    }
</style>
