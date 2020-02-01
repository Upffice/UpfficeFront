<template>
    <div class="subMenu">
        <button class="btn btn-lg btn-link" @click="addSchedule()">일정 등록 +</button>

        <div class="form-group addCategory">
            <label class="col-form-label col-form-label" for="inputSmall">캘린더 추가</label>
            <input class="form-control form-control-sm addInput" type="text" placeholder="추가할 캘린더 입력" id="inputSmall" v-model="calendarInput.cal_name">
            <input type="color" v-model="calendarInput.cal_color">
            <button class="btn btn-lg btn-link addBtn" @click="addCategory()">+</button>
        </div>

        <div v-if="modi_flag" class="form-check">
            캘린더 목록
             <label class="form-check-label category" v-for="(calendar, index) in calendarList" :key="index">
                 <input class="form-check-input" type="checkbox" :value="calendar.calendar_id" v-model="checkedCalendars" checked="calendar_chk">
                 {{calendar.calendar_name}}
             </label><br>
            <span style="font-size: 12px">checkedCalendars: {{checkedCalendars}}</span><br>
            <button class="btn btn-info btn-sm pushCalBtn" @click="modi_flag=false">수정</button>
            <button class="btn btn-info btn-sm pushCalBtn" @click="deleteCalendarList()">삭제</button>
        </div>

        <div v-else class="form-check">
            캘린더 목록
             <label class="form-check-label " v-for="(calendar, index) in calendarList" :key="index">
                 <input v-if="checkedCalendars.includes(calendar.calendar_id)" class="form-control form-control-sm modi_cal_intput" type="text"
                        required v-model="modi_cal_input[index]" :placeholder="calendar.calendar_name">
                 <input v-else class="form-control form-control-sm modi_cal_intput" type="text" :value="calendar.calendar_name" readonly>
             </label><br><br>
            <button class="btn btn-info btn-sm pushCalBtn" @click="modifyCalendarList()">확인</button>
            <button class="btn btn-info btn-sm pushCalBtn" @click="modi_flag=true">취소</button>
        </div>

    </div>
</template>

<script>
    import RegisterPopup from "./RegisterPopup";
    import http from "../../http-common";

export default {
    data() {
        return {
            emp_id: "",         // 사번
            calendarInput : {   // 추가할 캘린더 Input
              cal_name: "",
              cal_color: "#ffffff"
            },
            calendarList: [],         // 모든 캘린더 목록
            checkedCalendars : [],    // 체크된 캘린더 목록
            modi_flag : true,         // 캘린더 목록 수정 여부 검사할 flag
            modi_cal_input : []
        }
    },
    methods : {
        addSchedule() { // 일정 등록 modal 띄우는 메소드
            this.$modal.show(RegisterPopup, {
                registerData : 'data',
                modal : this.$modal,
            },
            {
                 name: 'dynamic-modal',
                 width:'400px',
                 height: '600px',
                 draggable: true,
            });
        },
        addCategory() {
            let sche_data = {
                calendar_name : this.calendarInput.cal_name,
                calendar_color: this.calendarInput.cal_color
            }
            if(this.calendarInput.cal_name === "" || this.calendarInput.cal_color === "") {
                return;
            } else {
                http
                    .post("/calendar/add/" + this.emp_id, sche_data)
                    .then(response=> {
                        console.log(response.data);
                        this.getCalendarList();
                    })
                    .catch(e => {
                        /* eslint-disable no-console */
                        console.log(e);
                    });
            }

        },
        getCalendarList() {
            http
                .post("/calendar/list/" + this.emp_id)
                .then(response=> {
                    /* eslint-disable no-console */
                    console.log("getCalendarList"+response.data);
                    this.calendarList = response.data;
                })
                .catch(e => {
                    /* eslint-disable no-console */
                    console.log(e);
                });
        },
        modifyCalendarList() {
            let data =[];
            let j=0;

            for(let i=0; i<this.modi_cal_input.length; i++) {
                if(this.modi_cal_input[i] !== undefined) {
                    data[j] = this.checkedCalendars[j] + "," + this.modi_cal_input[i];
                    j++;
                }
            }

            http
                .put("/calendar/update/" + this.emp_id, data) // UpfficeBack의 MyPageController로 매핑 된다.
                .then(response => {
                    console.log("수정 성공 " + response.data);
                    this.getCalendarList();
                    this.modi_flag = true;
                    this.checkedCalendars = []; // 체크 박스 해제
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteCalendarList() {
            if(this.checkedCalendars.length !=0) {
                http
                    .delete("/calendar/list/" + this.emp_id +"?calendar_id=" + this.checkedCalendars)
                    .then(response=> {
                        /* eslint-disable no-console */
                        console.log("캘린더 " + response.data + " 개 delete 됨");
                        this.getCalendarList();
                        this.checkedCalendars = []; // 체크 박스 해제
                    })
                    .catch(e => {
                        /* eslint-disable no-console */
                        console.log(e);
                        console.log(this.emp_id +"/err " + this.checkedCalendars)
                    });
            }
        }
    },
    mounted() {
        // mounted 될 때 로그인이 되어있는 상태라면
        if (sessionStorage.length > 0) { // 현재 sessionStorage에 요소가 존재하는 상태일 때(로그인이 되어서 sessionStorage에 저장된 상태일 때)
            this.emp_id = sessionStorage.getItem("login_id");
            this.getCalendarList();
        }else {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
    .subMenu {
        min-width: 200px;
    }
    button{
        width:100%;
    }
    .category{
        width: 90%;
        text-align: left;
        font-size: 13px;
        margin: auto 20px;
        padding-right: 10px;
    }
    .addCategory {
        border: 1px solid yellow;
        height: 80px;
    }
    .addInput {
        width: 80%;
        float: left;
        margin-left: 10px;
        margin-right: 2px;
    }
    .addBtn {
        width: 20px;
        float: left;
        padding: 0;
    }
    .pushCalBtn {
        width: 50px;
    }
    .modi_cal_intput {
        width: 80%;
        margin-top: 5px;
    }
</style>
