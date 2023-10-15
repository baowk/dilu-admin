<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { EventDayStFormProps } from "@/api/dental/event-day-st";

const props = withDefaults(defineProps<EventDayStFormProps>(), {
  formInline: () => ({
    id: 0,
    day: new Date(),
    teamId: 0,
    userId: 0,
    deptPath: null,
    newCustomerCnt: 0,
    firstDiagnosis: 0,
    furtherDiagnosis: 0,
    deal: 0,
    invitation: 0,
    rest: 1
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
    <el-form-item label="时间" prop="day">
      <el-date-picker
        v-model="newFormInline.day"
        type="date"
        placeholder="Pick a day"
        format="YYYY-MM-DD"
        value-format="YYYYMMDD"
      />
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input
        v-model.number="newFormInline.userId"
        clearable
        placeholder="请输入用户id"
      />
    </el-form-item>
    <el-form-item label="留存" prop="newCustomerCnt">
      <el-input
        v-model.number="newFormInline.newCustomerCnt"
        clearable
        placeholder="请输入留存"
      />
    </el-form-item>
    <el-form-item label="初诊" prop="firstDiagnosis">
      <el-input
        v-model.number="newFormInline.firstDiagnosis"
        clearable
        placeholder="请输入初诊"
      />
    </el-form-item>
    <el-form-item label="复诊" prop="furtherDiagnosis">
      <el-input
        v-model.number="newFormInline.furtherDiagnosis"
        clearable
        placeholder="请输入复诊"
      />
    </el-form-item>
    <el-form-item label="成交" prop="deal">
      <el-input
        v-model.number="newFormInline.deal"
        clearable
        placeholder="请输入成交"
      />
    </el-form-item>
    <el-form-item label="明日邀约" prop="invitation">
      <el-input
        v-model.number="newFormInline.invitation"
        clearable
        placeholder="请输入明日邀约"
      />
    </el-form-item>
    <el-form-item label="休息" prop="rest">
      <el-switch
        v-model="newFormInline.rest"
        inline-prompt
        :active-value="1"
        :inactive-value="2"
        active-text="上班"
        inactive-text="休息"
      />
    </el-form-item>
  </el-form>
</template>
