<script setup>
const props = defineProps(["data"]);
</script>

<template>
  <div class="mr-auto space-y-2">
    <div
      class="px-4 py-3 leading-6 rounded-md bg-gray-1 items-center justify-between flex gap-x-2"
    >
      <div class="min-w-[32px] h-8 rounded-full bg-green-500"></div>

      <div>{{ props.data.message }}</div>
    </div>
    <div class="text-gray-1 font-medium text-left">
      {{ props.data.messageTime }}
    </div>
  </div>
</template>
