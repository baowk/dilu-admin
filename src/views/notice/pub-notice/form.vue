<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { PubNoticeFormProps } from "@/api/notice/pub-notice";

const props = withDefaults(defineProps<PubNoticeFormProps>(), {
  formInline: () => ({
    id: 0,
    teamId: 0,
    title: null,
    content: null,
    noticeType: 0,
    op: 0,
    opId: 0,
    status: 0,
    expired: null,
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
  <el-form-item label="针对组消息" prop="teamId">
      <el-input
        v-model.number="newFormInline.teamId"
        clearable
        placeholder="请输入针对组消息"
      />
    </el-form-item>
  <el-form-item label="标题" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入标题"
      />
    </el-form-item>
  <el-form-item label="内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入内容"
      />
    </el-form-item>
  <el-form-item label="消息类型" prop="noticeType">
      <el-input
        v-model.number="newFormInline.noticeType"
        clearable
        placeholder="请输入消息类型"
      />
    </el-form-item>
  <el-form-item label="操作类型" prop="op">
      <el-input
        v-model.number="newFormInline.op"
        clearable
        placeholder="请输入操作类型"
      />
    </el-form-item>
  <el-form-item label="操作id" prop="opId">
      <el-input
        v-model.number="newFormInline.opId"
        clearable
        placeholder="请输入操作id"
      />
    </el-form-item>
  <el-form-item label="状态" prop="status">
      <el-input
        v-model.number="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
  
  
  <el-form-item label="到期时间" prop="expired">
      <el-input
        v-model="newFormInline.expired"
        clearable
        placeholder="请输入到期时间"
      />
    </el-form-item>
  
  
  
  </el-form>
</template>
