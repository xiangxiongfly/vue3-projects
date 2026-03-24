<script setup>
import {ref} from "vue";
import {getChannels} from "@/api/article.js";

defineProps({
  modelValue: {
    type: [Number, String]
  }
});
defineEmits(["update:modelValue"]);

const channelList = ref([]);
const getChannelList = async () => {
  const res = await getChannels();
  channelList.value = res.data.data;
};
getChannelList();
</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <el-option v-for="channel in channelList" :key="channel.id" :label="channel.cate_name"
               :value="channel.id"></el-option>
  </el-select>
</template>

<style scoped lang="scss">

</style>