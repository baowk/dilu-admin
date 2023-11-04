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
    logicalDeleteColumn: null
  })
});

/** 自定义表单规则校验 */
const formRules = reactive(<FormRules>{
  tableName: [
    { required: true, message: "请输入表名称", trigger: "blur" },
    {
      pattern: /^[a-z\._]*$/g,
      trigger: "blur",
      message: "只允许小写字母,例如 sys_demo 格式"
    }
  ],
  tableComment: [
    { required: true, message: "请输入菜单名称", trigger: "blur" }
  ],
  className: [
    { required: true, message: "请输入模型名称", trigger: "blur" },
    {
      pattern: /^[A-Z][A-z0-9]*$/g,
      trigger: "blur",
      message: "必须以大写字母开头,例如 SysDemo 格式"
    }
  ],
  functionAuthor: [
    { required: true, message: "请输入作者", trigger: "blur" },
    {
      pattern: /^[A-Za-z]+$/,
      trigger: "blur",
      message: "校验规则:  只允许输入字母 a-z 或大写 A-Z"
    }
  ]
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
    ref="basicInfoForm"
    :model="newFormInline"
    :rules="formRules"
    label-width="150px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item prop="tableName" label="数据表名称">
          <el-input
            v-model="newFormInline.tableName"
            placeholder="请输入表名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="菜单名称" prop="tableComment">
          <el-input
            v-model="newFormInline.tableComment"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结构体模型名称" prop="className">
          <el-input v-model="newFormInline.className" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="作者名称" prop="functionAuthor">
          <el-input
            v-model="newFormInline.functionAuthor"
            placeholder="请输入作者名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="newFormInline.remark" type="textarea" :rows="3" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
