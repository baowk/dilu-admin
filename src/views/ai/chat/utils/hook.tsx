import dayjs from "dayjs";
import { message } from "@/utils/message";
import { type ChatReq, Message, chat } from "@/api/ai/chat";
//import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useChat() {
  const qform = reactive({
    platform: null,
    model: null,
    messages: null,
    message: null
  });
  //const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  //const switchLoadMap = ref({});
  //const { switchStyle } = usePublicHooks();
  // const pagination = reactive<PaginationProps>({
  //   total: 0,
  //   pageSize: 10,
  //   currentPage: 1,
  //   background: true
  // });

  const platformOptions = [
    {
      value: "ali",
      label: "阿里云"
    }
  ];

  const modelOptions = [
    {
      value: "qwen-turbo",
      label: "千问Turbo"
    },
    {
      value: "qwen-plus",
      label: "千问plus"
    },
    {
      value: "qwen-max",
      label: "千问max"
    },
    {
      value: "qwen-14b-chat",
      label: "千问14bChat"
    },
    {
      value: "qwen-7b-chat",
      label: "千问7bChat"
    },
    {
      value: "llama2-7b-chat-v2",
      label: "llama2-7b-chat-v2"
    },
    {
      value: "llama2-13b-chat-v2",
      label: "llama2-13b-chat-v2"
    }
  ];

  function onChat() {
    const msg: Message = {
      role: "user",
      content: qform.message
    };
    dataList.value.push(msg);
    const msgs = dataList.value.slice(-2);
    chat({
      platform: qform.platform,
      model: qform.model,
      messages: msgs
    }).then(res => {
      if (res.code === 200) {
        dataList.value.push({ role: "assistant", content: res.data });
      }
    });
    setTimeout(() => {
      qform.message = null;
      loading.value = false;
    }, 500);
  }

  // function handleSizeChange(val: number) {
  //   //qform.pageSize = val;
  //   onSearch();
  // }

  // function handleCurrentChange(val: number) {
  //   //qform.page = val;
  //   onSearch();
  // }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    // loading.value = true;
    // const { code, msg, data } = await getTaskPage(toRaw(qform));
    // if (code !== 200) {
    //   loading.value = false;
    //   message(msg, { type: "error" });
    //   return;
    // }
    // dataList.value = data.list;
    // // pagination.total = data.total;
    // // pagination.pageSize = data.pageSize;
    // // pagination.currentPage = data.currentPage;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    qform,
    loading,
    dataList,
    platformOptions,
    modelOptions,
    onChat,
    onSearch,
    resetForm,
    // handleSizeChange,
    // handleCurrentChange,
    handleSelectionChange
  };
}
