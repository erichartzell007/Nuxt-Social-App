<script setup>
import { HomeIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="common-border-top space-y-5">
    <div
      v-for="item in [1, 2, 3, 4, 5]"
      style="transition: all 0.3s"
      class="hover:text-secondary flex gap-3 text-lg cursor-pointer"
    >
      <HomeIcon class="w-6 h-6" />
      <p>Home</p>
    </div>
  </div>
</template>
