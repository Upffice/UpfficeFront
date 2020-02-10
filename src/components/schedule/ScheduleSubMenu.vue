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
                 <span style="font-size: 15px" :style="{color: calendar.calendar_color}">●</span>&nbsp;
                 {{calendar.calendar_name}}
             </label><br><br>
            <button class="btn btn-info btn-sm pushCalBtn" @click="modify()">수정</button>
            <button class="btn btn-info btn-sm pushCalBtn" @click="deleteCalendarList()">삭제</button>
        </div>

        <div v-else class="form-check">
            캘린더 목록
             <label class="form-check-label " v-for="(calendar, index) in calendarList" :key="index">
                 <div v-if="checkedCalendars.includes(calendar.calendar_id)" class="modi_cal">
                     <input type="color" class="modi_cal_color" :value="calendar.calendar_color" @change="changeColor(calendar.calendar_color, index)">
                     <input class="form-control form-control-sm modi_cal_input" type="text"
                            required v-model="modi_cal_input[index]" :placeholder="calendar.calendar_name">
                 </div>

                 <div v-else class="modi_cal">
                     <input type="color" class="modi_cal_color" v-model="calendar.calendar_color" disabled>
                     <input class="form-control form-control-sm modi_cal_input" type="text" :value="calendar.calendar_name" readonly>
                 </div>
             </label><br><br>

            <button class="btn btn-info btn-sm pushCalBtn" @click="modifyCalendarList()">확인</button>
            <button class="btn btn-info btn-sm pushCalBtn" @click="cancel">취소</button>
        </div>
    </div>
</template>

<script>
    import RegisterPopup from "./RegisterPopupModal";
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
            modi_cal_input : [],
            modi_cal_color : []
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
                 draggable: true
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
                .get("/calendar/list/" + this.emp_id)
                .then(response=> {
                    /* eslint-disable no-console */
                    this.calendarList = response.data;
                })
                .catch(e => {
                    /* eslint-disable no-console */
                    console.log(e);
                });
        },
        changeColor(color, index) {
            this.modi_cal_color[index] = color;    // 수정할 캘린더의 색 넣기
        },
        modify() {
            if(this.checkedCalendars.length !=0) {
                this.modi_flag = false;
            }
        },
        modifyCalendarList() {
            let data =[];
            let j=0;

            // 캘린더 이름과 색 전부 수정하는 경우
            for(let i=0; i<this.modi_cal_input.length; i++) {
                if(this.modi_cal_input[i] !== undefined) {
                    data[j] = this.checkedCalendars[j] + "," + this.modi_cal_input[i];
                     j++;
                } else {
                    return; // modi_cal_input 이 빈칸인 경우
                }
            }

            http
                .put("/calendar/update/" + this.emp_id, data) // UpfficeBack의 MyPageController로 매핑 된다.
                .then(response => {
                    // 수정에 사용되는 변수 초기화
                    this.modi_cal_input = [];
                    this.modi_cal_color = [];
                    this.checkedCalendars = [];
                    this.modi_flag = true;

                    this.getCalendarList(); // 캘린더 목록 다시 불러오기
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteCalendarList() {  // 캘린더 목록 삭제 하는 메소드
            if(this.checkedCalendars.length !=0) {
                let flag = confirm("정말로 삭제하시겠습니까?");

                if(flag == true) {
                    if(this.checkedCalendars.length !=0) {
                        http
                            .delete("/calendar/list/" + this.emp_id +"?calendar_id=" + this.checkedCalendars)
                            .then(response=> {
                                /* eslint-disable no-console */
                                // 수정에 사용되는 변수 초기화
                                this.modi_cal_input = [];
                                this.modi_cal_color = [];
                                this.checkedCalendars = [];
                                this.modi_flag = true;

                                this.getCalendarList(); // 캘린더 목록 다시 불러오기
                            })
                            .catch(e => {
                                /* eslint-disable no-console */
                                console.log(e);
                            });
                    }
                }
            }

        },
        cancel() {
            this.modi_flag = true;
            this.checkedCalendars = []; // 체크 박스 해제
            this.modi_cal_input = ""; // 수정 input 초기화
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
    .modi_cal {
        margin-top: 5px;
    }
    .modi_cal_color {
        margin-top: 5px;
        float: left;
        margin-right: 10px;
    }
    .modi_cal_input {
        width: 70%;

    }
</style>
