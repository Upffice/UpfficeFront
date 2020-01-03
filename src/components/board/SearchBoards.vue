<template>
  <div class="searchform">
    <subMenu></subMenu>
    <h4>Find by subject</h4>
    <div class="form-group">
      <input type="text" class="form-control" id="subject" required v-model="subject" name="subject">
    </div>
 
    <div class="btn-group">
      <button v-on:click="searchBoards" class="btn btn-success">Search</button>
    </div>

    <ul class="search-result">
      <li v-for="(board, index) in boards" :key="index">
        <h6>({{board.user_name}}){{board.subject}} </h6>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../../http-common";
import BoardSubMenu from "./BoardSubMenu";

export default {
  name: "search-board",
  data() {
    return {
      subject: "",
      boards: []
    };
  },
  components: {
    subMenu: BoardSubMenu
  },
  methods: {
    /* eslint-disable no-console */
    searchBoards() {
      http
        .get("/bbs/boards/subject/" + this.subject)
        .then(response => {
          this.boards = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    /* eslint-enable no-console */
  }
};
</script>

<style>
.searchform {
  max-width: 300px;
  margin: auto;
}
.search-result {
  margin-top: 20px;
  text-align: left;
}
</style>