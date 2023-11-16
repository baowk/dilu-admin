<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { RoleFormProps } from "../utils/types";

const props = withDefaults(defineProps<RoleFormProps>(), {
  formInline: () => ({
    name: "",
    nickname: "",
    roleOptions: [],
    ids: []
  })
});

const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="姓名" prop="name">
          <el-input disabled v-model="newFormInline.name" />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input disabled v-model="newFormInline.nickname" />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="角色列表" prop="ids">
          <el-select
            v-model="newFormInline.ids"
            placeholder="请选择"
            class="w-full"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in newFormInline.roleOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
