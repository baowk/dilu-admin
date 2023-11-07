<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysCfgFormProps } from "@/api/sys/sys-cfg";

const props = withDefaults(defineProps<SysCfgFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null,
    key: null,
    value: null,
    type: null,
    remark: null,
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
  <el-form-item label="名字" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入名字"
      />
    </el-form-item>
  <el-form-item label="key" prop="key">
      <el-input
        v-model="newFormInline.key"
        clearable
        placeholder="请输入key"
      />
    </el-form-item>
  <el-form-item label="Value" prop="value">
      <el-input
        v-model="newFormInline.value"
        clearable
        placeholder="请输入Value"
      />
    </el-form-item>
  <el-form-item label="Type" prop="type">
      <el-input
        v-model="newFormInline.type"
        clearable
        placeholder="请输入Type"
      />
    </el-form-item>
  <el-form-item label="Remark" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入Remark"
      />
    </el-form-item>
  <el-form-item label="Status" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入Status"
      />
    </el-form-item>
  
  
  
  </el-form>
</template>
