<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { SysMemberFormProps } from "@/api/sys/sys-member";
import { usePublicHooks } from "@/utils/hooks";
import { useMember } from "../utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { getSysUserPage } from "@/api/sys/sys-user";
import { type PaginationProps } from "@pureadmin/table";
// import dayjs from "dayjs";
import { getSysRolePage } from "@/api/sys/sys-role";
import { getSysMember, userInTeam } from "@/api/sys/sys-member";
import { message } from "@/utils/message";
const props = withDefaults(defineProps<SysMemberFormProps>(), {
  formInline: () => ({
    type: "",
    higherDeptOptions: [],
    id: 0,
    teamId: 0,
    userId: null,
    nickname: null,
    name: null,
    phone: null,
    deptPath: null,
    deptId: 0,
    postId: 0,
    roles: "",
    status: null,
    gender: null,
    birthday: null,
    entryTime: null,
    retireTime: null
  })
});

const searchRef = ref();
const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

const treeRef = ref();
const tableRef = ref();
const loading = ref(true);
const mutiTableRef = ref();

const roleList = ref([]);

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});
const columns: TableColumnList = [
  // {
  //   type: "selection",
  //   width: 50,
  //   align: "left",
  //   selectable: row => {
  //     return row.status == 1;
  //   }
  // },
  // {
  //   type: "index",
  //   width: 50,
  //   align: "left"
  // },
  // {
  //   label: "选择用户",

  //   slot: "choose"
  // },
  {
    label: "用户名",
    prop: "username",
    minWidth: 120,
    slot: "username"
  },
  {
    label: "手机号",
    prop: "phone",
    minWidth: 120
  },
  {
    label: "邮箱",
    prop: "email",
    minWidth: 180
  },
  {
    label: "昵称",
    prop: "nickname",
    minWidth: 120
  },
  {
    label: "姓名",
    prop: "name",
    minWidth: 120
  },
  // {
  //   label: "签名",
  //   prop: "bio",
  //   minWidth: 120
  // },
  // {
  //   label: "生日",
  //   prop: "birthday",
  //   minWidth: 180,
  //   formatter: ({ birthday }) => dayjs(birthday).format("YYYY-MM-DD HH:mm:ss")
  // },
  {
    label: "状态",
    prop: "status",
    minWidth: 80,
    slot: "status"
  }
];
const dataList = ref([]);
const selectedRow = ref(null);
const form = reactive({
  page: null,
  pageSize: null,
  username: null,
  phone: null,
  email: null,
  nickname: null,
  name: null,
  avatar: null,
  birthday: null,
  gender: null,
  status: null
});
const { genderOptions, postOptions } = useMember(tableRef, treeRef);

function getRef() {
  return ruleFormRef.value;
}
const getRolePage = async () => {
  const { data } = await getSysRolePage({
    page: 1,
    pageSize: 10000
  });
  roleList.value = data.list || [];
  if (roleList.value && roleList.value) {
    roleList.value.forEach(item => {
      item.label = item.name;
      item.id = item.id.toString();
    });
  }
};
getRolePage();
const getDetail = () => {
  if (newFormInline.value.type == "edit") {
    getSysMember({ id: newFormInline.value.id }).then(res => {
      if (res.code === 200) {
        newFormInline.value.id = res.data.id;
        newFormInline.value.name = res.data.name;
        newFormInline.value.nickname = res.data.nickname;
        newFormInline.value.phone = res.data.phone;
        newFormInline.value.userId = res.data.userId;
        newFormInline.value.retireTime = res.data.retireTime;
        newFormInline.value.entryTime = res.data.entryTime;
        newFormInline.value.birthday = res.data.birthday;
        newFormInline.value.gender = res.data.gender;
        newFormInline.value.deptId = res.data.deptId;
        newFormInline.value.postId =
          res.data.postId == 0 ? null : res.data.postId;
        newFormInline.value.roles = res.data.roles;
        newFormInline.value.status = res.data.status;
      }
    });
  }
};

async function onSearch() {
  loading.value = true;
  const { data } = await getSysUserPage(toRaw(form));
  dataList.value = data.list;
  pagination.total = data.total;
  pagination.pageSize = data.pageSize;
  pagination.currentPage = data.currentPage;

  setTimeout(() => {
    loading.value = false;
  }, 500);
}
const resetForm = () => {
  if (!searchRef.value) return;
  searchRef.value.resetFields();
  onSearch();
};
function handleSizeChange(val: number) {
  console.log("🚀 ~ handleSizeChange ~ val:", val);
  form.pageSize = val;
  pagination.pageSize = val;
  onSearch();
}

const handleRadioChange = row => {
  userInTeam({
    userId: row.userId
  }).then(res => {
    console.log(1111, res);
    if (res.data.exist) {
      selectedRow.value = row;
      newFormInline.value.userId = row.id;
      newFormInline.value.phone = row.phone || null;
      newFormInline.value.nickname = row.nickname || null;
      newFormInline.value.birthday = row.birthday || null;
    } else {
      message("当前用户不可选择", {
        type: "error"
      });
      selectedRow.value = null;
    }
  });
  console.log("handleRadioChange.value", row);
};
function handleCurrentChange(val: number) {
  console.log("🚀 ~ handleCurrentChange ~ val:", val);
  form.page = val;
  pagination.currentPage = val;
  onSearch();
}
onMounted(() => {
  onSearch();
  getDetail();
});
defineExpose({ getRef });
</script>

<template>
  <el-row :gutter="30">
    <el-divider v-if="newFormInline.type == 'add'" content-position="left"
      >用户列表</el-divider
    >
    <re-col v-if="newFormInline.type == 'add'" :value="24" :xs="24" :sm="24">
      <el-form ref="searchRef" :inline="true" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            clearable
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" clearable placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" clearable placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="正常" :value="1" />
            <el-option label="冻结" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm()">
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <PureTableBar title="" :columns="columns" @refresh="onSearch">
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="mutiTableRef"
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            row-key="id"
            :columns="dynamicColumns"
            :pagination="pagination"
            :paginationSmall="size === 'small'"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #username="scope">
              <el-radio
                :size="`large`"
                :disabled="scope.row.status != 1"
                @change="handleRadioChange(scope.row)"
                :label="scope.row"
                v-model="selectedRow"
              >
                <div style="width: 100px">{{ scope.row.username || "-" }}</div>
              </el-radio>
            </template>
            <template #status="{ row }">
              <div>{{ row.status == 1 ? "正常" : "冻结" }}</div>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </re-col>
  </el-row>
  <el-divider content-position="left">基本信息</el-divider>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入用户名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入用户昵称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="newFormInline.phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="入职时间" prop="entryTime">
          <el-date-picker
            style="width: 100%"
            v-model="newFormInline.entryTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </re-col>

      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="离职时间" prop="retireTime">
          <el-date-picker
            style="width: 100%"
            v-model="newFormInline.retireTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </re-col>
      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            style="width: 100%"
            v-model="newFormInline.birthday"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </re-col>

      <re-col :value="8" :xs="24" :sm="24">
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

      <re-col :value="8" :xs="24" :sm="24">
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
      <re-col :value="8" :xs="24" :sm="24">
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
      <re-col :value="8" :xs="24" :sm="24">
        <el-form-item label="角色" prop="roles">
          <el-select
            v-model="newFormInline.roles"
            placeholder="请选择角色"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="8" :xs="24" :sm="24">
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
    </el-row>
  </el-form>
</template>
