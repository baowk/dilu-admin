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
  brandOptions,
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
        v-model.number="newFormInline.customerName"
        clearable
        placeholder="请输入顾客"
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
    <!-- <el-form-item label="关联订单" prop="linkId">
      <el-input
        v-model.number="newFormInline.linkId"
        clearable
        placeholder="请输入关联订单"
      />
    </el-form-item> -->

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
    <el-form-item label="品牌" prop="brandName">
      <el-select
        v-model="newFormInline.brand"
        placeholder="请选择品牌"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in brandOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="颗数" prop="dentalCount">
      <el-input
        v-model.number="newFormInline.dentalCount"
        clearable
        placeholder="请输入颗数"
      />
    </el-form-item>

    <el-form-item label="已种颗数" prop="implantedCount">
      <el-input
        v-model.number="newFormInline.implantedCount"
        clearable
        placeholder="请输入已种颗数"
      />
    </el-form-item>
    <!-- <el-form-item label="种植类型" prop="implant">
      <el-select
        v-model="newFormInline.implant"
        placeholder="选择种植类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in impactOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="植入日期" prop="implantDate">
      <el-input
        v-model="newFormInline.implantDate"
        clearable
        placeholder="请输入植入日期"
      />
    </el-form-item> -->
    <el-form-item label="医生" prop="doctor">
      <el-input
        v-model="newFormInline.doctor"
        clearable
        placeholder="请输入医生"
      />
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
    <!-- <el-form-item label="预回款日期" prop="paybackDate">
      <el-input
        v-model="newFormInline.paybackDate"
        clearable
        placeholder="请输入预定回款日期"
      />
    </el-form-item> -->
    <el-form-item label="标签" prop="tags">
      <el-input
        v-model="newFormInline.tags"
        clearable
        placeholder="请输入标签"
      />
    </el-form-item>
    <!-- <el-form-item label="项目" prop="prjName">
      <el-input
        v-model="newFormInline.prjName"
        clearable
        placeholder="请输入项目"
      />
    </el-form-item> -->
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
