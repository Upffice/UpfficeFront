import Vue from "vue";
import Router from "vue-router";
import MainView from "./components/MainView";
import MypageInfo from "./components/mypage/MypageInfo";
import WorkingStatus from "./components/working/WorkingStatus.vue";
import AnnualDetail from "./components/working/AnnualDetail.vue";
import Calendar from "./components/schedule/Calendar";

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
            path: "/schedule/calendar",
            name: "calendar",
            alias: "/calendar",
            component: Calendar
        }
    ]
});