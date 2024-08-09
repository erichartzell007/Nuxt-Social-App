<script setup>
import { useFriendRequestsSlice } from "~/store/friendRequestSlice";

const friendRequestsSlice = useFriendRequestsSlice();

onMounted(async () => {
  if (friendRequestsSlice.receivedFriendRequests.data.length == 0) {
    await friendRequestsSlice.fetchFriendRequests();
  }
});
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <CustomLoader v-if="friendRequestsSlice.receivedFriendRequests.loading" />
    <div
      v-else-if="friendRequestsSlice.receivedFriendRequests.error"
      class="text-4xl text-red-500 font-medium mx-auto"
    >
      {{ friendRequestsSlice.receivedFriendRequests.error }}
    </div>
    <SmallCards
      v-else
      :single-result="singleCard"
      v-for="singleCard in friendRequestsSlice.receivedFriendRequests.data"
    />
  </div>
</template>
