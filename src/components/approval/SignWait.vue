<template>



    <div class="container">

        <div class="list row">
            <subMenu></subMenu>
        </div>

    <table class="table table-hover">
        <thead>
        <tr class="table-primary">
            <th scope="col">No</th>
            <th scope="col">부서</th>
            <th scope="col">문서번호</th>
            <th scope="col">유형</th>
            <th scope="col">문서제목</th>
            <th scope="col">기안자</th>
            <th scope="col">기안일</th>

        </tr>
        </thead>
        <tbody>

        <tr class="table-light">
            <th scope="row">Light</th>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
        </tr>

        </tbody>
    </table>
    </div>


</template>

<script>
    import http from "../../http-common";
    import ApprovalSubMenu from "./ApprovalSubMenu";

    export default {
        name: "SignWait",

        components: {
            subMenu: ApprovalSubMenu
        }
    }
</script>

<style>

    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
    .table{

        margin: auto;
        width: 1000px;

    }

    .container{

        /*background : gainsboro;*/
        /*margin:        auto;*/
        /*width: 1100px;*/


    }
</style>