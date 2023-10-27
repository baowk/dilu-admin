<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { TargetTaskFormProps } from "@/api/dental/target-task";
import { useTargetTask } from "./utils/hook";

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
  name: [{ required: true, message: "名称为必填项", trigger: "blur" }]
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

const { taskOptions, members } = useTargetTask();

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
    <el-form-item label="时间类型" prop="dayType">
      <el-select
        v-model="newFormInline.dayType"
        placeholder="请输入时间类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in taskOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="时间" prop="day">
      <el-input
        v-model.number="newFormInline.day"
        clearable
        placeholder="请输入时间"
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
