<script setup lang="ts">
import { useMyUserInfo } from "./utils/hook";

defineOptions({
  name: "MyInfo"
});

const {
  openTeamDialog,
  resetDialog,
  openDialog,
  myInfo,
  postOptions,
  teamInfo
} = useMyUserInfo();
</script>

<template>
  <div class="main">
    <el-space direction="vertical">
      <el-card class="box-card" style="width: 500px">
        <template #header>
          <div class="card-header">
            <span>企业信息</span>
            <el-button class="button" text v-if="teamInfo?.teams?.length > 1"
              >切换企业</el-button
            >
          </div>
        </template>

        <div class="text item">
          <span>企业名：</span><span>{{ myInfo?.teamName }}</span>
          <el-divider />
          <span>姓名：</span><span>{{ myInfo?.name }}</span>
          <span>&nbsp;（{{ myInfo?.nickname }}）</span>
          <el-divider />
          <span>入职时间：</span><span>{{ myInfo?.entryTime }}</span>
          <el-divider />
          <span>生日：</span><span>{{ myInfo?.birthday }}</span>
          <el-divider />
          <span>性别：</span
          ><span>{{ myInfo?.gender == 1 ? "男" : "女" }}</span>
          <el-divider />
          <span>电话：</span><span>{{ myInfo?.phone }}</span>
          <el-divider />
          <span>职位：</span
          ><span v-for="(item, idx) in postOptions" :key="idx">
            <span v-if="item.value == myInfo?.postId">
              {{ item.label }}
            </span>
          </span>
          <el-divider />
          <auth value="my:change:team">
            <el-button class="button" @click="openTeamDialog(myInfo?.teamId)"
              >修改企业名</el-button
            >
          </auth>
          <el-button
            class="button"
            @click="openDialog(myInfo)"
            style="flex: right"
            >修改我的信息</el-button
          >
          <el-button class="button" @click="resetDialog">修改密码</el-button>
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
