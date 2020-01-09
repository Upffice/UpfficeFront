<template>
    <div class="">
        마이페이지
    </div>
</template>

<script>

export default {
    name: "employee-info",
    data() {
        return {
          employee: {
            emp_id: "",
            emp_pw: "",
            emp_name: "",
            emp_email: "",
            position: "",
            hire_date: "",
            extension_number: "",
            phone_number: "",
            dep_id: ""
          }
          // 정보수정 시 확인하는 변수 추가...?
        };
    },
    methods: {

    }
}
</script>

<style scoped>

</style>