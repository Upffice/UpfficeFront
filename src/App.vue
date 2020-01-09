<template>
    <div id="app" class="container-fluid">
        <TopMenu :key="cc"></TopMenu>
        <router-view></router-view>
    </div>
</template>

<script>
    import TopMenu from "./components/TopMenu.vue";
    import {EventBus} from "./event-bus";

    export default {
        name: "app",
        components: {
            TopMenu: TopMenu
        },
        data() {
            return {
                cc: ""
            }
        },
        methods: {
            forceRerender() {
                EventBus.$on("re-render",  sts=> {
                    console.log(sts + "+re-render");
                });

            }
        },
        created() {
            this.forceRerender();
        }
    };

</script>

<style>
    .container-fluid {
        text-align: center;
    }

    .libgclr {
        background: #EBF0F0;
    }

    .subMenu {
        background: #EBF0F0;
        width: 15%;
        height: 100%;
        left: 15px;
        top: 70px;
        position: fixed;
    }
</style>
