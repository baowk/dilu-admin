<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SummaryPlanDayFormProps } from "@/api/dental/summary-plan-day";

import { useSummaryPlanDay } from "./utils/hook";

const props = withDefaults(defineProps<SummaryPlanDayFormProps>(), {
  formInline: () => ({
    id: 0,
    day: null,
    teamId: 0,
    userId: null,
    deptPath: null,
    summary: null,
    plan: null
  })
});

const { members } = useSummaryPlanDay();
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
    <!-- <el-form-item label="主键" prop="id">
      <el-input
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item> -->
    <el-form-item label="天" prop="day">
      <el-date-picker
        v-model="newFormInline.day"
        type="date"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="咨询师" prop="userId">
      <el-select
        v-model="newFormInline.userId"
        placeholder="请选择咨询师"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in members"
          :key="index"
          :label="item.name"
          :value="item.userId"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="今日总结" prop="summary">
      <el-input
        v-model="newFormInline.summary"
        clearable
        placeholder="请输入今日总结"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="明日计划" prop="plan">
      <el-input
        v-model="newFormInline.plan"
        clearable
        placeholder="请输入明日计划"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
  </el-form>
</template>
