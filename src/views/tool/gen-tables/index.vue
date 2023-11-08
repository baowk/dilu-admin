<script setup lang="ts">
import { ref } from "vue";
import { useGenTables } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "gen-tables"
});

const formRef = ref();
const {
  qform,
  loading,
  columns,
  dataList,
  pagination,
  dbOptions,
  onSearch,
  resetForm,
  openDialog,
  importDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleGen,
  handleGenMenu
} = useGenTables();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="qform"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="库名：" prop="dbName">
        <el-select
          v-model="qform.dbName"
          placeholder="请选择库名"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="(item, index) in dbOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表名：" prop="tableName">
        <el-input
          v-model="qform.tableName"
          placeholder="请输入表名"
          clearable
          class="!w-[180px]"
        />
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
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="列表" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <Auth value="sys:genTables:add">
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="importDialog()"
          >
            导入
          </el-button>
        </Auth>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <Auth value="sys:genTables:edit">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('编辑', row)"
              >
                修改
              </el-button>
            </Auth>
            <Auth value="sys:genTables:remove">
              <el-popconfirm
                :title="`要删除 ${row.tableName} 吗`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </Auth>
            <!--Auth value="sys:genTables:gen"-->
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="handleGen(row)"
            >
              代码生成
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="handleGenMenu(row)"
            >
              菜单接口生成
            </el-button>
            <!--/Auth-->
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
