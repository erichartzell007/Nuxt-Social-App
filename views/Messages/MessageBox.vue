<script setup>
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { useChatSlice } from "@/store/chatSlice";
import { useMyFriendsSlice } from "~/store/myFriendsSlice";

const chatSlice = useChatSlice();
const route = useRoute();
const { id } = route.query;
const typedMessage = ref("");

onMounted(() => {
  chatSlice.fetchMessages({ id });
});
</script>

<template>
  <div class="absolute w-full px-4 flex gap-x-4 bottom-3 items-center left-0">
    <input
      type="text"
      v-model="typedMessage"
      id="messageField"
      :disabled="chatSlice.messages.error"
      class="w-full bg-gray-1 outline-none px-3 py-3 rounded-lg"
      @keydown="
        (event) => {
          if (event.key === 'Enter') {
            chatSlice.sendMessage({
              id,
              typedMessage,
            });
          }
        }
      "
    />
    <button
      :disabled="chatSlice.messages.error"
      @click="
        (event) => {
          chatSlice.sendMessage({
            id,
            typedMessage,
          });
        }
      "
      class="w-12 h-12 disabled:cursor-default justify-center items-center flex cursor-pointer"
    >
      <PaperAirplaneIcon class="w-[60%] -rotate-45" />
    </button>
  </div>
</template>
