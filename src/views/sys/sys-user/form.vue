<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysUserFormProps } from "@/api/sys/sys-user";

const props = withDefaults(defineProps<SysUserFormProps>(), {
  formInline: () => ({
    id: 0,
    username: null,
    phone: null,
    email: null,
    password: null,
    nickname: null,
    name: null,
    avatar: null,
    bio: null,
    birthday: null,
    gender: null,
    roleId: 0,
    post: null,
    remark: null,
    status: 0
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
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="newFormInline.username"
        clearable
        placeholder="请输入用户名"
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
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="newFormInline.password"
        clearable
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input
        v-model="newFormInline.nickname"
        clearable
        placeholder="请输入昵称"
      />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <el-input
        v-model="newFormInline.avatar"
        clearable
        placeholder="请输入头像"
      />
    </el-form-item>
    <el-form-item label="签名" prop="bio">
      <el-input
        v-model="newFormInline.bio"
        clearable
        placeholder="请输入签名"
      />
    </el-form-item>
    <el-form-item label="生日 格式 yyyy-MM-dd" prop="birthday">
      <el-input
        v-model="newFormInline.birthday"
        clearable
        placeholder="请输入生日 格式 yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item label="性别 1男 2女 3未知" prop="gender">
      <el-input
        v-model="newFormInline.gender"
        clearable
        placeholder="请输入性别 1男 2女 3未知"
      />
    </el-form-item>
    <el-form-item label="角色ID" prop="roleId">
      <el-input
        v-model.number="newFormInline.roleId"
        clearable
        placeholder="请输入角色ID"
      />
    </el-form-item>
    <el-form-item label="岗位" prop="post">
      <el-input
        v-model="newFormInline.post"
        clearable
        placeholder="请输入岗位"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="状态 1冻结 2正常 3默认" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态 1冻结 2正常 3默认"
      />
    </el-form-item>
  </el-form>
</template>
