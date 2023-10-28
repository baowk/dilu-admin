<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { GenColumnsFormProps } from "@/api/sys/gen-columns";

const props = withDefaults(defineProps<GenColumnsFormProps>(), {
  formInline: () => ({
    columnId: 0,
    tableId: 0,
    columnName: null,
    columnComment: null,
    columnType: null,
    goType: null,
    goField: null,
    jsonField: null,
    isPk: null,
    isIncrement: null,
    isRequired: null,
    isInsert: null,
    isEdit: null,
    isList: null,
    isQuery: null,
    queryType: null,
    htmlType: null,
    dictType: null,
    sort: 0,
    list: null,
    pk: 0,
    required: 0,
    superColumn: 0,
    usableColumn: 0,
    increment: 0,
    insert: 0,
    edit: 0,
    query: 0,
    remark: null,
    fkTableName: null,
    fkTableNameClass: null,
    fkTableNamePackage: null,
    fkLabelId: null,
    fkLabelName: null,
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
  <el-form-item label="" prop="columnId">
      <el-input
        v-model.number="newFormInline.columnId"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="tableId">
      <el-input
        v-model.number="newFormInline.tableId"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="columnName">
      <el-input
        v-model="newFormInline.columnName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="columnComment">
      <el-input
        v-model="newFormInline.columnComment"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="columnType">
      <el-input
        v-model="newFormInline.columnType"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="goType">
      <el-input
        v-model="newFormInline.goType"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="goField">
      <el-input
        v-model="newFormInline.goField"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="jsonField">
      <el-input
        v-model="newFormInline.jsonField"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isPk">
      <el-input
        v-model="newFormInline.isPk"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isIncrement">
      <el-input
        v-model="newFormInline.isIncrement"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isRequired">
      <el-input
        v-model="newFormInline.isRequired"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isInsert">
      <el-input
        v-model="newFormInline.isInsert"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isEdit">
      <el-input
        v-model="newFormInline.isEdit"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isList">
      <el-input
        v-model="newFormInline.isList"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="isQuery">
      <el-input
        v-model="newFormInline.isQuery"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="queryType">
      <el-input
        v-model="newFormInline.queryType"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="htmlType">
      <el-input
        v-model="newFormInline.htmlType"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="dictType">
      <el-input
        v-model="newFormInline.dictType"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="sort">
      <el-input
        v-model.number="newFormInline.sort"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="list">
      <el-input
        v-model="newFormInline.list"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="pk">
      <el-input
        v-model.number="newFormInline.pk"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="required">
      <el-input
        v-model.number="newFormInline.required"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="superColumn">
      <el-input
        v-model.number="newFormInline.superColumn"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="usableColumn">
      <el-input
        v-model.number="newFormInline.usableColumn"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="increment">
      <el-input
        v-model.number="newFormInline.increment"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="insert">
      <el-input
        v-model.number="newFormInline.insert"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="edit">
      <el-input
        v-model.number="newFormInline.edit"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="query">
      <el-input
        v-model.number="newFormInline.query"
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
  <el-form-item label="" prop="fkTableName">
      <el-input
        v-model="newFormInline.fkTableName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="fkTableNameClass">
      <el-input
        v-model="newFormInline.fkTableNameClass"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="fkTableNamePackage">
      <el-input
        v-model="newFormInline.fkTableNamePackage"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="fkLabelId">
      <el-input
        v-model="newFormInline.fkLabelId"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  <el-form-item label="" prop="fkLabelName">
      <el-input
        v-model="newFormInline.fkLabelName"
        clearable
        placeholder="请输入"
      />
    </el-form-item>
  
  
  
  
  
  
  </el-form>
</template>
