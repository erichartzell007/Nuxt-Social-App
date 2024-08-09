<script setup>
import { useGlobalSlice } from "~/store/globalSlice";

const globalSlice = useGlobalSlice();
</script>

<template>
  <div
    @click="globalSlice.toggleViewStory(false)"
    class="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center"
  >
    <div class="relative w-[360px] h-[90%] rounded-lg bg-orange-500">
      <video
        ref="videoPlayer"
        class="video-js"
        style="
          position: absolute;
          min-width: 100%;
          min-height: 100%;
          left: 0;
          top: 0;
        "
        controls
        autoplay
        preload="auto"
        data-setup="{}"
      >
        <source src="~/assets/sample/video.mp4" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank"
            >supports HTML5 video</a
          >
        </p>
      </video>
    </div>
  </div>
</template>
