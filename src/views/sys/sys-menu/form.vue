<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysMenuFormProps } from "@/api/sys/sys-menu";

import { useSysMenu } from "./utils/hook";

const props = withDefaults(defineProps<SysMenuFormProps>(), {
  formInline: () => ({
    higherDeptOptions: [],
    id: 0,
    menuName: null,
    title: null,
    icon: null,
    path: null,
    platformType: null,
    menuType: 0,
    permission: null,
    parentId: 0,
    noCache: 0,
    component: null,
    sort: 0,
    hidden: 0
  })
});

/** 自定义表单规则校验 */
const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "名称为必填项", trigger: "blur" }]
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

const { platformOptions, menuOptions } = useSysMenu();

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
    label-width="102px"
  >
    <el-form-item label="上级菜单" prop="parentId">
      <el-cascader
        class="w-full"
        v-model="newFormInline.parentId"
        :options="newFormInline.higherDeptOptions"
        :props="{
          value: 'id',
          label: 'title',
          emitPath: false,
          checkStrictly: true
        }"
        clearable
        filterable
        placeholder="请选择上级部门"
      >
        <template #default="{ node, data }">
          <span>{{ data.title }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </el-form-item>
    <el-form-item label="菜单名" prop="menuName">
      <el-input
        v-model="newFormInline.menuName"
        clearable
        placeholder="请输入菜单名"
      />
    </el-form-item>
    <el-form-item label="显示名称" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入显示名称"
      />
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input
        v-model="newFormInline.icon"
        clearable
        placeholder="请输入图标"
      />
    </el-form-item>
    <el-form-item label="路径" prop="path">
      <el-input
        v-model="newFormInline.path"
        clearable
        placeholder="请输入路径"
      />
    </el-form-item>
    <el-form-item label="平台类型" prop="paths">
      <el-select
        v-model="newFormInline.platformType"
        placeholder="请选择平台类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in platformOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="菜单类型" prop="menuType">
      <el-select
        v-model="newFormInline.menuType"
        placeholder="请选择菜单类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in menuOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="权限" prop="permission">
      <el-input
        v-model="newFormInline.permission"
        clearable
        placeholder="请输入权限"
      />
    </el-form-item>
    <el-form-item label="是否缓存" prop="noCache">
      <el-switch
        v-model="newFormInline.noCache"
        :active-value="1"
        :inactive-value="2"
        active-text="是"
        inactive-text="否"
        inline-prompt
      />
    </el-form-item>
    <el-form-item label="前端组件路径" prop="component">
      <el-input
        v-model="newFormInline.component"
        clearable
        placeholder="请输入前端组件路径"
      />
    </el-form-item>
    <el-form-item label="排序倒叙" prop="sort">
      <el-input
        v-model.number="newFormInline.sort"
        clearable
        placeholder="请输入排序倒叙"
      />
    </el-form-item>
    <el-form-item label="是否隐藏" prop="hidden">
      <el-switch
        v-model="newFormInline.hidden"
        :active-value="1"
        :inactive-value="2"
        active-text="是"
        inactive-text="否"
        inline-prompt
      />
    </el-form-item>
  </el-form>
</template>
