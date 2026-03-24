<script setup>
import E from "wangeditor";
import {useRouter} from "vue-router";
import {getCurrentInstance, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const router = useRouter();
const content = ref("");
// 获取当前组件实例
const instance = getCurrentInstance();
// 编辑器实例
let editor = null;
// 编辑器内容
const editorContent = ref("");

// 内容回调
function onContentChange(c) {
  content.value = c;
}

function cancel() {
  router.go(-1);
}

function submit() {
  ElMessage({
    type: "success",
    message: "内容：" + content.value
  });
}

onMounted(() => {
  editor = new E(instance.proxy.$refs.editorElem);
  editor.config.onchange = onContentChange;
  editor.config.menus = [
    'head', // 标题
    'bold', // 粗体
    'fontSize', // 字号
    'fontName', // 字体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'code', // 插入代码
    'undo', // 撤销
    'redo' // 重复
  ];
  editor.create();
});
</script>

<template>
  <div style="margin-bottom: 20px">
    <div id="wangeditor">
      <div ref="editorElem" style="text-align: left;"></div>
    </div>
  </div>
  <el-container class="content-row">
    <el-button type="success" plain @click="submit">提交</el-button>
    <el-button style="margin-left: 40px;" type="warning" plain @click="cancel">取消</el-button>
  </el-container>
</template>

<style scoped>

</style>