<script setup>
import { useAuthentication } from "~/store/authSlice";

const authSlice = useAuthentication();
</script>

<template>
  <div class="flex flex-col text-center items-center gap-3">
    <div class="relative w-20 h-20 rounded-full">
      <img
        :src="
          authSlice.user.profilePicture ||
          'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
        "
        class="w-full h-full rounded-full object-cover max-w-full"
        alt=""
      />
      <div
        class="absolute right-0 bottom-1 w-5 h-5 rounded-full border-2 border-white bg-[#31C48D]"
      ></div>
    </div>

    <div class="space-y-1.5">
      <p>{{ authSlice.user.name }}</p>
      <p>{{ authSlice.user.address }}</p>
      <p>{{ authSlice.user.uid }}</p>
    </div>
    <div class="flex justify-between w-full">
      <div class="space-y-1">
        <p>{{ authSlice.user.totalPosts }}</p>
        <p>Post</p>
      </div>
      <div class="space-y-1">
        <p>{{ authSlice.user.followers }}</p>
        <p>Followers</p>
      </div>
      <div class="space-y-1">
        <p>{{ authSlice.user.following }}</p>
        <p>Following</p>
      </div>
    </div>
  </div>
</template>
