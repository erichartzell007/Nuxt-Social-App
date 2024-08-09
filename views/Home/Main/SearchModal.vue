<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useGlobalSlice } from "~/store/globalSlice";
import { useUnknownUsers } from "~/store/unknownUsersSlice";
const globalSlice = useGlobalSlice();
const unknownUsersSlice = useUnknownUsers();
const personName = ref("");

const searchPersonFieldRef = ref(null);
</script>
<template>
  <div
    style="transition: all 0.3s"
    class="absolute w-full h-full space-y-6 left-0 top-0 z-20 bg-[rgba(0,0,0,0.9)]"
    :class="
      globalSlice.showSearchModal
        ? 'visible opacity-100'
        : 'invisible opacity-0'
    "
  >
    <div
      class="w-[50.2%] mt-6 mx-auto rounded-lg flex items-center bg-gray-1 px-5"
    >
      <MagnifyingGlassIcon class="w-6 h-6" />

      <input
        ref="searchPersonFieldRef"
        @input="
          (event) => {
            personName = event.target.value;
          }
        "
        @keydown="
          (event) => {
            if (event.key === 'Enter') {
              unknownUsersSlice.searchPeople(personName);
            }
          }
        "
        type="text"
        id="searchPersons"
        placeholder="Type Name..."
        class="ml-4 py-3.5 outline-none w-full bg-transparent"
      />
    </div>
    <div class="w-[180px] mx-auto items-center flex justify-between">
      <div
        @click="unknownUsersSlice.searchPeople(personName)"
        class="px-5 py-2 cursor-pointer leading-normal rounded-md bg-white text-gray-2 font-medium"
      >
        Search
      </div>
      <XMarkIcon
        @click="globalSlice.showSearchModal = false"
        class="w-8 mx-auto cursor-pointer"
      />
    </div>

    <div
      class="w-[85%] mx-auto pt-3 flex text-center flex-wrap justify-center gap-4"
    >
      <CustomLoader v-if="unknownUsersSlice.searchedUsers.loading" />

      <SmallCards
        v-else
        v-for="singleResult in unknownUsersSlice.searchedUsers.data"
        :singleResult="singleResult"
      />
    </div>
  </div>
</template>
