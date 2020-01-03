<template>
    <div class="subMenu">
         <ul class="nav nav-pills flex-column">
            <router-link to="/customer">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
       Customer
              </li></router-link>
              <router-link to="/customer/add"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
       Add
              </li></router-link>
              <router-link to="/customer/search"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                Search
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
