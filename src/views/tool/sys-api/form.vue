<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysApiFormProps } from "@/api/sys/sys-api";

const props = withDefaults(defineProps<SysApiFormProps>(), {
  formInline: () => ({
    id: 0,
    title: null,
    method: null,
    path: null,
    permType: 0,
    status: 0,
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
  <el-form-item label="主键编码" prop="id">
      <el-input
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键编码"
      />
    </el-form-item>
  <el-form-item label="标题" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入标题"
      />
    </el-form-item>
  <el-form-item label="请求类型" prop="method">
      <el-input
        v-model="newFormInline.method"
        clearable
        placeholder="请输入请求类型"
      />
    </el-form-item>
  <el-form-item label="请求地址" prop="path">
      <el-input
        v-model="newFormInline.path"
        clearable
        placeholder="请输入请求地址"
      />
    </el-form-item>
  <el-form-item label="权限类型（1：无需认证 2:须token 3：须鉴权）" prop="permType">
      <el-input
        v-model.number="newFormInline.permType"
        clearable
        placeholder="请输入权限类型（1：无需认证 2:须token 3：须鉴权）"
      />
    </el-form-item>
  <el-form-item label="状态 3 DEF 2 OK 1 del" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态 3 DEF 2 OK 1 del"
      />
    </el-form-item>
  
  
  
  </el-form>
</template>
