<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysDeptFormProps } from "@/api/sys/sys-dept";

const props = withDefaults(defineProps<SysDeptFormProps>(), {
  formInline: () => ({
    id: 0,
    parentId: 0,
    deptPath: null,
    name: null,
    type: 0,
    principal: null,
    phone: null,
    email: null,
    sort: 0,
    status: 0,
    remark: null,
    teamId: 0
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
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item>
    <el-form-item label="父id" prop="parentId">
      <el-input
        v-model.number="newFormInline.parentId"
        clearable
        placeholder="请输入父id"
      />
    </el-form-item>
    <el-form-item label="部门路径" prop="deptPath">
      <el-input
        v-model="newFormInline.deptPath"
        clearable
        placeholder="请输入部门路径"
      />
    </el-form-item>
    <el-form-item label="部门名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入部门名"
      />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input
        v-model.number="newFormInline.type"
        clearable
        placeholder="请输入类型"
      />
    </el-form-item>
    <el-form-item label="部门领导" prop="principal">
      <el-input
        v-model="newFormInline.principal"
        clearable
        placeholder="请输入部门领导"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入邮箱"
      />
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input
        v-model.number="newFormInline.sort"
        clearable
        placeholder="请输入排序"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="团队id" prop="teamId">
      <el-input
        v-model.number="newFormInline.teamId"
        clearable
        placeholder="请输入团队id"
      />
    </el-form-item>
  </el-form>
</template>
