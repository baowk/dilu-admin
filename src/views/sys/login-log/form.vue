<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { LoginLogFormProps } from "@/api/sys/login-log";

const props = withDefaults(defineProps<LoginLogFormProps>(), {
  formInline: () => ({
    id: null,
    uid: null,
    method: null,
    ip: null,
    region: null,
    clientId: null,
    clientVer: null,
    os: null,
    osVer: null,
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
  <el-form-item label="id" prop="id">
      <el-input
        v-model="newFormInline.id"
        clearable
        placeholder="请输入id"
      />
    </el-form-item>
  <el-form-item label="用户id" prop="uid">
      <el-input
        v-model="newFormInline.uid"
        clearable
        placeholder="请输入用户id"
      />
    </el-form-item>
  <el-form-item label="登录方式" prop="method">
      <el-input
        v-model="newFormInline.method"
        clearable
        placeholder="请输入登录方式"
      />
    </el-form-item>
  <el-form-item label="登录ip" prop="ip">
      <el-input
        v-model="newFormInline.ip"
        clearable
        placeholder="请输入登录ip"
      />
    </el-form-item>
  <el-form-item label="地域" prop="region">
      <el-input
        v-model="newFormInline.region"
        clearable
        placeholder="请输入地域"
      />
    </el-form-item>
  <el-form-item label="客户端" prop="clientId">
      <el-input
        v-model="newFormInline.clientId"
        clearable
        placeholder="请输入客户端"
      />
    </el-form-item>
  <el-form-item label="操作系统" prop="clientVer">
      <el-input
        v-model="newFormInline.clientVer"
        clearable
        placeholder="请输入操作系统"
      />
    </el-form-item>
  <el-form-item label="操作系统" prop="os">
      <el-input
        v-model="newFormInline.os"
        clearable
        placeholder="请输入操作系统"
      />
    </el-form-item>
  <el-form-item label="操作系统版本" prop="osVer">
      <el-input
        v-model="newFormInline.osVer"
        clearable
        placeholder="请输入操作系统版本"
      />
    </el-form-item>
  
  
  </el-form>
</template>
