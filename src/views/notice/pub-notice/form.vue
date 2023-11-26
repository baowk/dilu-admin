<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import { PubNoticeFormProps } from "@/api/notice/pub-notice";
import { usePubNotice } from "./utils/hook";

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
    expired: null
  })
});

/** 自定义表单规则校验 */
const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "名称为必填项", trigger: "blur" }]
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

const { statusOptions } = usePubNotice();

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
    <el-form-item label="团队" prop="teamId">
      <el-input
        v-model.number="newFormInline.teamId"
        disabled
        placeholder="请输入团队"
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
        type="textarea"
        rows="3"
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
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in statusOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="到期时间" prop="expired">
      <el-date-picker
        v-model="newFormInline.expired"
        type="datetime"
        placeholder="选择日期"
      />
    </el-form-item>
  </el-form>
</template>
