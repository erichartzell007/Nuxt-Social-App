<script setup>
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";

const { postData } = defineProps(["postData"]);
</script>

<template>
  <div class="p-6 space-y-5 bg-gray-2 rounded-xl">
    <div class="flex">
      <div class="flex items-center gap-x-4">
        <div class="min-w-[56px] h-14 bg-purple-500 rounded-full">
          <img
            :src="
              postData.profilePicture ||
              'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
            "
            class="w-full h-full rounded-full max-w-full"
            alt=""
          />
        </div>
        <div>
          <p>Name Name</p>
          <p class="text-[#37353C] mt-0.5">@username</p>
        </div>
      </div>
      <div class="ml-auto"></div>
    </div>

    <Splide
      v-if="postData.images"
      :has-track="false"
      class="h-[350px] rounded-lg"
    >
      <SplideTrack class="h-full">
        <SplideSlide v-for="singleImage in postData.images" class="h-full">
          <img
            :src="singleImage"
            class="rounded-lg w-full h-full max-w-full"
            alt=""
          />
        </SplideSlide>
      </SplideTrack>
    </Splide>

    <p
      v-if="postData.description"
      class="w-[580px] leading-6 text-left text-sm"
    >
      {{ postData.description }}
    </p>

    <div v-if="postData.hashtags" class="flex text-secondary gap-x-2 text-sm">
      <p v-for="singleHashtag in stringsToHashtags(postData.hashtags)">
        #{{ singleHashtag }}
      </p>
    </div>

    <div class="flex gap-x-10 items-center text-sm">
      <div class="cursor-pointer flex gap-x-2 items-center">
        <HeartIcon class="w-6 h-6" />
        <p>1.12</p>
      </div>
      <div class="cursor-pointer flex gap-x-2 items-center">
        <ChatBubbleLeftEllipsisIcon class="w-6 h-6" />
        <p>2.3k</p>
      </div>
      <div class="cursor-pointer ml-auto">
        <BookmarkIcon class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>
