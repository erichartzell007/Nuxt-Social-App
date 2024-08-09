<script setup>
import { useMyFriendsSlice } from "~/store/myFriendsSlice";

const myFriendsSlice = useMyFriendsSlice();
console.log(myFriendsSlice.myFriends.data);
onMounted(async () => {
  if (
    myFriendsSlice.myFriends.data.length == 0 &&
    !myFriendsSlice.myFriends.disableFetch
  ) {
    await myFriendsSlice.fetchMyFriends();
  }
});
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <CustomLoader v-if="myFriendsSlice.myFriends.loading" />
    <div
      v-else-if="myFriendsSlice.myFriends.error"
      class="text-4xl text-red-500 font-medium mx-auto"
    >
      {{ myFriendsSlice.myFriends.error }}
    </div>
    <SmallCards
      v-else
      :single-result="singleCard"
      v-for="singleCard in myFriendsSlice.myFriends.data"
    />
  </div>
</template>
