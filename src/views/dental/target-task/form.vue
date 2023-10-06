<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { TargetTaskFormProps } from "@/api/dental/target-task";

const props = withDefaults(defineProps<TargetTaskFormProps>(), {
  formInline: () => ({
    id: 0,
    dayType: 0,
    day: 0,
    teamId: 0,
    userId: 0,
    deptPath: null,
    newCustomerCnt: 0,
    firstDiagnosis: 0,
    deal: 0
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
    <el-form-item label="时间类型:月 30,周 7" prop="dayType">
      <el-input
        v-model.number="newFormInline.dayType"
        clearable
        placeholder="请输入时间类型:月 30,周 7"
      />
    </el-form-item>
    <el-form-item label="时间:202310" prop="day">
      <el-input
        v-model.number="newFormInline.day"
        clearable
        placeholder="请输入时间:202310"
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
    <el-form-item label="留存任务" prop="newCustomerCnt">
      <el-input
        v-model.number="newFormInline.newCustomerCnt"
        clearable
        placeholder="请输入留存任务"
      />
    </el-form-item>
    <el-form-item label="导诊任务" prop="firstDiagnosis">
      <el-input
        v-model.number="newFormInline.firstDiagnosis"
        clearable
        placeholder="请输入导诊任务"
      />
    </el-form-item>
    <el-form-item label="成交任务" prop="deal">
      <el-input
        v-model.number="newFormInline.deal"
        clearable
        placeholder="请输入成交任务"
      />
    </el-form-item>
  </el-form>
</template>
