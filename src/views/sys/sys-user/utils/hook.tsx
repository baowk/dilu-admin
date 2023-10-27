import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSysUserPage,
  createSysUser,
  updateSysUser,
  delSysUser
} from "@/api/sys/sys-user";
import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysUserFormItemProps } from "@/api/sys/sys-user";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useSysUser() {
  const form = reactive({
    id: 0,
    username: null,
    phone: null,
    email: null,
    password: null,
    nickname: null,
    name: null,
    avatar: null,
    bio: null,
    birthday: null,
    gender: null,
    roleId: 0,
    post: null,
    remark: null,
    status: 0
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    // {
    //   label: "主键",
    //   prop: "id",
    //   minWidth: 120
    // },
    {
      label: "用户名",
      prop: "username",
      minWidth: 120
    },
    {
      label: "手机号",
      prop: "phone",
      minWidth: 120
    },
    {
      label: "邮箱",
      prop: "email",
      minWidth: 120
    },
    // {
    //   label: "密码",
    //   prop: "password",
    //   minWidth: 120
    // },
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
    {
      label: "头像",
      prop: "avatar",
      minWidth: 120
    },
    {
      label: "签名",
      prop: "bio",
      minWidth: 120
    },
    {
      label: "生日",
      prop: "birthday",
      minWidth: 120
    },
    {
      label: "性别",
      prop: "gender",
      minWidth: 80,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.gender === 1 ? "" : "danger"}
          effect="plain"
        >
          {row.gender === 1 ? "男" : "女"}
        </el-tag>
      )
    },
    {
      label: "角色ID",
      prop: "roleId",
      minWidth: 120
    },
    {
      label: "岗位",
      prop: "post",
      minWidth: 120
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 80,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
        />
      )
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 120
    },
    {
      label: "更新者",
      prop: "updateBy",
      minWidth: 120
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最后更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    // {
    //   label: "删除时间",
    //   prop: "deletedAt",
    //   minWidth: 120,
    //   formatter: ({ createTime }) =>
    //     dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    // },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delSysUser({ ids: [row.id] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

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

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: SysUserFormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          username: row?.username ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          password: row?.password ?? "",
          nickname: row?.nickname ?? "",
          name: row?.name ?? "",
          avatar: row?.avatar ?? "",
          bio: row?.bio ?? "",
          birthday: row?.birthday ?? "",
          gender: row?.gender ?? "",
          roleId: row?.roleId ?? 0,
          post: row?.post ?? "",
          remark: row?.remark ?? "",
          status: row?.status ?? 0
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysUserFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSysUser(curData).then(res => {
                if (res.code == 200) {
                  message(res.msg, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                } else {
                  message(res.msg, {
                    type: "error"
                  });
                }
              });
            } else {
              updateSysUser(curData).then(res => {
                if (res.code == 200) {
                  message(res.msg, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                } else {
                  message(res.msg, {
                    type: "error"
                  });
                }
              });
            }
            done(); // 关闭弹框
          }
        });
      }
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
