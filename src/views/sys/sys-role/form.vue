<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysRoleFormProps } from "@/api/sys/sys-role";

const props = withDefaults(defineProps<SysRoleFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null,
    status: 0,
    roleKey: null,
    roleSort: 0,
    flag: null,
    remark: null,
    admin: 0,
    dataScope: null
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
    <el-form-item label="角色名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入角色名称"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
    <el-form-item label="角色代码" prop="roleKey">
      <el-input
        v-model="newFormInline.roleKey"
        clearable
        placeholder="请输入角色代码"
      />
    </el-form-item>
    <el-form-item label="排序" prop="roleSort">
      <el-input
        v-model.number="newFormInline.roleSort"
        clearable
        placeholder="请输入排序"
      />
    </el-form-item>
    <el-form-item label="flag" prop="flag">
      <el-input
        v-model="newFormInline.flag"
        clearable
        placeholder="请输入flag"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="管理员" prop="admin">
      <el-input
        v-model.number="newFormInline.admin"
        clearable
        placeholder="请输入管理员"
      />
    </el-form-item>
    <el-form-item label="数据权限" prop="dataScope">
      <el-input
        v-model="newFormInline.dataScope"
        clearable
        placeholder="请输入数据权限"
      />
    </el-form-item>
  </el-form>
</template>
