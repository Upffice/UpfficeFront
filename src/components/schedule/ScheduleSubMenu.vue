<template>
    <div class="subMenu">
        <button class="btn  btn-lg btn-link">일정 등록 +</button>
        <div class="category">카테고리별 일정</div>
        카테고리 추가
    </div>
</template>

<script>
    import RegisterPopup from "./RegisterPopup";

export default {
    methods : {
        addSchedule() {
            this.$modal.show(RegisterPopup,{
                hot_table : 'data',
                modal: this.$modal},
                {
                    name: 'dynamic-modal',
                    width: '330px',
                    height: '130px',
                    draggable: true
            })
        }
    }
};
</script>

<style scoped>
    button{
        width:100%;
    }
    .category{
        width: 100%;
        border-bottom: aquamarine;
    }
</style>
