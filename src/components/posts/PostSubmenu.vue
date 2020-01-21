<template>
    <div class="subMenu">

        <ul class="nav nav-pills flex-column">

            <router-link to="/pst">

                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">

                    전사 게시판

                </li>
            </router-link>

            <router-link to="/dep_pst">

            <li class="list-group-item d-flex justify-content-between align-items-center libgclr">

                부서 게시판

            </li>
        </router-link>


            <router-link to="/pst">

                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">

                    설문조사

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