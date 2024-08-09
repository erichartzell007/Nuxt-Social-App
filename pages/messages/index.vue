<script setup>
definePageMeta({ layout: "user" });
import { SentMessage, ReceivedMessage, MessageBox } from "@/views/Messages";
import { useAuthentication } from "~/store/authSlice";
import { useChatSlice } from "~/store/chatSlice";
import { useMyFriendsSlice } from "~/store/myFriendsSlice";
import moment from "moment";

const chatsSlice = useChatSlice();
const authSlice = useAuthentication();
const myFriendsSlice = useMyFriendsSlice();
const route = useRoute();
const chattingWith = computed(() => {
  return myFriendsSlice.myFriends.data.find((singleUser) => {
    return singleUser.uid == route.query.id;
  });
});

const elementsLength = ref(0);

const check = computed(() => {
  elementsLength.value = chatsSlice.messages.bothSidesMessages?.length || 0;
  return chatsSlice.messages.bothSidesMessages?.map((single) => {
    const messageTime = moment(single.timeStamp).format("h:mm a");

    return {
      ...single,
      component:
        single?.sentBy == authSlice.user.uid ? SentMessage : ReceivedMessage,
      messageTime,
    };
  });
});

watch(elementsLength, () => {
  document
    .querySelector("#scrollToBottom")
    .scrollTo(0, document.querySelector("#scrollToBottom").scrollHeight);
  document.querySelector("#messageField").value = "";
});
</script>

<template>
  <div
    class="h-[calc(100vh-25px)] p-4 bg-gray-2 w-full relative flex flex-col gap-5"
  >
    <div
      id="scrollToBottom"
      class="w-full flex flex-col gap-5 h-[90%] noScrollbar overflow-scroll"
    >
      <CustomLoader
        v-if="chatsSlice.messages.loading || myFriendsSlice.myFriends.data == 0"
      />
      <div
        class="text-3xl text-center font-medium absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        v-else-if="chatsSlice.messages.initialInfo"
      >
        {{ chatsSlice.messages.initialInfo }}
      </div>

      <div
        class="text-center text-3xl h-full flex items-center justify-center font-medium text-red-500"
        v-else-if="chatsSlice.messages.error"
      >
        {{ chatsSlice.messages.error }}
      </div>

      <div v-else class="w-full h-full flex flex-col gap-5">
        <div
          class="capitalize flex gap-x-4 border-b pb-3 border-gray-1 items-center"
        >
          <div class="min-w-[40px] h-10 rounded-full bg-green-500"></div>
          <div>{{ chattingWith?.name }}</div>
        </div>
        <component
          class="singleMessage"
          :is="checking.component"
          v-for="checking in check"
          :data="checking"
        />
      </div>
    </div>
    <MessageBox />
  </div>
</template>
