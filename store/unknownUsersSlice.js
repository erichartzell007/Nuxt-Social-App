import { defineStore } from "pinia";

import {
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
import { useToast } from "vue-toast-notification";

export const useUnknownUsers = defineStore("unknownUsers", {
  state: () => {
    return {
      singleProfile: { data: null, loading: true, error: null },
      searchedUsers: { data: null, loading: false, error: null },
    };
  },

  actions: {
    async fetchSingleProfile(data) {
      this.singleProfile.loading = true;
      const { $firestore } = useNuxtApp();

      try {
        const docRef = doc($firestore, "users", data.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.singleProfile.data = checkIfRequestSent([docSnap.data()])[0];
        }
      } catch (error) {
        this.singleProfile.error = "error in fetching profile";
      } finally {
        this.singleProfile.loading = false;
      }
    },

    async searchPeople(personName) {
      this.searchedUsers.loading = true;
      const toast = useToast();

      try {
        const { $firestore } = useNuxtApp();

        if (personName.length <= 2) {
          throw new Error("Please enter 3 or more characters");
        }

        let usersArray = [];
        const q = query(
          collection($firestore, "users"),
          // where("name", "==", personName)
          where("name", ">=", personName),
          where("name", "<", personName + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        if (querySnapshot.empty) {
          this.searchedUsers.data = null;
          throw new Error("This user does not exist");
        } else {
          querySnapshot.forEach((doc) => {
            usersArray.push(doc.data());
          });

          this.searchedUsers.data = checkIfRequestSent(usersArray);
        }
      } catch (error) {
        toast.error(error.message, { duration: 3000, position: "top-right" });
      } finally {
        this.searchedUsers.loading = false;
      }
    },
  },
});
