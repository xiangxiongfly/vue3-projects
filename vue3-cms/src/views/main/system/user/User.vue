<script setup>
import UserContent from "@/views/main/system/user/components/UserContent.vue";
import UserDialog from "@/views/main/system/user/components/UserDialog.vue";
import UserSearch from "@/views/main/system/user/components/UserSearch.vue";
import {ref} from "vue";

const contentRef = ref();
const dialogRef = ref();

const handleSearch = (model) => {
  contentRef.value.getUsers(model);
};

const handleReset = () => {
  contentRef.value.getUsers();
};

const handleCreateUser = () => {
  dialogRef.value.showDialog();
};

const handleEditUser = (user) => {
  dialogRef.value.showDialog(user);
};
</script>

<template>
  <div class="user">
    <UserSearch @search="handleSearch" @reset="handleReset"/>
    <UserContent ref="contentRef" @createUser="handleCreateUser" @editUser="handleEditUser"/>
    <UserDialog ref="dialogRef"/>
  </div>
</template>

<style scoped lang="scss">

</style>