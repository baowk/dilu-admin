<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysMenuFormProps } from "@/api/sys/sys-menu";

const props = withDefaults(defineProps<SysMenuFormProps>(), {
  formInline: () => ({
    id: 0,
    menuName: null,
    title: null,
    icon: null,
    path: null,
    paths: null,
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
    <el-form-item label="路径ids/分割" prop="paths">
      <el-input
        v-model="newFormInline.paths"
        clearable
        placeholder="请输入路径ids/分割"
      />
    </el-form-item>
    <el-form-item label="菜单类型 1 分类 2菜单 3方法按钮" prop="menuType">
      <el-input
        v-model.number="newFormInline.menuType"
        clearable
        placeholder="请输入菜单类型 1 分类 2菜单 3方法按钮"
      />
    </el-form-item>
    <el-form-item label="权限" prop="permission">
      <el-input
        v-model="newFormInline.permission"
        clearable
        placeholder="请输入权限"
      />
    </el-form-item>
    <el-form-item label="菜单父id" prop="parentId">
      <el-input
        v-model.number="newFormInline.parentId"
        clearable
        placeholder="请输入菜单父id"
      />
    </el-form-item>
    <el-form-item label="是否缓存" prop="noCache">
      <el-input
        v-model.number="newFormInline.noCache"
        clearable
        placeholder="请输入是否缓存"
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
      <el-input
        v-model.number="newFormInline.hidden"
        clearable
        placeholder="请输入是否隐藏"
      />
    </el-form-item>
  </el-form>
</template>
