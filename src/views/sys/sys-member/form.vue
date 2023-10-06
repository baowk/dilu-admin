<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { SysMemberFormProps } from "@/api/sys/sys-member";

const props = withDefaults(defineProps<SysMemberFormProps>(), {
  formInline: () => ({
    id: 0,
    teamId: 0,
    userId: 0,
    nickname: null,
    name: null,
    phone: null,
    deptPath: null,
    deptId: 0,
    postTag: 0,
    status: 0
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="主键" prop="id">
      <el-input
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item>
    <el-form-item label="团队id" prop="teamId">
      <el-input
        v-model.number="newFormInline.teamId"
        clearable
        placeholder="请输入团队id"
      />
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input
        v-model.number="newFormInline.userId"
        clearable
        placeholder="请输入用户id"
      />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input
        v-model="newFormInline.nickname"
        clearable
        placeholder="请输入昵称"
      />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        clearable
        placeholder="请输入电话"
      />
    </el-form-item>
    <el-form-item label="部门路径" prop="deptPath">
      <el-input
        v-model="newFormInline.deptPath"
        clearable
        placeholder="请输入部门路径"
      />
    </el-form-item>
    <el-form-item label="部门id" prop="deptId">
      <el-input
        v-model.number="newFormInline.deptId"
        clearable
        placeholder="请输入部门id"
      />
    </el-form-item>
    <el-form-item label="职位标签 1主管 2副主管 3员工" prop="postTag">
      <el-input
        v-model.number="newFormInline.postTag"
        clearable
        placeholder="请输入职位标签 1主管 2副主管 3员工"
      />
    </el-form-item>
    <el-form-item label="状态 1正常 " prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态 1正常 "
      />
    </el-form-item>
  </el-form>
</template>
