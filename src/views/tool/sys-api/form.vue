<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysApiFormProps } from "@/api/tool/sys-api";

const props = withDefaults(defineProps<SysApiFormProps>(), {
  formInline: () => ({
    id: 0,
    title: null,
    method: null,
    path: null,
    permType: 0,
    status: null
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
    label-width="120px"
  >
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
    <el-form-item label="权限类型" prop="permType">
      <el-select
        class="w-full"
        v-model="newFormInline.permType"
        placeholder="请选择"
      >
        <el-option label="无需认证" :value="1" />
        <el-option label="须token" :value="2" />
        <el-option label=" 须鉴权" :value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态 " prop="status">
      <el-select
        class="w-full"
        v-model="newFormInline.status"
        placeholder="请选择"
      >
        <el-option label="del" :value="1" />
        <el-option label="OK" :value="2" />
        <el-option label=" DEF" :value="3" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
