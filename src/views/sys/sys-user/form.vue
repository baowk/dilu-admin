<script setup lang="ts">
import { ref, reactive } from "vue";
import { SysUserFormProps, getroleList, getSysUser } from "@/api/sys/sys-user";
import { useSysUser } from "./utils/hook";

const props = withDefaults(defineProps<SysUserFormProps>(), {
  formInline: () => ({
    id: null,
    username: null,
    phone: null,
    email: null,
    password: null,
    nickname: null,
    name: null,
    avatar: null,
    bio: null,
    birthday: null,
    gender: "",
    platformRoleId: null,
    lockTime: null,
    remark: "",
    status: null
  })
});
const validateContact = (rule: any, value: any, callback: Function) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return callback(new Error("请输入有效的邮箱"));
  }

  return callback();
};
const validatePhone = (rule: any, value: any, callback: Function) => {
  const emailRegex = /^1[3-9]\d{9}$/;
  if (value && !emailRegex.test(value)) {
    return callback(new Error("请输入有效的手机号"));
  }
  return callback();
};
/** 自定义表单规则校验 */
const formRules = reactive({
  email: [{ validator: validateContact, trigger: "blur" }],
  phone: [{ validator: validatePhone, trigger: "blur" }]
});
const roleList = ref(<any>[]);
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

const getUserdetail = () => {
  if (newFormInline.value.id) {
    getSysUser({ id: newFormInline.value.id }).then(res => {
      console.log("detaildetail", res);
    });
  }
};
getUserdetail();
const getRole = () => {
  getroleList().then(res => {
    if (res.code == 200) {
      roleList.value = res.data;
    }
  });
};
getRole();
const { genderOptions } = useSysUser();

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
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
        type="password"
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
    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        style="width: 100%"
        v-model="newFormInline.birthday"
        type="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        placeholder="选择日期"
      >
      </el-date-picker>
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
    <el-form-item label="角色" prop="platformRoleId">
      <el-select
        v-model="newFormInline.platformRoleId"
        placeholder="请选择角色"
        class="w-full"
      >
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select
        class="w-full"
        v-model="newFormInline.status"
        placeholder="请选择"
      >
        <el-option label="正常" :value="1" />
        <el-option label="冻结" :value="-1" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
