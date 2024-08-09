<script setup>
import { onMounted } from "vue";
import { useUnknownUsers } from "@/store/unknownUsersSlice";
import { useGlobalSlice } from "~/store/globalSlice";
import { useFriendRequestsSlice } from "~/store/friendRequestSlice";
import { useAuthentication } from "~/store/authSlice";
definePageMeta({ layout: "user" });
const route = useRoute();

const unknownUsersSlice = useUnknownUsers();
const globalSlice = useGlobalSlice();
const authSlice = useAuthentication();
const friendRequestsSlice = useFriendRequestsSlice();
onMounted(async () => {
  globalSlice.showSearchModal = false;
  unknownUsersSlice.searchedUsers.data = [];
  await unknownUsersSlice.fetchSingleProfile({ uid: route.params.uid });
});

const isAlreadyFriends = computed(() => {
  return (
    unknownUsersSlice.singleProfile.data?.friendshipWith?.find((eachUID) => {
      return eachUID === authSlice.user.uid;
    }) || null
  );
});

const hasAlreadyReceivedRequest = computed(() => {
  return (
    unknownUsersSlice.singleProfile.data?.sentRequestTo?.find((eachUID) => {
      return eachUID === authSlice.user.uid;
    }) || null
  );
});

const { uid } = route.params;
const hasAlreadySentRequest = computed(() => {
  return (
    authSlice.user?.sentRequestTo?.find((eachUID) => {
      return eachUID === uid;
    }) || null
  );
});
</script>

<template>
  <div>
    <CustomLoader v-if="unknownUsersSlice.singleProfile.loading" />
    <div v-else-if="unknownUsersSlice.singleProfile.error">
      {{ unknownUsersSlice.singleProfile.error }}
    </div>

    <div v-else class="flex flex-col gap-y-4 items-center">
      <div class="w-20 h-20 rounded-full">
        <img
          :src="
            unknownUsersSlice.singleProfile.data.profilePicture ||
            'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
          "
          class="w-full h-full rounded-full object-cover max-w-full"
          alt=""
        />
      </div>
      <p>{{ unknownUsersSlice.singleProfile.data.name }}</p>

      <div
        @click="startMessage(unknownUsersSlice.singleProfile.data)"
        v-if="isAlreadyFriends"
        class="text-center px-5 py-3 cursor-pointer rounded-md inline bg-gray-1 font-medium"
      >
        Message
      </div>

      <!-- @click="
        friendRequestsSlice.sendFriendRequest(
          unknownUsersSlice.singleProfile.data
        )
      " -->
      <div
        v-else-if="hasAlreadyReceivedRequest"
        class="text-center px-5 py-3 cursor-pointer rounded-md inline bg-gray-1 font-medium"
      >
        Accept Request
      </div>

      <div
        v-else-if="hasAlreadySentRequest"
        class="text-center px-5 py-3 cursor-pointer rounded-md inline bg-gray-1 font-medium"
      >
        Request Sent
      </div>

      <div
        v-else
        @click="
          friendRequestsSlice.sendFriendRequest(
            unknownUsersSlice.singleProfile.data
          )
        "
        class="text-center px-5 py-3 cursor-pointer rounded-md inline bg-gray-1 font-medium"
      >
        Send Request
      </div>

      <!-- <div
        v-else
        class="text-center px-5 py-3 cursor-pointer rounded-md inline bg-gray-1 font-medium"
      >
        Request Sent
      </div> -->
    </div>
  </div>
</template>
