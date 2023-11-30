<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { SysMemberFormProps } from "@/api/sys/sys-member";
import { usePublicHooks } from "@/utils/hooks";
import { useMember } from "../utils/hook";

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

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

const treeRef = ref();
const tableRef = ref();

const { genderOptions, postOptions } = useMember(tableRef, treeRef);

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
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="newFormInline.email"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="入职时间" prop="entryTime">
          <el-date-picker
            v-model="newFormInline.entryTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="离职时间" prop="retireTime">
          <el-date-picker
            v-model="newFormInline.retireTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="newFormInline.birthday"
            type="date"
            placeholder="选择日期"
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
              v-for="(item, index) in genderOptions"
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
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="1"
            :inactive-value="2"
            active-text="在职"
            inactive-text="离职"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="职位标签" prop="postTag">
          <el-select
            v-model="newFormInline.postId"
            placeholder="请选择职位"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in postOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <!-- <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色" prop="roles">
          <el-input
            v-model.number="newFormInline.roles"
            clearable
            placeholder="请输入角色"
          />
        </el-form-item>
      </re-col> -->
    </el-row>
  </el-form>
</template>
