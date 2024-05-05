<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";

import {
  type BillFormItemProps,
  identify,
  BillFormProps
} from "@/api/dental/bill";
import { message } from "@/utils/message";

import { useBill } from "./utils/hook";

const props = withDefaults(defineProps<BillFormProps>(), {
  formInline: () => ({
    id: 0,
    no: null,
    customerId: null,
    customerName: null,
    customers: [],
    userId: null,
    name: null,
    teamId: 0,
    deptPath: null,
    amount: null,
    realAmount: null,
    paidAmount: null,
    linkId: 0,
    tradeAt: new Date(),
    tradeType: 1,
    dentalCount: 0,
    brand: 1,
    brandName: null,
    implantedCount: 0,
    implant: null,
    implantDate: null,
    doctor: null,
    pack: null,
    paybackDate: null,
    tags: null,
    prjName: null,
    otherPrj: null,
    remark: null
  })
});

const {
  packOptions,
  sourceOptions,
  diagnosisOptions,
  tradeOptions,
  impactOptions,
  identifyText,
  members
} = useBill();

function handleIdentify(text) {
  identify({ text: text }).then(res => {
    if (res.code == 200) {
      for (let key in props.formInline) {
        props.formInline[key] = res.data[key];
      }
      props.formInline.customerName = res.data.customerName;
      console.log(
        props.formInline.customerId,
        props.formInline.customerName,
        res.data.customerName
      );
    } else {
      message(`识别失败`, { type: "error" });
    }
  });
}

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
    label-width="102px"
  >
    <div v-if="newFormInline.id < 1">
      <el-form-item label="智能识别" prop="text">
        <el-input
          v-model="identifyText"
          clearable
          placeholder="请输入成交模板"
          type="textarea"
          :rows="6"
        />
        <el-button type="primary" @click="handleIdentify(identifyText)"
          >识别</el-button
        >
      </el-form-item>
    </div>
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
    <el-form-item label="成交日期" prop="tradeAt">
      <el-date-picker
        v-model="newFormInline.tradeAt"
        type="date"
        placeholder="选择成交日期"
      />
    </el-form-item>
    <el-form-item label="顾客" prop="customerName">
      <el-input
        v-model="newFormInline.customerName"
        clearable
        placeholder="请输入顾客姓名"
      />
    </el-form-item>

    <el-form-item label="折后金额" prop="realAmount">
      <el-input
        v-model="newFormInline.realAmount"
        clearable
        placeholder="请输入折后金额"
      />
    </el-form-item>
    <el-form-item label="已付金额" prop="paidAmount">
      <el-input
        v-model="newFormInline.paidAmount"
        clearable
        placeholder="请输入已付金额"
      />
    </el-form-item>

    <el-form-item label="交易类型" prop="tradeType">
      <el-select
        v-model="newFormInline.tradeType"
        placeholder="请选择交易类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in tradeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="全半口" prop="pack">
      <el-select
        v-model="newFormInline.pack"
        placeholder="请选择项目"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in packOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="奥齿泰" prop="brand1">
      <el-input
        v-model.number="newFormInline.brand1"
        clearable
        placeholder="种植颗数"
      />
      <el-input
        v-model.number="newFormInline.brand1Impl"
        clearable
        placeholder="已种颗数"
      />
    </el-form-item>

    <el-form-item label="皓圣" prop="brand2">
      <el-input
        v-model.number="newFormInline.brand2"
        clearable
        placeholder="种植颗数"
      />
      <el-input
        v-model.number="newFormInline.brand2Impl"
        clearable
        placeholder="已种颗数"
      />
    </el-form-item>

    <el-form-item label="雅定" prop="brand3">
      <el-input
        v-model.number="newFormInline.brand3"
        clearable
        placeholder="种植颗数"
      />
      <el-input
        v-model.number="newFormInline.brand3Impl"
        clearable
        placeholder="已种颗数"
      />
    </el-form-item>

    <el-form-item label="ITI" prop="brand4">
      <el-input
        v-model.number="newFormInline.brand4"
        clearable
        placeholder="种植颗数"
      />
      <el-input
        v-model.number="newFormInline.brand4Impl"
        clearable
        placeholder="已种颗数"
      />
    </el-form-item>

    <el-form-item label="诺贝尔" prop="brand5">
      <el-input
        v-model.number="newFormInline.brand5"
        clearable
        placeholder="种植颗数"
      />
      <el-input
        v-model.number="newFormInline.brand5Impl"
        clearable
        placeholder="已种颗数"
      />
    </el-form-item>

    <el-form-item label="来源" prop="source">
      <el-select
        v-model="newFormInline.source"
        placeholder="请选择来源"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in sourceOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="出诊类型" prop="diagnosisType">
      <el-select
        v-model="newFormInline.diagnosisType"
        placeholder="请选择出诊类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in diagnosisOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="医生" prop="doctor">
      <el-input
        v-model="newFormInline.doctor"
        clearable
        placeholder="请输入医生"
      />
    </el-form-item>

    <el-form-item label="标签" prop="tags">
      <el-input
        v-model="newFormInline.tags"
        clearable
        placeholder="请输入标签"
      />
    </el-form-item>

    <el-form-item label="全科项目" prop="otherPrj">
      <el-input
        v-model="newFormInline.otherPrj"
        clearable
        placeholder="请输入全科项目"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
  </el-form>
</template>
