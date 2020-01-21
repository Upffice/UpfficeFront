<template>

    <div class="container">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">결재선 지정</h5>
                    <button type="button" class="close" aria-label="Close" style="font-size: 40px; color: black;"
                            @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <fieldset>
                        <div>검색</div>
                        <input type="text" v-on:input="searchMatching($event.target.value)"
                               @keyup.enter="add_signer"
                               @keyup.up="selectAbove"
                               @keyup.left="selectAbove"
                               @keyup.down="selectBelow"
                               @keyup.right="selectBelow"
                               class="form-control col-md-12" placeholder="부서나 이름을 입력해주세요"
                               style="width: 400px; float: left; border:2px #95a5a6 solid">
                        <input type="button" class="btn btn-primary" value="추가" style="float: right">
                    </fieldset>
                    <div v-if="showArr.length>0"
                         style="background-color: aliceblue; width: 400px; border: #95a5a6 1.5px solid; border-top: 0px; border-radius: 3px">
                        <div id="empList" v-for="(emp,index) in showArr" :key="index"  style="text-align: -webkit-left;">
                            <div v-bind:class="{'selected':isSelected(index)}" ><!--v-if="emp.selected=false"-->
                                <b style="margin-left: 10px">{{emp.dep_name}}{{emp.emp_name}}{{emp.emp_email}}</b>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <input class="btn btn-primary" @click="close_modal" type="button" value="확인">
                    <input class="btn btn-secondary" @click="$emit('close')" type="button" value="취소">

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import http from "../../http-common"
    import * as Hangul from 'hangul-js';

    export default {
        name: "SearchSigner",
        data: function () {
            return {
                keyNum: 0,
                sign1: "",
                sign2: "",
                sign3: "",
                del_password: '',
                selected: false,
                showArr: [],
                depArr: [],
                empArr: [],
            }
        }, props: [
            'hot_table',
        ], methods: {
            close_modal() {
                this.$emit('close')
            },
            searchMatching: function (lang) {
                if (this.showArr.length > 6) {//결과값 6이상이면 함수종료//유효하지않은듯
                    return
                } else {//결과값 6개 미만
                    /*새변수 = .filter() [새로운 배열로 반환]*/
                    this.showArr = this.empArr.filter(function (emp) {
                        /*return [이름,부서] 문자열검색 || 초성검색*/

                        return emp.emp_name.includes(lang) || emp.dis_emp_name.includes(Hangul.disassemble(lang).join(""))
                            || emp.dep_name.includes(lang) || emp.dis_dep_name.includes(Hangul.disassemble(lang).join(""));
                    })
                }
            },
            idToName: function () {
                /*emp,dep table dep_id비교해서 emp에 dep_name bind*/
                for (let i = 0; i < this.empArr.length; i++) {
                    for (let j = 0; j < this.depArr.length; j++) {
                        if (this.empArr[i].dep_id === this.depArr[j].dep_id) {
                            this.empArr[i].dep_name = this.depArr[j].dep_name;
                        }
                    }
                }
            },
            addCho: function () {
                this.empArr.forEach(function (emp) {
                    /*empArr에 초성필드 추가{emp_name:"김범준", disassembled:"ㄱㅂㅈ"}*/
                    let dis = Hangul.disassemble(emp.emp_name, true)
                    let dis2 = Hangul.disassemble(emp.dep_name, true)
                    let cho = dis.reduce(function (prev, elem) {
                        elem = elem[0] ? elem[0] : elem;
                        return prev + elem;
                    }, "");
                    let cho2 = dis2.reduce(function (prev, elem) {
                        elem = elem[0] ? elem[0] : elem;
                        return prev + elem;
                    }, "");
                    emp.dis_emp_name = cho;
                    emp.dis_dep_name = cho2;
                    emp.selected = false;//선택 property 추가
                });
            },
            saveInfo: function () {
                /*연관검색 데이터 가져오는 메서드(SELECT ALL)*/
                http
                    .post("/app/search/dep")
                    .then(response => {
                        this.depArr = response.data;
                        this.idToName();
                        this.addCho();
                    })
                    .catch(e => {
                        console.log(e)
                    });

                http
                    .post("/app/search/emp")
                    .then(response => {
                        this.empArr = response.data;
                        this.idToName();
                        this.addCho();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            add_signer() {
                alert("추가되었습니다!")
                if (this.sign1 == null) {

                }
            },
            selectAbove() {
                console.log("selectAbove진입")
                console.log("keyNum=" + this.keyNum)
                if (this.keyNum == 0) {
                    this.showArr[this.keyNum].selected = true;
                    this.showArr[this.keyNum + 1].selected = false;

                } else if (this.keyNum == this.showArr.length) {
                    this.showArr[this.keyNum - 1].selected = true;
                    this.keyNum--
                } else {
                    this.showArr[this.keyNum - 1].selected = true;
                    this.showArr[this.keyNum].selected = false;
                    this.keyNum--
                }
                console.log("keyNum=" + this.keyNum)
            },
            selectBelow() {
                console.log("selectBelow진입")
                console.log("keyNum=" + this.keyNum)


                if (this.keyNum == 0) {
                    this.showArr[this.keyNum].selected = true;
                    this.keyNum++
                } else if (this.keyNum == this.showArr.length) {
                    this.showArr[this.keyNum - 1].selected = true;
                } else {
                    this.showArr[this.keyNum].selected = true;
                    this.showArr[this.keyNum - 1].selected = false;
                    this.keyNum++
                }

                console.log("keyNum=" + this.keyNum)
            },  isSelected(index){
                console.log("진입")
                if(index==this.keyNum){
                    console.log("진입2")

                    return true
                }else{
                    return false
                }
            }


        },//End of method :{}
        created() {

        },
        mounted() {
            /*db가져와서 info에 넣어주는 로직*/
            this.saveInfo();
        },//End of mounted(){}
        updated() {
            console.log("this.showArr" + this.showArr);
            console.log(this.showArr);
        },

    }//End of export default
</script>

<style scoped>
.selected{
    background-color: darkslateblue;
}
</style>