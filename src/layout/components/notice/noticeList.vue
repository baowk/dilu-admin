<script setup lang="ts">
import { PropType } from "vue";
import { NoticeItem } from "@/api/notice/user-notice";
import NoticeItems from "./noticeItem.vue";

const props = defineProps({
  list: {
    type: Array as PropType<Array<NoticeItem>>,
    default: () => []
  }
});
</script>

<template>
  <div v-if="props.list.length">
    <NoticeItems
      v-for="(item, index) in props.list"
      :noticeItem="item"
      :key="index"
    />
  </div>
  <el-empty v-else description="暂无数据" />
</template>
