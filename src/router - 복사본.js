import Vue from "vue";
import Router from "vue-router";
import mainView from "./components/mainView.vue";
import topMenu from "./components/topMenu.vue";
import BoardSubMenu from "./components/board/BoardSubMenu.vue";
import BoardList from "./components/board/BoardList.vue";
import AddBorad from "./components/board/AddBorad.vue";
import SearchBoards from "./components/board/SearchBoards.vue";
import Board from "./components/board/Board.vue";
import CustomerSubMenu from "./components/customer/CustomerSubMenu.vue";
import CustomersList from "./components/customer/CustomersList.vue";
import AddCustomer from "./components/customer/AddCustomer.vue";
import SearchCustomers from "./components/customer/SearchCustomers.vue";
import Customer from "./components/customer/Customer.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path:  "/",
      name: "mainView",
      components: {
       topMenu: topMenu,
       content: mainView
       }
    },
    {
      path:  "/bbs/board",
      name: "boards",
      alias: "/bbs",
      components: {
       topMenu: topMenu,
       subMenu: BoardSubMenu,
       content: BoardList
       }   
    },
    {
          path: "/bbs/board/:b_id",
          name: "board-details",
          components: {
       topMenu: topMenu,
       subMenu: BoardSubMenu,
       content: Board
       },
          props: true
     },
    {
      path: "/bbs/add",
      name: "board-add",
      components: {
       topMenu: topMenu,
       subMenu: BoardSubMenu,
       content: AddBorad
       }
    },
    {
      path: "/bbs/search",
      name: "board-search",
      components: {
       topMenu: topMenu,
       subMenu: BoardSubMenu,
       content: SearchBoards
       }
    },
    {
      path: "/customer/customer",
      name: "customers",
       alias: "/customer",
      components: {
       topMenu: topMenu,
       subMenu: CustomerSubMenu,
       content: CustomersList
       }
      },
      {
          path: "/customer/customer/:id",
          name: "customer-details",
          components: {
       topMenu: topMenu,
       subMenu: CustomerSubMenu,
       content: Customer
       },
          props: true
        },
     {
      path: "/customer/add",
      name: "customer-add",
      components: {
       topMenu: topMenu,
       subMenu: CustomerSubMenu,
       content: AddCustomer
       }
    },
    {
      path: "/customer/search",
      name: "customer-search",
      components: {
       topMenu: topMenu,
       subMenu: CustomerSubMenu,
       content: SearchCustomers
       }
    }
  ]
});