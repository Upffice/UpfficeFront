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
import MainEmployAddress from "./components/address/employees/MainEmployAddress";
import Employees from "./components/address/employees/Employees";
import SearchEmployees from "./components/address/employees/SearchEmployees";
import EmployeesList from "./components/address/employees/EmployeesList";
import OutAddressMain from "./components/address/outaddress/OutAddressMain";
import MypageInfo from "./components/mypage/MypageInfo";
import WorkingStatus from "./components/working/WorkingStatus.vue";
import AnnualDetail from "./components/working/AnnualDetail.vue";

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
        /*--addressRouter*/
        {
            path: "/mainEmployAddress",
            name: "MainEmployAddress",
            component: MainEmployAddress,
            children: [
                {
                    path: "/mainEmployAddress/:emp_id",
                    name: "employees-details",
                    component: Employees,
                    props: true
                },
            ]
        },

        {
            path: "/employees/:emp_id",
            name: "employees",
            component: Employees,
            props: true
        },
        {
            path: "/searchEmployees",
            name: "searchEmployees",
            component: SearchEmployees
        },
        {
            path: "/mainOutAddress",
            name: "outAddressMain",
            component: OutAddressMain
        },

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
        }
    ]
});