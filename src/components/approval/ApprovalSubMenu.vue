<template>
    <div class="subMenu">
         <ul class="nav nav-pills flex-column">
             <router-link to="/app">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 전자결재 메인
             </li></router-link>

            <router-link to="/doc">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                기안
              </li></router-link>
              <router-link to="/doc/write"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기안문작성
              </li></router-link>
              <router-link to="/doc/temp"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;임시저장함
              </li></router-link>

             <router-link to="/sign">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 결재
             </li></router-link>
             <router-link to="app/sign/wait"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;결재 대기함
             </li></router-link>
             <router-link to="/sign/ing"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;결재 진행함
             </li></router-link>
             <router-link to="/sign/complete"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;완료 문서함
             </li></router-link>
             <router-link to="/sign/reject"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;반려 문서함
             </li></router-link>

             <router-link to="/ref">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 참조/열람
             </li></router-link>
             <router-link to="/ref"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;참조/열람문서함
             </li></router-link>

             <router-link to="/rcv">  <li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 수신
             </li></router-link>
             <router-link to="/rcv"><li class="list-group-item d-flex justify-content-between align-items-center libgclr">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부서 수신함
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
