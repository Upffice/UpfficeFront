<template>
    <div class="subMenu">
        <ul class="nav nav-pills flex-column">
            <li class="nav-item"><h4>5.공용주소록</h4></li>
            <router-link to="/MainEmployAddress">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                   내부주소록(customer)-employees
                </li>
            </router-link>
            <router-link to="/working/annual">
                <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                    외부주소록(serach)-outadress
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
