import { defineStore } from "pinia";

export const useGlobalSlice = defineStore("globalSlice", {
  state: () => {
    return {
      toggleStory: false,
      showSearchModal: false,
    };
  },

  actions: {
    async toggleViewStory(arg) {
      this.toggleStory = arg;
    },
  },
});
