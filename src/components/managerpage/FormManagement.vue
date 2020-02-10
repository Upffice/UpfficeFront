<template>
    <div>
        <h2>파일 다운로드</h2>
        <div>
         <!-- <table>
              <thead>
              <tr><th>파일 이름</th><th>다운로드</th></tr>
              </thead>
              <tbody>
              <tr>
                <td>  <a href="../../assets/m_file/file01.txt" download="">file01</a></td><td></td>
              </tr>
              </tbody>

          </table>-->

            <div class="container">
                <div class="large-12 medium-12 small-12 cell" style="float: left; margin: 0px 20px;"
                     readonly>
                    <router-link to="#" v-for="(file, key) in downLoadNames" class="file-listing"
                                 @click.native="getDown(approval.docNum,file)">
                        <div>{{ file }}</div>
                    </router-link>
                </div>
                <div class="large-12 medium-12 small-12 cell" style="float: left; margin: 0px 20px;">
                    <button @click="getDownAll">Download All</button>
                </div>
            </div>

        </div>

    </div>


</template>

<script>


    export default {
        name: "formManagement",

        data() {
            return {
                downLoadNames: [],
            }
        },
        methods: {
            getDownloadLink(docnum) {
                /*1.'파일명' 다운로드링크받아오는 메서드*/
                /*mounted에 구현하는것 추천, docnum은 업로드 파일 폴더이름*/
                http
                    .get('/app/down/' + docnum)
                    .then(r => {
                        this.downLoadNames = r.data;
                        console.log(this.downLoadNames);
                    })
            },
            getDown(docnum, filename) {
                /*링크누르면 다운로드 되는 메서드*/
                /*axios post 저수준 api*/
                /**/
                http
                ({
                    url: '/app/multiple-files-download/' + docnum,
                    method: 'POST',
                    responseType: 'blob', // important
                    data: filename,
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(r => {
                        // var message = r.data
                        console.log("r.data");
                        console.log(r.data);
                        var fileURL = window.URL.createObjectURL(new Blob([r.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', filename);
                        document.body.appendChild(fileLink);
                        fileLink.click();
                        console.log('SUCCESS!!');
                        // console.log(message)

                    }).catch(function () {
                    console.log('FAILURE!!');
                });
            },
            getDownAll() {
                /*전체 다운로드*/
                if (this.downLoadNames.length > 0) {
                    for (let i = 0; i < this.downLoadNames.length; i++) {
                        let filename = this.downLoadNames[i];
                        http
                        ({
                            url: '/app/multiple-files-download/' + this.approval.docNum,
                            method: 'POST',
                            responseType: 'blob', // important
                            data: filename,
                            headers: {
                                "Content-Type": "application/json"
                            },
                        })
                            .then(r => {
                                // var message = r.data
                                console.log("r.data");
                                console.log(r.data);
                                var fileURL = window.URL.createObjectURL(new Blob([r.data]));
                                var fileLink = document.createElement('a');

                                fileLink.href = fileURL;
                                fileLink.setAttribute('download', filename);
                                document.body.appendChild(fileLink);
                                fileLink.click();
                                console.log('SUCCESS!!');
                            }).catch(function () {
                            console.log('FAILURE!!');
                        });
                    }
                }
            },

        }
    }
</script>

<style scoped>

</style>