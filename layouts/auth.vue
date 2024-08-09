<script setup>
import { useAuthentication } from "~/store/authSlice";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const auth = useAuthentication();

provide("$toast", $toast);

provide(
  "inputFieldClasses",
  "w-full px-5 py-3.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
);

watch(
  () => auth.error,
  (newValue, oldValue) => {
    $toast.error(auth.error, {
      position: "top-right",
    });
  }
);
</script>

<template>
  <div
    class="min-h-screen relative bg-gray-100 text-gray-900 flex justify-center"
  >
    <div
      class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-row-reverse justify-center flex-1"
    >
      <slot></slot>
    </div>
  </div>
</template>
