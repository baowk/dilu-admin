<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SummaryPlanDayFormProps } from "@/api/dental/summary-plan-day";

const props = withDefaults(defineProps<SummaryPlanDayFormProps>(), {
  formInline: () => ({
    id: 0,
    day: 0,
    teamId: 0,
    userId: 0,
    deptPath: null,
    summary: null,
    plan: null
  })
});

/** 自定义表单规则校验 */
const formRules = reactive(<FormRules>{
  //name: [{ required: true, message: "名称为必填项", trigger: "blur" }]
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
    <el-form-item label="天" prop="day">
      <el-input
        v-model.number="newFormInline.day"
        clearable
        placeholder="请输入天"
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
    <el-form-item label="部门路径" prop="deptPath">
      <el-input
        v-model="newFormInline.deptPath"
        clearable
        placeholder="请输入部门路径"
      />
    </el-form-item>
    <el-form-item label="今日总结" prop="summary">
      <el-input
        v-model="newFormInline.summary"
        clearable
        placeholder="请输入今日总结"
      />
    </el-form-item>
    <el-form-item label="明日计划" prop="plan">
      <el-input
        v-model="newFormInline.plan"
        clearable
        placeholder="请输入明日计划"
      />
    </el-form-item>
  </el-form>
</template>
