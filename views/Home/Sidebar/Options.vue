<script setup>
import {
  PencilSquareIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useAuthentication } from "~/store/authSlice";

const authSlice = useAuthentication();

const linksAndIcons = [
  { icon: HomeIcon, link: "/" },
  { icon: PencilSquareIcon, link: "/create-post" },
  { icon: UserCircleIcon, link: "/myprofile" },
  { icon: Cog6ToothIcon, link: "/settings" },
];
</script>

<template>
  <div class="space-y-3">
    <p class="font-medium text-lg">Options</p>
    <div class="flex justify-between flex-wrap">
      <NuxtLink v-for="item in linksAndIcons" :href="item.link">
        <component
          :is="item.icon"
          style="transition: all 0.3s"
          class="w-6 hover:text-secondary cursor-pointer"
        ></component>
      </NuxtLink>
      <div @click="authSlice.logoutPopup = true">
        <ArrowLeftStartOnRectangleIcon
          style="transition: all 0.3s"
          class="w-6 hover:text-secondary cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
