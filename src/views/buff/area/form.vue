<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { AreaFormProps } from "@/api/buff/area";

const props = withDefaults(defineProps<AreaFormProps>(), {
  formInline: () => ({
    id: null,
    code: null,
    name: null,
    cname: null,
    pid: null,
    level: null,
    status: null,
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
        v-model="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item>
  <el-form-item label="编码" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入编码"
      />
    </el-form-item>
  <el-form-item label="名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入名称"
      />
    </el-form-item>
  <el-form-item label="中文名" prop="cname">
      <el-input
        v-model="newFormInline.cname"
        clearable
        placeholder="请输入中文名"
      />
    </el-form-item>
  <el-form-item label="父级" prop="pid">
      <el-input
        v-model="newFormInline.pid"
        clearable
        placeholder="请输入父级"
      />
    </el-form-item>
  <el-form-item label="层级" prop="level">
      <el-input
        v-model="newFormInline.level"
        clearable
        placeholder="请输入层级"
      />
    </el-form-item>
  <el-form-item label="状态：3 正常 1 待审核 -1 弃用" prop="status">
      <el-input
        v-model="newFormInline.status"
        clearable
        placeholder="请输入状态：3 正常 1 待审核 -1 弃用"
      />
    </el-form-item>
  
  
  
  </el-form>
</template>
