<script setup>
import LeftNav from "@/views/Home/LeftNav";
import Sidebar from "@/views/Home/Sidebar";
import SearchModal from "@/views/Home/Main/SearchModal.vue";
import { useAuthentication } from "~/store/authSlice";

const authSlice = useAuthentication();

if (!authSlice.user) {
  navigateTo("/auth/login");
} else {
  authSlice.fetchLatestProfile();
}
</script>

<template>
  <div v-if="authSlice.user" class="bg-primary p-6 text-white flex relative">
    <div
      v-if="authSlice.logoutPopup"
      class="fixed w-full h-full bg-[rgba(0,0,0,0.9)] left-0 top-0 z-20 flex justify-center items-center"
    >
      <div
        class="bg-gray-2 flex-col gap-y-5 flex w-[400px] py-7 rounded-md justify-center items-center"
      >
        <p class="text-xl">Do you want to logout?</p>
        <div class="flex gap-x-5">
          <div
            @click="authSlice.logoutUser"
            class="px-6 py-2 rounded-md bg-gray-1 cursor-pointer"
          >
            YES
          </div>
          <div
            @click="authSlice.logoutPopup = false"
            class="px-6 py-2 rounded-md bg-gray-1 cursor-pointer"
          >
            NO
          </div>
        </div>
      </div>
    </div>

    <SearchModal />

    <LeftNav />
    <div class="w-[64%] px-10">
      <slot></slot>
    </div>
    <Sidebar />
  </div>
</template>
