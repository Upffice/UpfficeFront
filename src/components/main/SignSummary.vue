<template>
    <div class="signDiv">
<!--        결재 대기함, 진행함 넣을 공간-->
        <div class="sh-merged-main">
            <signIng></signIng>
            <signWait></signWait>
        </div>
    </div>

</template>

<script>
    import IngMain from "../approval/IngMain";
    import WaitMain from "../approval/WaitMain";

export default {
    data() {
        return {
        };
    },
    methods: {

    },
    components:{
        signIng:IngMain,
        signWait:WaitMain
    },


    mounted() {

    } // End - mounted()

}
</script>

<style scoped>
    .sh-main{
        position: relative !important;
        width: auto;
        margin-top: 10px;
    }
    .signDiv {
        width: 52%;
        height: 90%;
        left: 16%;
        top: 70px;
        position: absolute;
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        float: left;
        position: absolute;
        margin-left: 3px;
        font-size: 13px;

    }

</style>