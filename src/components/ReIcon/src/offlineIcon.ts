import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import UbuntuFill from "@iconify-icons/ri/ubuntu-fill";
import Menu from "@iconify-icons/ep/menu";
import Edit from "@iconify-icons/ep/edit";
import SetUp from "@iconify-icons/ep/set-up";
import TerminalWindowLine from "@iconify-icons/ri/terminal-window-line";
import Guide from "@iconify-icons/ep/guide";
import Card from "@iconify-icons/ri/bank-card-line";
import ListCheck from "@iconify-icons/ri/list-check";
import Histogram from "@iconify-icons/ep/histogram";
import Ppt from "@iconify-icons/ri/file-ppt-2-line";
import CheckboxCircleLine from "@iconify-icons/ri/checkbox-circle-line";
import FlUser from "@iconify-icons/ri/admin-line";
import Role from "@iconify-icons/ri/admin-fill";
import Setting from "@iconify-icons/ri/settings-3-line";
import Dept from "@iconify-icons/ri/git-branch-line";
import Monitor from "@iconify-icons/ep/monitor";
import Team from "@iconify-icons/ri/team-line";
import Bill from "@iconify-icons/ri/bill-line";
import Customer from "@iconify-icons/ri/user-star-line";
import Planet from "@iconify-icons/ri/planet-line";
import Task from "@iconify-icons/ri/task-line";
import CalendarCheck from "@iconify-icons/ri/calendar-check-line";
import OpenArm from "@iconify-icons/ri/open-arm-line";
import Table from "@iconify-icons/ri/table-line";
import Generate from "@iconify-icons/ri/ai-generate";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("ubuntuFill", UbuntuFill);
addIcon("menu", Menu);
addIcon("edit", Edit);
addIcon("setUp", SetUp);
addIcon("terminalWindowLine", TerminalWindowLine);
addIcon("guide", Guide);
addIcon("card", Card);
addIcon("listCheck", ListCheck);
addIcon("histogram", Histogram);
addIcon("ppt", Ppt);
addIcon("checkboxCircleLine", CheckboxCircleLine);
addIcon("flUser", FlUser);
addIcon("role", Role);
addIcon("setting", Setting);
addIcon("dept", Dept);
addIcon("monitor", Monitor);
addIcon("team", Team);
addIcon("bill", Bill);
addIcon("customer", Customer);
addIcon("planet", Planet);
addIcon("task", Task);
addIcon("calendarCheck", CalendarCheck);
addIcon("openArm", OpenArm);
addIcon("table", Table);
addIcon("generate", Generate);
