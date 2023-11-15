<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysRoleFormProps } from "@/api/sys/sys-role";

const props = withDefaults(defineProps<SysRoleFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null,
    roleKey: null,
    status: 0,
    roleSort: 0,
    remark: null,
    menuIds: null,
    teamId: null,
    higherDeptOptions: []
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
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>

    <el-form-item label="授权菜单" prop="menuIds">
      <el-tree
        :data="newFormInline.higherDeptOptions"
        v-model="newFormInline.menuIds"
        node-key="id"
        show-checkbox
        :default-expanded-keys="newFormInline.menuIds"
        :default-checked-keys="newFormInline.menuIds"
        :props="{
          label: 'title'
        }"
      >
      </el-tree>
    </el-form-item>
  </el-form>
</template>
