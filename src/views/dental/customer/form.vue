<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { CustomerFormProps } from "@/api/dental/customer";

const props = withDefaults(defineProps<CustomerFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null,
    phone: null,
    wechat: null,
    gender: 0,
    age: 0,
    birthday: 0,
    source: null,
    address: null,
    remark: null,
    userId: 0,
    teamId: 0,
    deptPath: null,
    inviter: 0,
    inviterName: null
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
    <el-form-item label="姓名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="微信号" prop="wechat">
      <el-input
        v-model="newFormInline.wechat"
        clearable
        placeholder="请输入微信号"
      />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input
        v-model.number="newFormInline.gender"
        clearable
        placeholder="请输入性别"
      />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input
        v-model.number="newFormInline.age"
        clearable
        placeholder="请输入年龄"
      />
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-input
        v-model.number="newFormInline.birthday"
        clearable
        placeholder="请输入生日"
      />
    </el-form-item>
    <el-form-item label="来源" prop="source">
      <el-input
        v-model="newFormInline.source"
        clearable
        placeholder="请输入来源"
      />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        clearable
        placeholder="请输入地址"
      />
    </el-form-item>
    <el-form-item label="描述" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入描述"
      />
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input
        v-model.number="newFormInline.userId"
        clearable
        placeholder="请输入用户id"
      />
    </el-form-item>
    <el-form-item label="团队id" prop="teamId">
      <el-input
        v-model.number="newFormInline.teamId"
        clearable
        placeholder="请输入团队id"
      />
    </el-form-item>
    <el-form-item label="部门路径" prop="deptPath">
      <el-input
        v-model="newFormInline.deptPath"
        clearable
        placeholder="请输入部门路径"
      />
    </el-form-item>
    <el-form-item label="邀请人" prop="inviter">
      <el-input
        v-model.number="newFormInline.inviter"
        clearable
        placeholder="请输入邀请人"
      />
    </el-form-item>
    <el-form-item label="邀请人名" prop="inviterName">
      <el-input
        v-model="newFormInline.inviterName"
        clearable
        placeholder="请输入邀请人名"
      />
    </el-form-item>
  </el-form>
</template>
