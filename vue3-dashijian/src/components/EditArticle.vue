<script setup>
import {ref} from "vue";
import SelectChannel from "@/components/SelectChannel.vue";
import {Plus} from "@element-plus/icons-vue";
import {QuillEditor} from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import {addArticle, editArticle, getArticleDetails} from "@/api/article.js";
import {ElMessage} from "element-plus";
import {baseURL} from "@/utils/request.js";
import axios from "axios";

const formRef = ref();
const editorRef = ref();
const imgUrl = ref("");
const visibleDrawer = ref(false);
const defaultModel = ref({
  title: "",
  cate_id: "",
  cover_img: "",
  content: "",
  state: ""
});
const formModel = ref({
  ...defaultModel.value
});

const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw); // 转为临时url并显示
  formModel.value.cover_img = uploadFile.raw; // file对象
};

const open = async (row) => {
  visibleDrawer.value = true;
  if (row.id) {
    // 编辑回显
    const res = await getArticleDetails(row.id);
    formModel.value = res.data.data;
    imgUrl.value = baseURL + formModel.value.cover_img;
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img);
  } else {
    // 新建置空
    formModel.value = {...defaultModel.value};
    imgUrl.value = "";
    editorRef.value.setHTML("");
  }
};

async function imageUrlToFile(url, fileName) {
  try {
    const res = await axios.get(url, {responseType: "arraybuffer"});
    const imgData = res.data;
    const blob = new Blob([imgData], {type: res.headers["content-type"]});
    return new File([blob], fileName, {type: blob.type});
  } catch (e) {
    console.log("图片转换失败：", e);
    throw e;
  }
}

const emit = defineEmits(["success"]);
const onPublish = async (state) => {
  formModel.value.state = state;

  const fd = new FormData();
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key]);
  }

  if (formModel.value.id) {
    // 编辑操作
    await editArticle(fd);
    ElMessage.success("修改成功");
    visibleDrawer.value = false;
    emit("success", "edit");
  } else {
    // 添加操作
    await addArticle(fd);
    ElMessage.success("添加成功");
    visibleDrawer.value = false;
    emit("success", "add");
  }
};

defineExpose({
  open
});

</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="formModel.id?'编辑文章':'添加文章'" direction="rtl" size="50%">
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <select-channel v-model="formModel.cate_id" width="100%"></select-channel>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onUploadFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt=""/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor ref="editorRef" theme="snow" v-model:content="formModel.content"
                        content-type="html"></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}

</style>