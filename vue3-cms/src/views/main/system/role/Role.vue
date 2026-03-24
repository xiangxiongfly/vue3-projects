<script setup>
import RoleContent from "@/views/main/system/role/components/RoleContent.vue";
import RoleDialog from "@/views/main/system/role/components/RoleDialog.vue";
import {ref} from "vue";

const contentRef = ref();
const dialogRef = ref();

const handleCreateRole = (role) => {
  dialogRef.value.showDialog();
};

const handleEditRole = (role) => {
  dialogRef.value.showDialog(role);
};
</script>

<template>
  <RoleContent ref="contentRef" @createRole="handleCreateRole" @editRole="handleEditRole"/>
  <RoleDialog ref="dialogRef"/>
</template>

<style scoped lang="scss">

</style>