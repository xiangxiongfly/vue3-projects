<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/index.js";
import PageContainer from "@/components/PageContainer.vue";
import {Plus, Upload} from "@element-plus/icons-vue";
import {updateAvatar} from "@/api/user.js";
import {ElMessage} from "element-plus";

const userStore = useUserStore();
const imgUrl = ref(userStore.user.user_pic);
const uploadRef = ref();

const onSelectFile = (file) => {
  const reader = new FileReader(); // 使用FileReader读取图片
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
};

const onUpdateAvatar = async () => {
  await updateAvatar(imgUrl.value);
  await userStore.getUser();
  ElMessage.success("头像更新成功");
};
</script>

<template>
  <page-container title="更换头像">
    <el-upload ref="uploadRef" :auto-upload="false" class="avatar-uploader" :show-file-list="false"
               :on-change="onSelectFile">
      <img v-if="imgUrl" :src="imgUrl" alt class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <br/>
    <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus"
               size="large">
      选择图片
    </el-button>
    <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large">上传头像</el-button>
  </page-container>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}

</style>