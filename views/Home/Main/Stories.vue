<script setup>
import { useGlobalSlice } from "~/store/globalSlice";
import "video.js/dist/video-js.css";

const globalSlice = useGlobalSlice();
</script>
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <p class="text-lg font-medium">Stories</p>
      <div class="text-secondary">Watch All</div>
    </div>

    <div class="flex gap-x-4">
      <div
        class="w-14 h-14 border-2 rounded-full border-dashed border-white"
      ></div>
      <div
        @click="globalSlice.toggleViewStory(true)"
        v-for="item in [1, 2, 3, 4, 5, 6]"
        class="w-14 h-14 rounded-full cursor-pointer bg-gradient-to-r from-[#800BFF] via-[#4C22D7] to-[#E10064] flex justify-center items-center"
      >
        <div class="w-[52px] h-[52px] rounded-full bg-primary">
          <img
            src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
            class="w-full h-full rounded-full max-w-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
