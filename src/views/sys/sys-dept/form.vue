<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysDeptFormProps } from "@/api/sys/sys-dept";

import { usePublicHooks } from "@/utils/hooks";

const props = withDefaults(defineProps<SysDeptFormProps>(), {
  formInline: () => ({
    higherDeptOptions: [],
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

const { switchStyle } = usePublicHooks();

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
    <el-form-item label="上级部门" prop="parentId">
      <el-cascader
        class="w-full"
        v-model="newFormInline.parentId"
        :options="newFormInline.higherDeptOptions"
        :props="{
          value: 'id',
          label: 'name',
          emitPath: false,
          checkStrictly: true
        }"
        clearable
        filterable
        placeholder="请选择上级部门"
      >
        <template #default="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </el-form-item>
    <el-form-item label="部门名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入部门名"
      />
    </el-form-item>
    <el-form-item label="部门类型">
      <el-switch
        v-model="newFormInline.type"
        inline-prompt
        :active-value="1"
        :inactive-value="2"
        active-text="分公司"
        inactive-text="部门"
        :style="switchStyle"
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
    <el-form-item label="部门状态">
      <el-switch
        v-model="newFormInline.status"
        inline-prompt
        :active-value="1"
        :inactive-value="2"
        active-text="启用"
        inactive-text="停用"
        :style="switchStyle"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
