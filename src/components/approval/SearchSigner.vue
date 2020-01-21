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
                        <div id="empList" v-for="emp in showArr" style="text-align: -webkit-left;">
                            <div style="background-color: blue">
                                <b style="margin-left: 10px">{{emp.dep_name}}</b>
                                <b>{{emp.emp_name}}</b>
                                <b>{{emp.emp_email}}</b>
                            </div>
                            <!--                            <div class="red" v-if="emp.selected=false" style="background-color: red">-->
                            <!--                                <b style="margin-left: 10px">{{emp.dep_name}}</b>-->
                            <!--                                <b>{{emp.emp_name}}</b>-->
                            <!--                                <b>{{emp.emp_email}}</b>-->
                            <!--                            </div>-->
                            <!--                                                        <div v-bind:class="{showArr.selected=false}"  style="background-color: red">-->
                            <!--                                                            <b style="margin-left: 10px">{{emp.dep_name}}</b>-->
                            <!--                                                            <b>{{emp.emp_name}}</b>-->
                            <!--                                                            <b>{{emp.emp_email}}</b>-->
                            <!--                                                        </div>-->
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
                sign1: "",
                sign2: "",
                sign3: "",
                del_password: '',
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
                if (this.showArr.length > 6) {//결과값 6이상이면 함수종료
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
                        if (this.empArr[i].dep_id == this.depArr[j].dep_id) {
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

            },
            selectBelow() {

                // console.log("this.showArr")
                // console.log(this.showArr)
                // if (this.showArr.length > 0 && this.showArr[0].selected === false) {
                //     this.showArr[0].selected = true;
                // } else if (this.showArr.length > 0 && this.showArr[0].selected === true) {
                //     this.showArr[0].selected = false;
                //     this.showArr[1].selected = true;
                //     console.log("1진입, showArr1==>>" + this.showArr[1].selected)
                // } else if (this.showArr.length > 1 && this.showArr[1].selected === true) {
                //     this.showArr[1].selected = false;
                //     this.showArr[2].selected = true;
                //     console.log("2진입, showArr2==>>" + this.showArr[2].selected)
                // } else if (this.showArr.length > 2 && this.showArr[2].selected === true) {
                //     this.showArr[2].selected = false;
                //     this.showArr[3].selected = true;
                //     console.log("3진입, showArr3==>>" + this.showArr[3].selected)
                // } else if (this.showArr.length > 3 && this.showArr[3].selected === true) {
                //     this.showArr[3].selected = false;
                //     this.showArr[4].selected = true;
                //     console.log("4진입, showArr4==>>" + this.showArr[4].selected)
                // }
            }
        },//End of method :{}
        mounted() {
            /*db가져와서 info에 넣어주는 로직*/
            this.saveInfo();


        }//End of mounted(){}

    }//End of export default
</script>

<style scoped>

</style>