<template>
    <!--    <div class="container">-->
    <!--        <div class="input-group col-md-12">-->
    <!--            <span class = "input-group-addon">-->
    <!--                검색-->
    <!--            </span>-->
    <!--            <input type="text" v-model="del_password" class="form-control col-md-12">-->
    <!--        </div>-->
    <!--        <div class="row col-md-12">-->
    <!--            <input class="btn btn-default col-md-3" @click="del_data" type="button" value="삭제">-->
    <!--            <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소">-->
    <!--        </div>-->
    <!--    </div>-->

    <div class="container">
        <!--        <div class="modal">-->
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">결재선 지정</h5>
                    <button type="button" class="close" aria-label="Close" style="font-size: 40px; color: black;"
                            @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <!--                    <input type="button" class="close" @click="$emit('close')" value="&times;">-->
                </div>
                <div class="modal-body">
                    <p>검색 <input type="text" v-model="del_password" @keyup.enter="del_data"
                                 class="form-control col-md-12"></p>
                </div>
                <div class="modal-footer">
                    <!--                    <button type="button" class="btn btn-primary" @click="del_data">확인</button>-->
                    <input class="btn btn-primary" @click="del_data" type="button" value="확인">
                    <!--                    <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>-->
                    <input class="btn btn-secondary" @click="$emit('close')" type="button" value="취소">

                </div>
            </div>
        </div>
        <!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "SearchSigner",
        data: function () {
            return {
                del_password: ''
            }
        }, props: [
            'hot_table',


        ], methods: {
            del_data() {

                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>