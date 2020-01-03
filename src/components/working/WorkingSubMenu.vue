<template>
    <div class="subMenu">
        <ul class="nav nav-pills flex-column">
            <router-link to="/working">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    내 근태 현황
                </li>
            </router-link>
            <router-link to="/working/annual">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    내 연차 내역
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {};
</script>

<style>

</style>
