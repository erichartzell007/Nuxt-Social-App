<script setup>
import { useMyFriendsSlice } from "~/store/myFriendsSlice";
import "@splidejs/vue-splide/css";
const myFriendsSlice = useMyFriendsSlice();

onMounted(() => {
  myFriendsSlice.fetchFriendsPosts();
});
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between items-center">
      <p class="text-lg font-medium">Feed</p>
      <div class="text-secondary">Watch All</div>
    </div>

    <CustomLoader v-if="myFriendsSlice.myFriendsPosts.loading" />

    <div v-else class="space-y-5">
      <Post
        :post-data="singlePost"
        v-for="singlePost in myFriendsSlice.myFriendsPosts.data"
      />
    </div>
  </div>
</template>
