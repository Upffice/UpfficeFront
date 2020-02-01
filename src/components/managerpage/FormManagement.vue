<template>
    <div>
        <form>업로드</form>
        <div id="app">
            <input type="text" v-model="fileName" placeholder="검색할 파일 이름"/>


            <div>
                <table class="table table-hover" style="margin-top: 20px">
                    <thead class="table-secondary">
                    <tr>
                        <th>양식정보</th>
                        <th>다운로드</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="file in files" v-if="file.name.includes(fileName)">
                        <td>{{file.name}}</td>
                        <a href="../../assets/m_file/+'file.num'" download="">
                            <td>{{file.num}}</td>
                        </a></tr>
                    </tbody>




                    <!--  <input type="text" v-model="file.name" placeholder=""/>
                               <input type="text" v-model="file.num" placeholder=""/>
                               <button v-on:click="add">추가</button> 얘는 혹시 파일 추가 가능할까해서..-->



                </table>
            </div>
        </div>

    </div>


</template>

<script>
    export default {
        name: "formManagement",
        el: "#app",
        data() {
            return {
                files: [
                    {name: '양식111', num: 'file01'},
                    {name: '양식222', num: 'file02'},
                    {name: '양식333', num: 'file03'},
                    {name: '양식444', num: 'file04'},
                ],
                file: {
                    name: '',
                    num: ''
                },
                fileName: ''
            }
        },
        methods: {
            /* add () {
                 this.files.push(this.file);
                 this.file = {};
             }*/

        }
    }
</script>

<style scoped>

</style>