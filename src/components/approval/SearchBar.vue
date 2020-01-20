<template>
    <!--    <input type="text" v-model="search" placeholder="부서나 이름을 입력해주세요"/>-->
    <!--    <div v-for="info in infos" class="single-info">-->
    <!--        <h2>{{info.empName|to-uppercase}}</h2>-->
    <!--    </div>-->
    <div class="container">
        <h2>test</h2>
            <input type="text" v-on:keypress="searchMatching" v-model="typing" placeholder="부서나 이름을 입력해주세요" style="width: 300px"/>
        <div v-for="emp in empArr">
            <b>{{emp.dep_id}}</b>
            <b>{{emp.emp_name}}</b>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"
    // import han from "../../hangul"


    export default {
        name: "search-bar",
        data() {
            return {
                typing:"",
                typingArr:[],
                cho:"",
                empInfo: {
                    emp_id: "",
                    emp_name: "",
                    dep_id: ""
                },
                depInfo: {
                    dep_id: "",
                    dep_name: ""
                },
                infoArr: [],
                depArr: [],
                empArr: [],
                search: ""
            }
        },
        computed:{
          // filteredInfo:function(){
          //     return this.info.filter((info)=>{
          //         return info.empName.match(this.search);
          //     });
          // }
            searchMatching:function () {


                this.typingArr =  hangul.disassemble(this.typing)
                this.cho = this.typingArr.reduce(function (prev,elem) {
                    elem = elem[0] ? elem[0] : elem;
                    return prev+elem;
                },"");
                item.dis
                console.log("한글분리~");
                console.log(this.typingArr);
                return this.typingArr
            }
        },
        methods: {
            saveInfo: function () {
                /*연관검색 데이터 가져오는 메서드(SELECT ALL)*/
                // var depData = {
                //     dep_id : this.depInfo.dep_id,
                //     dep_name : this.depInfo.dep_name
                // };
                // var empData = {
                //     emp_id : this.empInfo.emp_id,
                //     emp_name : this.empInfo.emp_name,
                //     dep_name : this.empInfo.dep_name
                // };
                http
                    .post("/app/search/dep")
                    .then(response => {
                        // this.depInfo.dep_id= response.data.dep_id;
                        // this.depInfo.dep_name = response.data.dep_name;
                        console.log("dep진입");
                        this.depArr = response.data;
                        console.log("dep가져옴");
                        console.log(this.depArr.length);

                        for (var i = 0; i < this.empArr.length; i++) {
                            // console.log("length"+this.empArr.length);
                            for (var j = 0; j < this.depArr.length; j++) {
                                // console.log("length"+this.empArr.length);
                                if (this.empArr[i].dep_id == this.depArr[j].dep_id) {
                                    // console.log("if문진입")
                                    this.empArr[i].dep_id = this.depArr[j].dep_name;
                                }
                            }
                        }

                    })
                    .catch(e => {
                        console.log(e)
                    });
                http
                    .post("/app/search/emp")
                    .then(response => {
                        this.empArr = response.data;

                        for (var i = 0; i < this.empArr.length; i++) {
                            // console.log("length"+this.empArr.length);
                            for (var j = 0; j < this.depArr.length; j++) {
                                // console.log("length"+this.empArr.length);
                                if (this.empArr[i].dep_id == this.depArr[j].dep_id) {
                                    // console.log("if문진입")
                                    this.empArr[i].dep_id = this.depArr[j].dep_name;
                                }
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },


        },
        mounted() {
            /*db가져와서 info에 넣어주는 로직*/

            // if (sessionStorage.length > 0) {
            //     this.login_id = sessionStorage.getItem("login_id");
            //
            //     this.;(this.login_id);
            // }else{
            //     alert("로그인을 해주세요!");
            //     this.$router.push('/');
            // }

            this.saveInfo();
        }
    }
</script>

<style scoped>

</style>
