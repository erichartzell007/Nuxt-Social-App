<script setup>
import { useAfterLogin } from "~/store/afterLoginSlice";
const afterLoginSlice = useAfterLogin();
</script>

<template>
  <div class="text-center">
    <CustomLoader v-if="afterLoginSlice.fetchedPostsLoader" />
    <div
      class="text-3xl text-red-500 font-medium"
      v-else-if="afterLoginSlice.fetchedPostsError"
    >
      {{ afterLoginSlice.fetchedPostsError }}
    </div>
    <div v-else-if="afterLoginSlice.fetchedPosts" class="space-y-5">
      <Post
        :postData="singlePost"
        v-for="singlePost in afterLoginSlice.fetchedPosts.posts"
      />
    </div>
  </div>
</template>
