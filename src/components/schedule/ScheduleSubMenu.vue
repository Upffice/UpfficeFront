<template>
    <div class="subMenu">
        <button class="btn btn-lg btn-link" @click="addSchedule()">일정 등록 +</button>

        <div class="form-group addCategory">
            <label class="col-form-label col-form-label" for="inputSmall">캘린더 추가</label>
            <input class="form-control form-control-sm addInput" type="text" placeholder="추가할 캘린더 입력" id="inputSmall" v-model="calendarInput.cal_name">
            <input type="color" v-model="calendarInput.cal_color">
            <button class="btn btn-lg btn-link addBtn" @click="addCategory()">+</button>
        </div>

        <div class="form-check">
            캘린더 목록
            <label class="form-check-label category" v-if="true">
                <input class="form-check-input" type="checkbox" :value="0" v-model="checkedCalendars">
                내 일정
            </label>
             <label class="form-check-label category" v-if="true" v-for="(calendar, index) in calendarList" :key="index">
                 <input class="form-check-input" type="checkbox" :value="calendar.calendar_id" v-model="checkedCalendars">
                 {{calendar.calendar_name}}
             </label><br><br>
            checkedCalendars: {{checkedCalendars}}
            <button class="btn btn-info btn-sm pushCalBtn" @click="pushCalendarList()">확인</button>
            <!--삭제 버튼도 만들기-->
        </div>
<!--        <div class="category">캘린더 목록<br>-->
<!--            &lt;!&ndash;조건검사해서 수정 버튼 누르면 input 버튼 나오게 하기&ndash;&gt;-->
<!--            <span v-if="true" v-for="(calendar, index) in calendarList" :key="index">{{calendar.calendar_name}}<br></span>-->
<!--            <input v-else class="form-control form-control-sm" v-for="(calendar, index) in calendarList" :key="index" type="text" :value="calendar.calendar_name">-->
<!--        </div>-->

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
              cal_color: ""
            },
            calendarList: [],         // 모든 캘린더 목록
            checkedCalendars : [],    // 체크된 캘린더 목록
            // sche_Input : {
            //     calendar_id : "",
            //     sche_name: "",
            //     sche_start_date: "",
            //     sche_start_time: "",
            //     sche_end_date: "",
            //     sche_end_time: "",
            //     sche_place: "",
            //     sche_detail: "",
            // }
        }
    },
    methods : {
     /*   setSchedule() {
            let sche_data = {
                calendar_id : this.sche_Input.calendar_id,
                sche_name: this.sche_Input.sche_name,
                sche_start_date: this.sche_Input.sche_start_date,
                sche_start_time: this.sche_Input.sche_start_time,
                sche_end_date: this.sche_Input.sche_end_date,
                sche_end_time: this.sche_Input.sche_end_time,
                sche_place: this.sche_Input.sche_place,
                sche_detail: this.sche_Input.sche_detail,
            }
            http
                .post("/schedule/add/" + this.emp_id, sche_data)
                .then(response=> {
                    console.log(response.data);
                    this.calendarList = response.data;
                })
                .catch(e => {
                    /!* eslint-disable no-console *!/
                    console.log(e);
                });

        },*/
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
        pushCalendarList() {    // 체크 박스에 체크한 캘린더 목록 sessionStorage 에 넣고 새로고침 : Calendar.vue 와 연동됨
            if(this.checkedCalendars == "") {
                sessionStorage.removeItem("calendar");
                for(let i=0; i<1; i++) {
                    location.reload();
                }// 한 번만 새로고침 하기
            } else {
                sessionStorage.setItem("calendar", this.checkedCalendars);
                for(let i=0; i<1; i++) {
                    location.reload();
                }// 한 번만 새로고침 하기
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
</style>
