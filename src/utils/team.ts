//import Cookies from "js-cookie";
import { storageSession } from "@pureadmin/utils";
//import { useUserStoreHook } from "@/store/modules/user";

export interface Team {
  owner: number;
  teamId: number;
  teamName: string;
  userId: number;
  nickname: string;
  name: string;
  phone: string;
  deptPath: string;
  deptId: number;
  postId: number;
  roles: string;
  gender: number;
  entryTime: Date | string;
  birthday: Date | string;
}

export interface TeamInfo {
  /** 选中的teamId */
  select: number;
  /** 团队列表 */
  teams?: Array<Team>;
}

export const sessionKey = "team-info";
//export const TokenKey = "team-info";

export function getTeamInfo() {
  return new Promise<TeamInfo>(resolve => {
    resolve(storageSession().getItem(sessionKey));
  });
}
/** 获取`团队` */
export function getTeams(): TeamInfo {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return storageSession().getItem(sessionKey);
  // return Cookies.get(TokenKey)
  //   ? JSON.parse(Cookies.get(TokenKey))
  //   : storageSession().getItem(sessionKey);
}

export function getCurTeamId(): number {
  return getTeams() ? getTeams().select : 0;
}

export function selectTeamId(teamId: number) {
  getTeams().select = teamId;
}

export function setTeams(data: Array<Team>, select?: number) {
  if (data && data.length > 0) {
    let curSelect = 0;
    if (select) {
      data.forEach(item => {
        if (item.teamId === select) {
          curSelect = select;
        }
      });
    }
    if (curSelect === 0) {
      curSelect = data[0].teamId;
    }
    storageSession().setItem(sessionKey, {
      select: curSelect,
      teams: data
    });
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeTeams() {
  //Cookies.remove(TokenKey);
  sessionStorage.removeItem(sessionKey);
}
