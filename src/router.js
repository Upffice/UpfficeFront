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
import Addposts from "./components/posts/Addposts";
import PostsList from "./components/posts/PostsList";
import Post from "./components/posts/Post";
import WorkingStatus from "./components/working/WorkingStatus.vue";
import AnnualDetail from "./components/working/AnnualDetail.vue";
import AddSurvey from "./components/survey/AddSurvey";
import SurveyList from "./components/survey/SurveyList";
import Survey from "./components/survey/Survey";
import DepPostsList from "./components/posts/DepPostsList";

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
            path: "/pst/add",
            name: "add",
            component: Addposts
        },
        {
            path:  "/pst/posts",
            name: "post",
            alias: "/pst",
            component: PostsList
        },
        {
            path: "/pst/PostsList/:post_id",
            name: "post-details",
            component: Post,
            props : true
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
            path:"/survey/addsurvey",
            name:"addsurvey",
            alias: "/addsurvey",
            component: AddSurvey
        },
        {
            path:  "/survey/allsurvey",
            name: "SurveyList",
            alias: "/survey",
            component: SurveyList
        },
        {
            path: "/survey/SurveyList/:survey_id",
            name: "survey-details",
            component: Survey,
            props : true
        },
        {
            path: "/dep_pst/add",
            name: "dep_add",
            component: Addposts
        },
        {
            path:  "/dep_pst/posts",
            name: "dep_post",
            alias: "/dep_pst",
            component: DepPostsList
        },
        {
            path: "/dep_pst/PostsList/:post_id",
            name: "dep_post-details",
            component: Post,
            props : true
        }

    ]
});