<script setup lang="ts">
import { ref } from "vue";
import { useChat } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
// import Refresh from "@iconify-icons/ep/refresh";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "chat"
});

const formRef = ref();
const { qform, loading, dataList, platformOptions, modelOptions, onChat } =
  useChat();
</script>

<template>
  <div class="main">
    <el-scrollbar class="scrollbar">
      <div v-for="(item, idx) in dataList" :key="idx">
        <div v-if="item.role == 'user'" class="scrollbar-right-item">
          {{ item.content }}
        </div>
        <div v-else class="scrollbar-left-item">
          {{ item.content }}
        </div>
      </div>
    </el-scrollbar>

    <el-form
      ref="formRef"
      :inline="true"
      :model="qform"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="平台：" prop="status">
        <el-select
          v-model="qform.platform"
          placeholder="请选择平台"
          class="w-full"
          clearable
        >
          <el-option
            v-for="(item, index) in platformOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模型：" prop="reminderStatus">
        <el-select
          v-model="qform.model"
          placeholder="请选择模型"
          class="w-full"
          clearable
        >
          <el-option
            v-for="(item, index) in modelOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="问题：" prop="message">
        <el-input
          v-model="qform.message"
          placeholder="请输入问题"
          class="w-full"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onChat"
        >
          发送
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

.scrollbar {
  overflow-y: scroll;
  height: 600px;
  background: white;
}
.scrollbar-left-item {
  display: flex;
  align-items: left;
  justify-content: left;
  max-width: 80%;
  margin: 10px 30px;
  text-align: left;
  border-radius: 4px;
  background: var(--el-color-info-light-9);
  color: var(--el-color-danger);
  border: 1px solid var(--el-color-danger);
  padding: 10px;
}

.scrollbar-right-item {
  display: flex;
  align-items: right;
  justify-content: right;
  //max-width: 100%;
  margin: 10px 30px 10px 130px;
  text-align: left;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary);
  padding: 10px;
}
</style>
