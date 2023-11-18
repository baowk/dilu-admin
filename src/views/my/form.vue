<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysUserFormProps } from "@/api/sys/sys-user";
import { useMyUserInfo } from "./utils/hook";

const props = withDefaults(defineProps<SysUserFormProps>(), {
  formInline: () => ({
    id: 0,
    phone: null,
    nickname: null,
    name: null,
    birthday: null,
    gender: null
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

const { genderOptions } = useMyUserInfo();

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        clearable
        placeholder="请输入手机号"
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

    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        v-model="newFormInline.birthday"
        type="date"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select
        v-model="newFormInline.gender"
        placeholder="请选择用户性别"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in genderOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
