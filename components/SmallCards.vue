<script setup>
import { useFriendRequestsSlice } from "~/store/friendRequestSlice";

const props = defineProps(["singleResult"]);
const friendRequestsSlice = useFriendRequestsSlice();
</script>

<template>
  <div
    class="px-2 py-4 bg-gray-1 w-[calc(25%-10px)] rounded-md flex justify-center items-center flex-col gap-3"
  >
    <div class="w-12 h-12 rounded-full">
      <img
        :src="
          singleResult.profilePicture ||
          'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
        "
        class="w-full h-full max-w-full rounded-full"
        alt=""
      />
    </div>

    <p>{{ props.singleResult.name }}</p>

    <NuxtLink
      :href="'/profile/' + props.singleResult.uid"
      class="px-3 py-3 cursor-pointer rounded-md text-sm bg-black"
    >
      Visit Profile
    </NuxtLink>

    <div
      v-if="singleResult?.isFriendRequest"
      @click="friendRequestsSlice.acceptFriendRequest(singleResult.uid)"
      class="px-3 py-3 cursor-pointer rounded-md text-sm bg-black"
    >
      Accept Request
    </div>

    <div
      @click="startMessage(singleResult)"
      v-if="singleResult?.isFriend"
      class="px-3 py-3 cursor-pointer rounded-md text-sm bg-black"
    >
      Message
    </div>
  </div>
</template>
