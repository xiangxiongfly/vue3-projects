<script setup>
import DepartmentContent from "@/views/main/system/department/components/DepartmentContent.vue";
import DepartmentDialog from "@/views/main/system/department/components/DepartmentDialog.vue";
import DepartmentSearch from "@/views/main/system/department/components/DepartmentSearch.vue";
import {ref} from "vue";

const contentRef = ref();
const dialogRef = ref();

const handleReset = () => {
  contentRef.value.getDepartments();
};

const handleSearch = (model) => {
  contentRef.value.getDepartments(model);
};

const handleCreateDepartment = () => {
  dialogRef.value.showDialog();
};

const handleEditDepartment = (department) => {
  dialogRef.value.showDialog(department);
};
</script>

<template>
  <DepartmentSearch @reset="handleReset" @search="handleSearch"/>
  <DepartmentContent ref="contentRef" @createDepartment="handleCreateDepartment"
                     @editDepartment="handleEditDepartment"/>
  <DepartmentDialog ref="dialogRef"/>
</template>

<style scoped lang="scss">

</style>