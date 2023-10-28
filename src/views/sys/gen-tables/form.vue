<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { GenTablesFormProps } from "@/api/sys/gen-tables";

const props = withDefaults(defineProps<GenTablesFormProps>(), {
  formInline: () => ({
    tableId: 0,
    dbName: null,
    tableName: null,
    tableComment: null,
    className: null,
    tplCategory: null,
    packageName: null,
    moduleName: null,
    moduleFrontName: null,
    businessName: null,
    functionName: null,
    functionAuthor: null,
    pkColumn: null,
    pkGoField: null,
    pkJsonField: null,
    options: null,
    treeCode: null,
    treeParentCode: null,
    treeName: null,
    tree: 0,
    crud: 0,
    remark: null,
    isDataScope: 0,
    isActions: 0,
    isAuth: 0,
    isLogicalDelete: null,
    logicalDelete: 0,
    logicalDeleteColumn: null,
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
  <el-form-item label="" prop="tableId">
      <el-input
        v-model.number="newFormInline.tableId"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="dbName">
      <el-input
        v-model="newFormInline.dbName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="tableName">
      <el-input
        v-model="newFormInline.tableName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="tableComment">
      <el-input
        v-model="newFormInline.tableComment"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="className">
      <el-input
        v-model="newFormInline.className"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="tplCategory">
      <el-input
        v-model="newFormInline.tplCategory"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="packageName">
      <el-input
        v-model="newFormInline.packageName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="moduleName">
      <el-input
        v-model="newFormInline.moduleName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="前端文件名" prop="moduleFrontName">
      <el-input
        v-model="newFormInline.moduleFrontName"
        clearable
        placeholder="请输入前端文件名"
      />
    </el-form-item>
  <el-form-item label="" prop="businessName">
      <el-input
        v-model="newFormInline.businessName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="functionName">
      <el-input
        v-model="newFormInline.functionName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="functionAuthor">
      <el-input
        v-model="newFormInline.functionAuthor"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="pkColumn">
      <el-input
        v-model="newFormInline.pkColumn"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="pkGoField">
      <el-input
        v-model="newFormInline.pkGoField"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="pkJsonField">
      <el-input
        v-model="newFormInline.pkJsonField"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="options">
      <el-input
        v-model="newFormInline.options"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="treeCode">
      <el-input
        v-model="newFormInline.treeCode"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="treeParentCode">
      <el-input
        v-model="newFormInline.treeParentCode"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="treeName">
      <el-input
        v-model="newFormInline.treeName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="tree">
      <el-input
        v-model.number="newFormInline.tree"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="crud">
      <el-input
        v-model.number="newFormInline.crud"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isDataScope">
      <el-input
        v-model.number="newFormInline.isDataScope"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isActions">
      <el-input
        v-model.number="newFormInline.isActions"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isAuth">
      <el-input
        v-model.number="newFormInline.isAuth"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isLogicalDelete">
      <el-input
        v-model="newFormInline.isLogicalDelete"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="logicalDelete">
      <el-input
        v-model.number="newFormInline.logicalDelete"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="logicalDeleteColumn">
      <el-input
        v-model="newFormInline.logicalDeleteColumn"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  
  
  
  
  
  
  </el-form>
</template>
