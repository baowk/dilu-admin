<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { SysTeamFormProps } from "@/api/sys/sys-team";
import { useMyUserInfo } from "./utils/hook";

const props = withDefaults(defineProps<SysTeamFormProps>(), {
  formInline: () => ({
    id: 0,
    name: null
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

    <el-form-item label="团队名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入团队名"
      />
    </el-form-item>
  </el-form>
</template>
