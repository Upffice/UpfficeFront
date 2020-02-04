import Vue from "vue";
import Router from "vue-router";
import MainView from "./components/MainView";

import BoardList from "./components/board/BoardList.vue";
import AddBorad from "./components/board/AddBorad.vue";
import SearchBoards from "./components/board/SearchBoards.vue";
import Board from "./components/board/Board.vue";

import CustomersList from "./components/customer/CustomersList.vue";
import AddCustomer from "./components/customer/AddCustomer.vue";
import SearchCustomers from "./components/customer/SearchCustomers.vue";
import Customer from "./components/customer/Customer.vue";
import MypageInfo from "./components/mypage/MypageInfo";
import WorkingStatus from "./components/working/WorkingStatus.vue";
import AnnualDetail from "./components/working/AnnualDetail.vue";

import SignWait from "./components/approval/SignWait.vue";
import Approval from "./components/approval/Approval";
import DocWrite from "./components/approval/DocWrite";
import SignWaitDetails from "./components/approval/SignWaitDetails";
import DocTemp from "./components/approval/DocTemp";
import SignIng from "./components/approval/SignIng";
import SignIngDetails from "./components/approval/SignIngDetails";
import DocTempDetails from "./components/approval/DocTempDetails";
import SignComplete from "./components/approval/SignComplete";
import SignCompleteDetails from "./components/approval/SignCompleteDetails";
import SignReject from "./components/approval/SignReject";
import SignRejectDetails from "./components/approval/SignRejectDetails";
import SignHold from "./components/approval/SignHold";
import SignHoldDetails from "./components/approval/SignHoldDetails";
import Reference from "./components/approval/Reference";
import ReferenceDetails from "./components/approval/ReferenceDetails";
import Receive from "./components/approval/Receive";
import ReceiveDetails from "./components/approval/ReceiveDetails";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "mainView",
            component: MainView,
        },
        {
            path: "/bbs/board",
            name: "boards",
            alias: "/bbs",
            component: BoardList,
        },
        {
            path: "/bbs/BoardList/:b_id",
            name: "board-details",
            component: Board,
            props: true
        },
        {
            path: "/bbs/add",
            name: "add",
            component: AddBorad
        },
        {
            path: "/bbs/search",
            name: "search",
            component: SearchBoards
        },
        {
            path: "/customer/customer",
            name: "customers",
            alias: "/customer",
            component: CustomersList,
        },
        {
            path: "/customer/customer/:id",
            name: "customer-details",
            component: Customer,
            props: true
        },
        {
            path: "/customer/add",
            name: "add",
            component: AddCustomer
        },
        {
            path: "/customer/search",
            name: "search",
            component: SearchCustomers
        },
        {
            path: "/mypage",
            name: "mypage",
            component: MypageInfo
        },
        {
            path: "/working/status",
            name: "workingStatus",
            alias: "/working",
            component: WorkingStatus
        },
        {
            path: "/working/annual",
            name: "annualDetail",
            component: AnnualDetail
        },


        {
            path: "/app",
            name: "approval",
            component: Approval
        },
        {
            path: "/app/doc/write",
            name: "write",
            alias: "/app/doc",
            component: DocWrite

        },
        {
            path: "/app/doc/temp",
            name: "temp",
            component: DocTemp
        },
        {
            path: "/app/doc/temp/:id",
            name: "DocTempDetails",
            component: DocTempDetails,
            props: true
        },

        {
            path: "/app/sign/wait",
            name: "wait",
            alias: "/app/sign",
            component: SignWait
        },
        {
            path: "/app/sign/wait/:id",
            name: "wait-details",
            component: SignWaitDetails,
            props: true
        },

        {
            path: "/app/sign/ing",
            name: "ing",
            component: SignIng
        },
        {
            path: "/app/sign/ing/:id",
            name: "ing-details",
            component: SignIngDetails,
            props: true
        },

        {
            path: "/app/sign/complete",
            name: "complete",
            component: SignComplete
        },
        {
            path: "/app/sign/ing/:id",
            name: "complete-details",
            component: SignCompleteDetails,
            props: true
        },

        {
            path: "/app/sign/reject",
            name: "reject",
            component: SignReject
        },
        {
            path: "/app/sign/reject/:id",
            name: "reject-details",
            component: SignRejectDetails,
            props: true
        },

        {
            path: "/app/sign/hold",
            name: "hold",
            component: SignHold
        },
        {
            path: "/app/sign/hold/:id",
            name: "hold-details",
            component: SignHoldDetails,
            props: true
        },

        {
            path: "/app/ref/ref",
            name: "ref",
            alias:"/app/ref",
            component: Reference
        },
        {
            path: "/app/ref/:id",
            name: "ref-details",
            component: ReferenceDetails,
            props: true
        },

        {
            path: "/app/rcv/rcv",
            name: "rcv",
            alias:"/app/rcv",
            component: Receive
        },
        {
            path: "/app/rcv/:id",
            name: "rcv-details",
            component: ReceiveDetails,
            props: true
        },
    ]
});