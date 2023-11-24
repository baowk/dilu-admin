<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { TaskFormProps } from "@/api/notice/task";

const props = withDefaults(defineProps<TaskFormProps>(), {
  formInline: () => ({
    id: 0,
    teamId: 0,
    userId: 0,
    title: null,
    content: null,
    taskType: 0,
    op: 0,
    opId: 0,
    beginAt: null,
    endAt: null,
    reminderTime: null,
    status: 0,
    reminderStatus: 0,
  })
});

/** 自定义表单规则校验 */
const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "名称为必填项", trigger: "blur" }]
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
  <el-form-item label="任务标题" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入任务标题"
      />
    </el-form-item>
  <el-form-item label="任务内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入任务内容"
      />
    </el-form-item>
  <el-form-item label="任务类型" prop="taskType">
      <el-input
        v-model.number="newFormInline.taskType"
        clearable
        placeholder="请输入任务类型"
      />
    </el-form-item>
  <el-form-item label="操作类型" prop="op">
      <el-input
        v-model.number="newFormInline.op"
        clearable
        placeholder="请输入操作类型"
      />
    </el-form-item>
  <el-form-item label="操作id" prop="opId">
      <el-input
        v-model.number="newFormInline.opId"
        clearable
        placeholder="请输入操作id"
      />
    </el-form-item>
  <el-form-item label="开始时间" prop="beginAt">
      <el-input
        v-model="newFormInline.beginAt"
        clearable
        placeholder="请输入开始时间"
      />
    </el-form-item>
  <el-form-item label="结束时间" prop="endAt">
      <el-input
        v-model="newFormInline.endAt"
        clearable
        placeholder="请输入结束时间"
      />
    </el-form-item>
  <el-form-item label="提醒时间" prop="reminderTime">
      <el-input
        v-model="newFormInline.reminderTime"
        clearable
        placeholder="请输入提醒时间"
      />
    </el-form-item>
  <el-form-item label="状态1开启2关闭" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态1开启2关闭"
      />
    </el-form-item>
  <el-form-item label="提醒状态 1开启 2关闭" prop="reminderStatus">
      <el-input
        v-model.number="newFormInline.reminderStatus"
        clearable
        placeholder="请输入提醒状态 1开启 2关闭"
      />
    </el-form-item>
  
  
  
  
  </el-form>
</template>
