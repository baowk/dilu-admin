<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getServer } from "@/api/tool/gen-tables";

// import More from "@iconify-icons/ep/more-filled";

defineOptions({
  name: "monitor"
});

const server = ref();

const timer = ref();
//页面在刷新的时候可以加loading显示 方便页面展示
const loading = ref(false);

function getServerInfo() {
  loading.value = true;
  //当然这里面可以重新获取你想要的数据，我就打印了一下
  getServer().then(res => {
    server.value = res.data;
  });
  //然后这个定时器可以不加，拿到想要的值后执行便可，即拿到数据后我们需要做的善后工作，重置初始值
  setTimeout(() => {
    loading.value = false;
  }, 200);
}
onBeforeUnmount(() => {
  window.clearInterval(timer.value);
});

onMounted(() => {
  timer.value = window.setInterval(() => {
    //不loading的时候才会执行
    if (!loading.value) {
      getServerInfo();
    }
  }, 3000);
});
</script>

<template>
  <div class="main">
    <el-space direction="vertical">
      <el-card class="box-card" style="width: 500px">
        <template #header>
          <div class="card-header">
            <span>Monitor</span>
          </div>
        </template>

        <div class="text item">
          <span>系统：</span><span>{{ server?.os?.goos }}</span>
          <el-divider />
          <span>cpu核数：</span><span>{{ server?.os?.numCpu }}</span>
          <el-divider />
          <span>numGoroutine：</span><span>{{ server?.os?.numGoroutine }}</span>
          <el-divider />
          <span>goVersion：</span><span>{{ server?.os?.goVersion }}</span>
          <el-divider />
          <span>cpu：</span
          ><span>{{ server?.cpu?.usedPercent.toFixed(2) }}%</span>
          <el-divider />
          <span>内存：</span
          ><span
            >{{ server?.ram?.usedMb }}/{{ server?.ram?.totalMb }} MB （{{
              server?.ram?.usedPercent
            }}%）</span
          >
          <el-divider />
          <span>硬盘：</span
          ><span
            >{{ server?.disk?.usedGb }}/{{ server?.disk?.totalGb }} GB （{{
              server?.disk?.usedPercent
            }}%）</span
          >
        </div>
      </el-card>
    </el-space>
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
</style>
