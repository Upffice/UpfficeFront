<template>
  <div v-if="this.board">
    <subMenu></subMenu>
    <h4>Board</h4>
    <div>
      <label>user_name: </label> {{this.board.user_name}}
    </div>
    <div>
      <label>subject: </label> {{this.board.subject}}
    </div>
    <div>
      <label>created: </label> {{this.board.created}}
    </div>
    <div>
      <label>content: </label> {{this.board.content}}
    </div>  

    <span class="button is-small btn-danger" v-on:click="deleteBoard()">Delete</span>
  </div>
  <div v-else>
    <subMenu></subMenu>
    <br/>
    <p>Please click on a Board...</p>
  </div>
</template>

<script>
import http from "../../http-common";
import BoardSubMenu from "./BoardSubMenu";

export default {
  name: "board",
  props: ["board"],
  components: {
    subMenu: BoardSubMenu
  },
  methods: {
    /* eslint-disable no-console */
    updateActive(status) {
      var data = {
        id: this.customer.id,
        name: this.customer.name,
        age: this.customer.age,
        active: status
      };

      http
        .put("/customer/" + this.customer.id, data)
        .then(response => {
          this.customer.active = response.data.active;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteBoard() {
      http
        .delete("/bbs/board/" + this.board.b_id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
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
</style>