<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysOperaLogFormProps } from "@/api/sys/sys-opera-log";

const props = withDefaults(defineProps<SysOperaLogFormProps>(), {
  formInline: () => ({
    id: 0,
    title: null,
    businessType: null,
    businessTypes: null,
    method: null,
    requestMethod: null,
    operatorType: null,
    operName: null,
    deptName: null,
    operUrl: null,
    operIp: null,
    operLocation: null,
    operParam: null,
    status: 0,
    operTime: null,
    jsonResult: null,
    remark: null,
    latencyTime: null,
    userAgent: null
  })
});

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
        clearable
        placeholder="请输入主键"
      />
    </el-form-item>
    <el-form-item label="操作模块" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入操作模块"
      />
    </el-form-item>
    <el-form-item label="操作类型" prop="businessType">
      <el-input
        v-model="newFormInline.businessType"
        clearable
        placeholder="请输入操作类型"
      />
    </el-form-item>
    <el-form-item label="BusinessTypes" prop="businessTypes">
      <el-input
        v-model="newFormInline.businessTypes"
        clearable
        placeholder="请输入BusinessTypes"
      />
    </el-form-item>
    <el-form-item label="函数" prop="method">
      <el-input
        v-model="newFormInline.method"
        clearable
        placeholder="请输入函数"
      />
    </el-form-item>
    <el-form-item label="请求方式 GET POST PUT DELETE" prop="requestMethod">
      <el-input
        v-model="newFormInline.requestMethod"
        clearable
        placeholder="请输入请求方式 GET POST PUT DELETE"
      />
    </el-form-item>
    <el-form-item label="操作类型" prop="operatorType">
      <el-input
        v-model="newFormInline.operatorType"
        clearable
        placeholder="请输入操作类型"
      />
    </el-form-item>
    <el-form-item label="操作者" prop="operName">
      <el-input
        v-model="newFormInline.operName"
        clearable
        placeholder="请输入操作者"
      />
    </el-form-item>
    <el-form-item label="部门名称" prop="deptName">
      <el-input
        v-model="newFormInline.deptName"
        clearable
        placeholder="请输入部门名称"
      />
    </el-form-item>
    <el-form-item label="访问地址" prop="operUrl">
      <el-input
        v-model="newFormInline.operUrl"
        clearable
        placeholder="请输入访问地址"
      />
    </el-form-item>
    <el-form-item label="客户端ip" prop="operIp">
      <el-input
        v-model="newFormInline.operIp"
        clearable
        placeholder="请输入客户端ip"
      />
    </el-form-item>
    <el-form-item label="访问位置" prop="operLocation">
      <el-input
        v-model="newFormInline.operLocation"
        clearable
        placeholder="请输入访问位置"
      />
    </el-form-item>
    <el-form-item label="请求参数" prop="operParam">
      <el-input
        v-model="newFormInline.operParam"
        clearable
        placeholder="请输入请求参数"
      />
    </el-form-item>
    <el-form-item label="操作状态 1:成功 2:失败" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入操作状态 1:成功 2:失败"
      />
    </el-form-item>
    <el-form-item label="操作时间" prop="operTime">
      <el-input
        v-model="newFormInline.operTime"
        clearable
        placeholder="请输入操作时间"
      />
    </el-form-item>
    <el-form-item label="返回数据" prop="jsonResult">
      <el-input
        v-model="newFormInline.jsonResult"
        clearable
        placeholder="请输入返回数据"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="耗时" prop="latencyTime">
      <el-input
        v-model="newFormInline.latencyTime"
        clearable
        placeholder="请输入耗时"
      />
    </el-form-item>
    <el-form-item label="ua" prop="userAgent">
      <el-input
        v-model="newFormInline.userAgent"
        clearable
        placeholder="请输入ua"
      />
    </el-form-item>
  </el-form>
</template>
