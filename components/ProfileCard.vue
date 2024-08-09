<script setup>
import { EnvelopeIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="flex gap-x-3 items-center">
    <div class="min-w-[40px] h-10 rounded-full bg-pink-500"></div>

    <div class="pr-4 text-xs">
      <p class="text-lg">Juria</p>
      <p>Juria</p>
    </div>

    <NuxtLink href="/messages" class="ml-auto">
      <EnvelopeIcon class="text-secondary w-5 h-5" />
    </NuxtLink>
  </div>
</template>
