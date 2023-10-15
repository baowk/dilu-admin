<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { BillFormProps } from "@/api/dental/bill";
import { message } from "@/utils/message";
import { identify } from "@/api/dental/bill";

const props = withDefaults(defineProps<BillFormProps>(), {
  formInline: () => ({
    text: null,
    id: 0,
    no: null,
    customerId: 0,
    customerName: null,
    userId: 0,
    name: null,
    teamId: 0,
    deptPath: null,
    total: null,
    realTotal: null,
    paidTotal: null,
    linkId: 0,
    tradeAt: null,
    tradeStatus: 0,
    dentalCount: 0,
    brand: 0,
    brandName: null,
    implantedCount: 0,
    implant: 0,
    implantDate: null,
    doctor: null,
    pack: 0,
    paybackDate: null,
    tags: null,
    prjName: null,
    otherPrj: null,
    remark: null
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

function handleIdentify() {
  let t = newFormInline.value.text;
  identify({ text: t }).then(res => {
    if (res.code == 200) {
      newFormInline.value = res.data;
      newFormInline.value.text = t;
    } else {
      message(`识别失败`, { type: "error" });
    }
  });
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
    <el-form-item label="智能识别" prop="text">
      <el-input
        v-model.number="newFormInline.text"
        clearable
        placeholder="请输入成交模板"
        type="textarea"
        :rows="6"
      />
      <el-button type="primary" @click="handleIdentify()">识别</el-button>
    </el-form-item>

    <!-- <el-form-item label="订单号" prop="no">
      <el-input
        v-model="newFormInline.no"
        clearable
        placeholder="请输入订单号"
      />
    </el-form-item> -->
    <el-form-item label="咨询师" prop="name">
      <el-input
        v-model.number="newFormInline.name"
        clearable
        placeholder="请输入咨询师"
      />
    </el-form-item>
    <el-form-item label="交易日期" prop="tradeAt">
      <el-input
        v-model="newFormInline.tradeAt"
        clearable
        placeholder="请输入交易日期"
      />
    </el-form-item>
    <el-form-item label="顾客" prop="customerName">
      <el-input
        v-model.number="newFormInline.customerName"
        clearable
        placeholder="请输入顾客"
      />
    </el-form-item>

    <!-- <el-form-item label="金额" prop="total">
      <el-input
        v-model="newFormInline.total"
        clearable
        placeholder="请输入金额"
      />
    </el-form-item> -->
    <el-form-item label="折后金额" prop="realTotal">
      <el-input
        v-model="newFormInline.realTotal"
        clearable
        placeholder="请输入折后金额"
      />
    </el-form-item>
    <el-form-item label="已支付金额" prop="paidTotal">
      <el-input
        v-model="newFormInline.paidTotal"
        clearable
        placeholder="请输入已支付金额"
      />
    </el-form-item>
    <el-form-item label="关联订单" prop="linkId">
      <el-input
        v-model.number="newFormInline.linkId"
        clearable
        placeholder="请输入关联订单"
      />
    </el-form-item>

    <el-form-item label="交易类型" prop="tradeStatus">
      <el-input
        v-model.number="newFormInline.tradeStatus"
        clearable
        placeholder="请输入交易类型1 成交 2补尾款  3补上月欠款 10退款"
      />
    </el-form-item>
    <el-form-item label="颗数" prop="dentalCount">
      <el-input
        v-model.number="newFormInline.dentalCount"
        clearable
        placeholder="请输入颗数"
      />
    </el-form-item>
    <el-form-item label="品牌" prop="brandName">
      <el-input
        v-model.number="newFormInline.brandName"
        clearable
        placeholder="请输入品牌"
      />
    </el-form-item>
    <el-form-item label="已种颗数" prop="implantedCount">
      <el-input
        v-model.number="newFormInline.implantedCount"
        clearable
        placeholder="请输入已种颗数"
      />
    </el-form-item>
    <el-form-item label="是否已种" prop="implant">
      <el-input
        v-model.number="newFormInline.implant"
        clearable
        placeholder="请输入是否已种"
      />
    </el-form-item>
    <el-form-item label="植入日期" prop="implantDate">
      <el-input
        v-model="newFormInline.implantDate"
        clearable
        placeholder="请输入植入日期"
      />
    </el-form-item>
    <el-form-item label="医生" prop="doctor">
      <el-input
        v-model="newFormInline.doctor"
        clearable
        placeholder="请输入医生"
      />
    </el-form-item>
    <el-form-item label="全半口" prop="pack">
      <el-input
        v-model.number="newFormInline.pack"
        clearable
        placeholder="请输入1 普通 2 半口 3 全口"
      />
    </el-form-item>
    <el-form-item label="预回款日期" prop="paybackDate">
      <el-input
        v-model="newFormInline.paybackDate"
        clearable
        placeholder="请输入预定回款日期"
      />
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <el-input
        v-model="newFormInline.tags"
        clearable
        placeholder="请输入标签"
      />
    </el-form-item>
    <el-form-item label="项目" prop="prjName">
      <el-input
        v-model="newFormInline.prjName"
        clearable
        placeholder="请输入项目"
      />
    </el-form-item>
    <el-form-item label="其他项目" prop="otherPrj">
      <el-input
        v-model="newFormInline.otherPrj"
        clearable
        placeholder="请输入其他项目"
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
