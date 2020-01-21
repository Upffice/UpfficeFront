<template>
    <div class="container">
        <h2>test</h2>
        <div class="search">
            <input type="text" v-on:input="searchMatching($event.target.value)"
                   placeholder="부서나 이름을 입력해주세요"
                   style="width: 300px"/>
            <ul>
                <li id="empList" v-for="emp in typingArr">
                    <div>
                        <b>{{emp.dep_name}}</b>
                        <b>{{emp.emp_name}}</b>
                        <b>{{emp.emp_email}}</b>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"
    import * as Hangul from 'hangul-js';

    export default {
        name: "search-bar",
        data() {
            return {
                search: "",
                search1: [],
                typing: "",
                typingArr: [],
                dis: [],
                cho: "",
                depArr: [],
                empArr: [],
            }
        },//End of data(){}
        computed: {},//End of computed : {}
        methods: {
            searchMatching: function (lang) {
                /*새변수 = .filter() [새로운 배열로 반환]*/
                this.typingArr = this.empArr.filter(function (emp) {
                    /*return [이름,부서] 문자열검색 || 초성검색*/
                        return emp.emp_name.includes(lang) || emp.dis_emp_name.includes(Hangul.disassemble(lang).join(""))
                            || emp.dep_name.includes(lang) || emp.dis_dep_name.includes(Hangul.disassemble(lang).join(""));
                    })
            },
            idToName: function () {
                /*emp,dep table dep_id비교해서 emp에 dep_name bind*/
                for (var i = 0; i < this.empArr.length; i++) {
                    for (var j = 0; j < this.depArr.length; j++) {
                        if (this.empArr[i].dep_id == this.depArr[j].dep_id) {
                            this.empArr[i].dep_name = this.depArr[j].dep_name;
                        }
                    }
                }
            },
            addCho: function () {
                this.empArr.forEach(function (emp) {
                    /*empArr에 초성필드 추가{emp_name:"김범준", disassembled:"ㄱㅂㅈ"}*/
                    var dis = Hangul.disassemble(emp.emp_name, true)
                    var dis2 = Hangul.disassemble(emp.dep_name, true)
                    var cho = dis.reduce(function (prev, elem) {
                        elem = elem[0] ? elem[0] : elem;
                        return prev + elem;
                    }, "");
                    var cho2 = dis2.reduce(function (prev, elem) {
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
        },//End of method :{}
        mounted() {
            /*db가져와서 info에 넣어주는 로직*/
            this.saveInfo();

        },//End of mounted(){}
        beforeUpdate() {
        },
        updated() {

        }//End of updated(){}

    }
</script>

<style scoped>

</style>
