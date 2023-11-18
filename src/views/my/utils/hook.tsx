import dayjs from "dayjs";
import editForm from "../form.vue";
import pwdForm from "../pwd.vue";
import teamForm from "../teamForm.vue";
import { message } from "@/utils/message";
import {
  genderOptions,
  getMyUserInfo,
  changePwd,
  type ResetPwdFormProps
} from "@/api/sys/sys-user";

import { changeMyInfo, type SysMemberFormProps } from "@/api/sys/sys-member";

import { changeTeam, SysTeamFormProps } from "@/api/sys/sys-team";

import { getTeamInfo, type TeamInfo, Team, setTeams } from "@/utils/team";
import { getMyTeams } from "@/api/user";
import { addDialog } from "@/components/ReDialog";
import { ref, onMounted, h } from "vue";

export function useMyUserInfo() {
  const formRef = ref();
  const loading = ref(true);
  const teamInfo = ref<TeamInfo>();
  const myInfo = ref<Team>();

  const postOptions = [
    {
      value: -1,
      label: "超管"
    },
    {
      value: 2,
      label: "部门主管"
    },
    {
      value: 4,
      label: "副主管"
    },
    {
      value: 8,
      label: "员工"
    }
  ];

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
  };

  function openDialog(row?: Team) {
    addDialog({
      title: `修改我的信息`,
      props: {
        formInline: {
          phone: row?.phone ?? "",
          nickname: row?.nickname ?? "",
          name: row?.name ?? "",
          birthday: row?.birthday ?? "",
          gender: row?.gender ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysMemberFormProps;
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            changeMyInfo(curData).then(res => {
              if (res.code == 200) {
                getMyTeams().then(res => {
                  setTeams(res.data, teamInfo.value.select);
                  onLoadTeam(); // 刷新表格数据
                });
                message(res.msg, {
                  type: "success"
                });
              } else {
                message(res.msg, {
                  type: "error"
                });
              }
            });
            done(); // 关闭弹框
          }
        });
      }
    });
  }

  function resetDialog() {
    addDialog({
      title: `修改密码`,
      props: {
        formInline: {
          username: null,
          oldPwd: null,
          newPwd: null,
          rePwd: null
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(pwdForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as ResetPwdFormProps;
        FormRef.validate(valid => {
          if (valid) {
            changePwd(curData).then(res => {
              if (res.code == 200) {
                message(res.msg, {
                  type: "success"
                });
                onLoadTeam(); // 刷新表格数据
              } else {
                message(res.msg, {
                  type: "error"
                });
              }
            });

            done(); // 关闭弹框
          }
        });
      }
    });
  }

  function openTeamDialog(teamId: number) {
    addDialog({
      title: `修改企业名称`,
      props: {
        formInline: {
          name: null,
          id: teamId
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(teamForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysTeamFormProps;
        FormRef.validate(valid => {
          if (valid) {
            changeTeam(curData).then(res => {
              if (res.code == 200) {
                getMyTeams().then(res => {
                  setTeams(res.data, teamInfo.value.select);
                  onLoadTeam(); // 刷新表格数据
                });
                message(res.msg, {
                  type: "success"
                });
              } else {
                message(res.msg, {
                  type: "error"
                });
              }
            });

            done(); // 关闭弹框
          }
        });
      }
    });
  }

  function onLoadTeam() {
    loading.value = true;
    getTeamInfo().then(res => {
      console.log(res);
      teamInfo.value = res;
      if (teamInfo.value) {
        for (let i = 0; i < teamInfo.value.teams.length; i++) {
          if (teamInfo.value.select == teamInfo.value.teams[i].teamId) {
            myInfo.value = teamInfo.value.teams[i];
            myInfo.value.birthday = dayjs(myInfo.value.birthday).format(
              "YYYY-MM-DD"
            );
            myInfo.value.entryTime = dayjs(myInfo.value.entryTime).format(
              "YYYY-MM-DD"
            );
          }
        }
      } else {
        myInfo.value.teamName = "dilu system";
        myInfo.value.teamId = -1;
        getMyUserInfo().then(res => {
          if (res.code == 200) {
            myInfo.value = res.data;
            myInfo.value.birthday = dayjs(myInfo.value.birthday).format(
              "YYYY-MM-DD"
            );
          }
        });
      }
    });

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onLoadTeam();
  });

  return {
    loading,
    teamInfo,
    myInfo,
    genderOptions,
    postOptions,
    openTeamDialog,
    resetDialog,
    resetForm,
    openDialog
  };
}
