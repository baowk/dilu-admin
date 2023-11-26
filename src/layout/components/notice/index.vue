<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserTasks, getUserNotices, Notice } from "@/api/notice/user-notice";
import Bell from "@iconify-icons/ep/bell";
import NoticeList from "./noticeList.vue";

const noticesNum = ref(0);
const notices = ref(Array<Notice>());
const activeKey = ref();

//notices.value.map(v => (noticesNum.value += v.list.length));

function onNotices() {
  getUserNotices().then(res => {
    if (res.code == 200) {
      notices.value[0] = res.data;
      noticesNum.value += res.data.count;
      activeKey.value = "1";
    }
  });
  getUserTasks().then(res => {
    if (res.code == 200) {
      notices.value[1] = res.data;
      noticesNum.value += res.data.count;
    }
  });
}
onMounted(() => {
  onNotices();
});
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span class="select-none dropdown-badge navbar-bg-hover">
      <el-badge :value="noticesNum" :max="99">
        <span class="header-notice-icon">
          <IconifyIconOffline :icon="Bell" />
        </span>
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs
          :stretch="true"
          v-model="activeKey"
          class="dropdown-tabs"
          :style="{ width: notices.length === 0 ? '200px' : '330px' }"
        >
          <el-empty
            v-if="notices.length === 0"
            description="暂无消息"
            :image-size="60"
          />
          <span v-else>
            <template v-for="item in notices" :key="item.key">
              <el-tab-pane
                :label="`${item.name}(${item.count})`"
                :name="`${item.key}`"
              >
                <el-scrollbar max-height="330px">
                  <div class="noticeList-container">
                    <NoticeList :list="item.list" />
                  </div>
                </el-scrollbar>
              </el-tab-pane>
            </template>
          </span>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 48px;
  margin-right: 10px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  .noticeList-container {
    padding: 15px 24px 0;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px;
  }
}
</style>
