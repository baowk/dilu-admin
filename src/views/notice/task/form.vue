<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { TaskFormProps } from "@/api/notice/task";
import { useTask } from "./utils/hook";

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
    reminderStatus: 0
  })
});

const { statusOptions, reminderStatusOptions } = useTask();

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
        placeholder="请输入主键"
        disabled
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
        type="textarea"
        :rows="4"
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
      <el-date-picker
        v-model="newFormInline.beginAt"
        type="datetime"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="结束时间" prop="endAt">
      <el-date-picker
        v-model="newFormInline.endAt"
        type="datetime"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="提醒时间" prop="reminderTime">
      <el-date-picker
        v-model="newFormInline.reminderTime"
        type="datetime"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in statusOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="提醒状态" prop="reminderStatus">
      <el-select
        v-model="newFormInline.reminderStatus"
        placeholder="请选择提醒状态"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in reminderStatusOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
