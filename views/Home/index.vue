<script setup>
import { useGlobalSlice } from "~/store/globalSlice";
import Main from "./Main/index.vue";
import StoriesModal from "./Main/StoriesModal.vue";

const globalSlice = useGlobalSlice();
</script>
<template>
  <Main />
  <StoriesModal v-if="globalSlice.toggleStory" />
</template>
