<template>
  <div class="common-border-top space-y-3">
    <p class="font-medium text-lg">Friend Suggestion</p>
    <div class="space-y-3">
      <ProfileCard v-for="items in [1, 2, 3]" />
    </div>
  </div>
</template>
