<template>
    <div class="subMenu">
         <ul class="nav nav-pills flex-column">
            <router-link to="/customer">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                기안
              </li></router-link>

              <router-link to="/customer/add"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                기안문작성
              </li></router-link>

              <router-link to="/customer/search"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                임시저장함
              </li></router-link>

         </ul>
    </div>
</template>

<script>

export default {
};
</script>

<style>

</style>
