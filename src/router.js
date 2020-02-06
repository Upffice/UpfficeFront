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
import OutAddressMain from "./components/address/outaddress/OutAddressMain";
import MypageInfo from "./components/mypage/MypageInfo";
import WorkingStatus from "./components/working/WorkingStatus.vue";
import AnnualDetail from "./components/working/AnnualDetail.vue";
import EmployeesManagement from "./components/managerpage/EmployeesManagement";
import EmployeesMgmDetail from "./components/managerpage/EmployeesMgmDetail";
import AddEmployees from "./components/managerpage/AddEmployees";
import OutManagement from "./components/managerpage/OutManagement";
import AddOutAddress from "./components/managerpage/AddOutAddress";
import OutMgmDetail from "./components/managerpage/OutMgmDetail";
import FormManagement from "./components/managerpage/FormManagement";
import employeesPopup from "./components/managerpage/employeesPopup";

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
            name: "main-employAddress",
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
            path: "/mainOutAddress",
            name: "outAddress-main",
            component: OutAddressMain
        },

                                                                /*--ManagerRouter*/

        {
            path: "/manager/employees",
            name: "employees-mgm",
            component: EmployeesManagement,
            children:[{
                path: "/manager/form-management",
                name: "employeesPopup",
                component: employeesPopup,
                props: true
            },]

        },
        {
            path: "/manager/form-management",
            name: "employeesPopup",
            component: employeesPopup,
            props: true
        },
        {
            path: "/manager/employees/:emp_id",
            name: "EmployeesMgmDetail",
            component: EmployeesMgmDetail,
            props: true
        },
        {
            path: "/manager/add-employees",
            name: "AddEmployees",
            component: AddEmployees
        },
        {
            path: "/manager/out-address",
            name: "outManagement",
            component: OutManagement
        },
        {
            path: "/manager/out-address/:out_id",
            name: "OutMgmDetail",
            component: OutMgmDetail,
            props: true
        },
        {
            path: "/manager/add-out-address",
            name: "AddOutAddress",
            component: AddOutAddress
        },
        {
            path: "/manager/form-management",
            name: "formManagement",
            component: FormManagement
        },



       /*---------------------------------------------- */




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