<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysTeamFormProps } from "@/api/sys/sys-team";

const props = withDefaults(defineProps<SysTeamFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null,
    owner: 0,
    status: 0
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
        :disabled="true"
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item>
    <el-form-item label="团队名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入团队名"
      />
    </el-form-item>
    <el-form-item label="团队拥有者" prop="owner">
      <el-input
        v-model.number="newFormInline.owner"
        clearable
        placeholder="请输入团队拥有者"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
  </el-form>
</template>
