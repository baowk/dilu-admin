<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { ResetPwdFormProps } from "@/api/sys/sys-user";
import { useMyUserInfo } from "./utils/hook";

const props = withDefaults(defineProps<ResetPwdFormProps>(), {
  formInline: () => ({
    username: null,
    oldPwd: null,
    newPwd: null,
    rePwd: null
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

const { myInfo } = useMyUserInfo();

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <!-- <el-form-item label="用户名" prop="username">
      <el-input v-model="myInfo.name" clearable placeholder="请输入用户名" />
    </el-form-item> -->

    <el-form-item label="源密码" prop="oldPwd">
      <el-input
        v-model="newFormInline.oldPwd"
        clearable
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input
        v-model="newFormInline.newPwd"
        clearable
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="重复密码" prop="rePwd">
      <el-input
        v-model="newFormInline.rePwd"
        clearable
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
  </el-form>
</template>
