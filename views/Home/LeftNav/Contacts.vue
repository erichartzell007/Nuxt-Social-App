<script setup>
import { useMyFriendsSlice } from "~/store/myFriendsSlice";

const myFriendsSlice = useMyFriendsSlice();

onMounted(async () => {
  if (myFriendsSlice.myFriends.data.length == 0) {
    await myFriendsSlice.fetchMyFriends(true);
  }
});
</script>
<template>
  <div class="common-border-top space-y-3">
    <p class="font-medium text-lg">Contacts</p>
    <div class="space-y-3">
      <ProfileCard v-for="items in myFriendsSlice.myFriends.data" />
    </div>
  </div>
</template>
