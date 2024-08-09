<script setup>
const props = defineProps(["data"]);
</script>

<template>
  <div class="ml-auto space-y-2">
    <div
      class="px-4 py-3 leading-6 rounded-md bg-gray-1 items-center justify-between flex gap-x-2"
    >
      <div>{{ props.data.message }}</div>
      <div class="min-w-[32px] h-8 rounded-full bg-green-500"></div>
    </div>
    <div class="text-gray-1 font-medium text-right">
      {{ props.data.messageTime }}
    </div>
  </div>
</template>
