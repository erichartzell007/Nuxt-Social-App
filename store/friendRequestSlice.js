import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { useUnknownUsers } from "./unknownUsersSlice";
import { useToast } from "vue-toast-notification";

export const useFriendRequestsSlice = defineStore("friendRequestsSlice", {
  state: () => {
    return {
      receivedFriendRequests: { data: [], loading: false, error: null },
    };
  },

  actions: {
    async sendFriendRequest(otherPersonData) {
      const unknownUsersSlice = useUnknownUsers();

      try {
        const { $firestore } = useNuxtApp();
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const docRef = doc($firestore, "sentRequestsTo", currentUser.uid);

        await setDoc(
          doc($firestore, "users", currentUser.uid),
          {
            sentRequestTo: arrayUnion(otherPersonData.uid),
          },
          { merge: true }
        );
        await setDoc(
          doc($firestore, "users", otherPersonData.uid),
          {
            receivedRequestFrom: arrayUnion(currentUser.uid),
          },
          { merge: true }
        );

        unknownUsersSlice.$patch({
          singleProfile: { data: { sentRequest: true } },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async acceptFriendRequest(otherPersonUID) {
      const toast = useToast();
      let options = { position: "top-right", duration: 2000 };
      const { $firestore } = useNuxtApp();
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const docRef = doc($firestore, "users", currentUser.uid);
        const secondDocRef = doc($firestore, "users", otherPersonUID);

        toast.info("Accepting Request", options);

        await updateDoc(docRef, {
          receivedRequestFrom: arrayRemove(otherPersonUID),
          friendshipWith: arrayUnion(otherPersonUID),
        });

        await updateDoc(secondDocRef, {
          sentRequestTo: arrayRemove(currentUser.uid),
          friendshipWith: arrayUnion(currentUser.uid),
        });

        let updatedReceivedRequests = this.receivedFriendRequests.data.filter(
          (singleRequest) => {
            return singleRequest.uid !== otherPersonUID;
          }
        );

        toast.success("Request Accepted", options);
        this.receivedFriendRequests.data = updatedReceivedRequests;
      } catch (error) {
        console.log(error);
        toast.error("An Error Occured", options);
      }
    },

    async fetchFriendRequests() {
      try {
        this.receivedFriendRequests.loading = true;
        const { $firestore } = useNuxtApp();
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const docRef = doc($firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const uids = docSnap.data().receivedRequestFrom || [];
        console.log(uids);
        if (uids.length > 0) {
          uids.forEach((uid, index) => {
            const docRef = doc($firestore, "users", uid);
            getDoc(docRef)
              .then((snapshot) => {
                let updatedSnapshot = {
                  ...snapshot.data(),
                  isFriendRequest: true,
                };
                this.$patch({
                  receivedFriendRequests: {
                    data: [
                      ...this.receivedFriendRequests.data,
                      updatedSnapshot,
                    ],
                  },
                });
                if (index + 1 == uids.length) {
                  this.receivedFriendRequests.loading = false;
                }
              })
              .catch((error) => {
                this.receivedFriendRequests.loading = false;
                this.receivedFriendRequests.error =
                  "Error in fetching requests";
              });
          });
        } else {
          this.receivedFriendRequests.loading = false;
          this.receivedFriendRequests.error = "No received requests";
        }
      } catch (error) {
        console.log(error);
        this.receivedFriendRequests.loading = false;
        this.receivedFriendRequests.error = "Unexpected error occured";
      }
    },
  },
});
