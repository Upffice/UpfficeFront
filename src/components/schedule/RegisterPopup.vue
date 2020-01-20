<!--
<template>
    <div>
        <div class="input-group col-md-3">
            <input type="text" v-model="scheduleData.name" class="form-control col-md-2">
            <input class="btn btn-default col-md-3" @click="confirmRegister" type="button" value="확인">
            <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scheduleData: {
                    name: "",
                    startDate: "",
                    endDate: "",
                    startTime: "",
                    endTime: "",
                    place: "",
                    detail: "",
                    emp_id: "",
                    dep_id: "",
                    cal_id: "",
                    sche_id: ""
                    /*일정 이름, 일정시작일, 일정마감일, 일정 시작 시간, 일정 마감시간, 일정 장소, 일정 디테일, emp_id, dep_id, calendar_id (sche id*/
                }
            }
        },
        props: ['registerData'],
        methods: {
            confirmRegister() {
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>-->
<template>
    <div class="container">
        <!--<일정 카테고리 추가>
        카테고리 이름, 색(id는 자동부여)
        <일정 추가>
        일정 이름, 일정시작일, 일정마감일, 일정 시작 시간, 일정 마감시간,
        일정 장소, 일정 디테일, emp_id, dep_id, calendar_id (sche id는 자동부여)-->
        <div class="input-group col-md-3">
            <span class = "input-group-addon">
                PW
            </span>
            <input type="text" v-model="del_password" class="form-control col-md-2">
        </div>
        <div class="row col-md-6">
            <input class="btn btn-default col-md-3" @click="del_data" type="button" value="삭제">
            <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소">
        </div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                del_password:'',
            }
        },props : [
            'registerData',
        ],methods : {
            del_data(){

                this.$emit('close')
            }
        }
    };
</script>
