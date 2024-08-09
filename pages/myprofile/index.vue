<script setup>
definePageMeta({ layout: "user" });

import { YourPosts, YourFriendRequests, YourFriends } from "@/views/MyProfile";
import { onMounted } from "vue";
import { useAfterLogin } from "~/store/afterLoginSlice";
const afterLoginSlice = useAfterLogin();

const route = useRoute();
const router = useRouter();
const { active } = route.query;
const dynamicComponents = [
  {
    component: YourFriends,
    text: "Your Friends",
    active: "your-friends",
  },
  {
    component: YourFriendRequests,
    text: "Your Friend Requests",
    active: "your-friend-requests",
  },
  {
    component: YourPosts,
    text: "Your Posts",
    active: "your-posts",
  },
];

const activeComponent = dynamicComponents.findIndex((singleComponent) => {
  return singleComponent.active == active;
});

const componentsIndex = ref(activeComponent == "-1" ? 0 : activeComponent);

onMounted(async () => {
  await afterLoginSlice.fetchPosts();
});
</script>

<template>
  <div class="space-y-4">
    <p class="text-center text-3xl">Profile</p>

    <div class="flex gap-x-5 text-lg font-medium">
      <div
        @click="
          () => {
            componentsIndex = index;
            router.push({
              query: { active: item.active },
            });
          }
        "
        class="bg-gray-1 px-5 py-2 cursor-pointer rounded-md"
        v-for="(item, index) in dynamicComponents"
      >
        {{ item.text }}
      </div>
    </div>

    <div class="pt-4">
      <component :is="dynamicComponents[componentsIndex].component" />
    </div>
  </div>
</template>
