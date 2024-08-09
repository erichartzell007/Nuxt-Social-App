import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toast-notification";

export const useMyFriendsSlice = defineStore("myFriendsSlice", {
  state: () => {
    return {
      myFriends: { data: [], loading: false, error: null, disableFetch: false },
      myFriendsPosts: { data: [], loading: false, error: null },
    };
  },

  actions: {
    async fetchMyFriends(indicator) {
      if (indicator) {
        this.myFriends.disableFetch = true;
      }
      try {
        this.myFriends.loading = true;
        const { $firestore } = useNuxtApp();
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const docRef = doc($firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const uids = docSnap.data().friendshipWith || [];

        if (uids.length > 0) {
          uids.forEach((uid, index) => {
            const docRef = doc($firestore, "users", uid);
            getDoc(docRef)
              .then((snapshot) => {
                let updatedSnapshot = {
                  ...snapshot.data(),
                  isFriend: true,
                };
                this.$patch({
                  myFriends: {
                    data: [...this.myFriends.data, updatedSnapshot],
                  },
                });
                if (index + 1 == uids.length) {
                  this.myFriends.loading = false;
                }
              })
              .catch((error) => {
                throw new Error("Error occured");
              });
          });
        } else {
          this.myFriends.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async fetchFriendsPosts() {
      this.myFriendsPosts.loading = true;
      const toast = useToast();
      try {
        const { $firestore } = useNuxtApp();
        const currentUser = JSON.parse(localStorage.getItem("user"));
        let errorOccured = false;
        const docRef = doc($firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const uids = docSnap.data().friendshipWith || [];

        if (uids.length > 0) {
          uids.forEach((uid, index) => {
            const docRef = doc($firestore, "posts", uid);
            getDoc(docRef)
              .then((snapshot) => {
                if (index + 1 == uids.length) {
                  this.myFriendsPosts.loading = false;
                }
                this.$patch({
                  myFriendsPosts: {
                    data: [
                      ...this.myFriendsPosts.data,
                      ...snapshot.data().posts,
                    ],
                  },
                });
              })
              .catch((error) => {
                console.log("hereee");
                errorOccured = true;

                throw new Error("Error occured");
              });
          });
        } else {
          console.log("hereee 22222");

          this.myFriendsPosts.loading = false;
          throw new Error("No posts available. Please make friends");
        }
      } catch (error) {
        toast.error(error.message, { position: "top-right" });
      } finally {
        this.myFriendsPosts.loading = false;
      }
    },
  },
});
