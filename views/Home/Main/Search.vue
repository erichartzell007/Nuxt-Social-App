<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { useGlobalSlice } from "~/store/globalSlice";
const globalSlice = useGlobalSlice();
</script>

<template>
  <div class="rounded-lg flex items-center bg-gray-1 px-5">
    <MagnifyingGlassIcon class="w-6 h-6" />
    <input
      type="text"
      @click="
        (event) => {
          globalSlice.showSearchModal = true;
        }
      "
      placeholder="Search..."
      class="ml-4 py-3.5 outline-none w-full bg-transparent"
    />
  </div>
</template>
