<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { CustomerFormProps } from "@/api/dental/customer";
import { useCustomer } from "./utils/hook";

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

const { members, genderOptions } = useCustomer();

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
    <!-- <el-form-item label="主键" prop="id">
      <el-input
        v-model.number="newFormInline.id"
        clearable
        placeholder="请输入主键"
      />
    </el-form-item> -->
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
      <el-select
        v-model="newFormInline.gender"
        placeholder="请选择性别"
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
    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        v-model="newFormInline.birthday"
        type="date"
        placeholder="选择生日"
        value-format="x"
      />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input
        v-model.number="newFormInline.age"
        clearable
        placeholder="请输入年龄"
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
        type="textarea"
        :rows="2"
      />
    </el-form-item>
    <el-form-item label="咨询师" prop="userId">
      <el-select
        v-model="newFormInline.userId"
        placeholder="请选择咨询师"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in members"
          :key="index"
          :label="item.name"
          :value="item.userId"
        />
      </el-select>
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
