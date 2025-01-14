<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { EventDayStFormProps } from "@/api/dental/event-day-st";
import { useEventDaySt } from "./utils/hook";

const props = withDefaults(defineProps<EventDayStFormProps>(), {
  formInline: () => ({
    id: 0,
    day: null,
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

const { switchStyle, members } = useEventDaySt();

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
     <el-form-item label="复查" prop="recheck">
      <el-input
        v-model.number="newFormInline.recheck"
        clearable
        placeholder="复查"
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
        :active-value="1"
        :inactive-value="2"
        active-text="正常"
        inactive-text="休息"
        inline-prompt
        :style="switchStyle"
      />
    </el-form-item>
  </el-form>
</template>
