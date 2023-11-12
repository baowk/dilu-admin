<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { SysMemberFormProps } from "@/api/sys/sys-member";
import { usePublicHooks } from "@/utils/hooks";

const props = withDefaults(defineProps<SysMemberFormProps>(), {
  formInline: () => ({
    title: "新增",
    higherDeptOptions: [],
    id: 0,
    teamId: 0,
    userId: 0,
    nickname: null,
    name: null,
    phone: null,
    deptPath: null,
    deptId: 0,
    postId: 0,
    roles: null,
    status: 0,
    gender: null,
    birthday: null,
    entryTime: null,
    retireTime: null
  })
});

const sexOptions = [
  {
    value: "1",
    label: "男"
  },
  {
    value: "2",
    label: "女"
  }
];
const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
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
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入用户名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入用户昵称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="newFormInline.phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="生日" prop="birthday">
          <el-input
            v-model="newFormInline.birthday"
            clearable
            placeholder="生日"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="newFormInline.email"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="性别">
          <el-select
            v-model="newFormInline.gender"
            placeholder="请选择用户性别"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in sexOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="归属部门">
          <el-cascader
            class="w-full"
            v-model="newFormInline.deptId"
            :options="newFormInline.higherDeptOptions"
            :props="{
              value: 'id',
              label: 'name',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择归属部门"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>
      <re-col
        :value="12"
        :xs="24"
        :sm="24"
        v-if="newFormInline.title === '新增'"
      >
        <el-form-item label="用户状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="职位标签" prop="postTag">
          <el-input
            v-model.number="newFormInline.postId"
            clearable
            placeholder="请输入职位标签"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色" prop="roles">
          <el-input
            v-model.number="newFormInline.roles"
            clearable
            placeholder="请输入角色"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
