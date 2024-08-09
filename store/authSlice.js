import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

export const useAuthentication = defineStore("auth", {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      error: false,
      loading: false,
      disableOAuth: { google: false, twitter: false },
      logoutPopup: false,
      updateProfileLoader: false,
      updateProfileError: null,
    };
  },

  actions: {
    getUsersDefaultObj(data, additional) {
      delete data["password"];
      return {
        ...data,
        provider: "standard",
        totalPosts: 0,
        following: 0,
        followers: 0,
        ...additional,
      };
    },

    async fetchLatestProfile() {
      const { $firestore } = useNuxtApp();
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const docRef = doc($firestore, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      localStorage.setItem("user", JSON.stringify(docSnap.data()));

      this.user = docSnap.data();
    },

    async registeringUser(data) {
      this.loading = true;
      const { $auth, $firestore } = useNuxtApp();
      const auth = getAuth();

      try {
        const { user } = await createUserWithEmailAndPassword(
          $auth,
          data.email,
          data.password
        );

        await setDoc(doc($firestore, "messages", `${user.uid}`), {});

        await setDoc(doc($firestore, "posts", user.uid), { posts: [] });

        /* 
        
        - extract the profile picture 
        - upload it to firebase
        - get its downloadable url
        - append it in user object in users collection
        */
        if (data.profilePicture) {
          const storage = getStorage();
          console.log(data.profilePicture);
          const path = ref(
            storage,
            `images/profilePicture/${user.uid}/${data.profilePicture.name}`
          );
          await uploadBytes(path, data.profilePicture);
          await getDownloadURL(path).then((url) => {
            data["profilePicture"] = url;
          });
        }
        await setDoc(
          doc($firestore, "users", user.uid),
          this.getUsersDefaultObj(data, {
            uid: user.uid,
            profilePicture:
              "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
          }),
          { merge: true }
        );
        this.user = this.getUsersDefaultObj(data, { uid: user.uid });
        localStorage.setItem(
          "user",

          JSON.stringify(this.getUsersDefaultObj(data, { uid: user.uid }))
        );
        await navigateTo("/");
      } catch (error) {
        console.log(error);
        this.error = "An error occured";
      } finally {
        this.loading = false;
      }
    },

    async loginUser(data) {
      this.loading = true;
      const { $auth, $firestore } = useNuxtApp();

      try {
        const { user } = await signInWithEmailAndPassword(
          $auth,
          data.email,
          data.password
        );

        const docRef = doc($firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          localStorage.setItem("user", JSON.stringify(docSnap.data()));

          this.user = docSnap.data();
        }

        await navigateTo("/");
      } catch (error) {
        this.error = "An error occured";
      } finally {
        this.loading = false;
      }
    },

    async updateUserProfile(values) {
      this.updateProfileLoader = true;

      try {
        const { $firestore } = useNuxtApp();

        const currentUser = JSON.parse(localStorage.getItem("user"));
        const docRef = doc($firestore, "users", currentUser.uid);

        await setDoc(docRef, { name: values.name }, { merge: true });

        this.$patch({ user: { ...values } });
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        this.updateProfileError = "Error in updating profile";
      } finally {
        this.updateProfileLoader = false;
      }
    },

    async logoutUser() {
      const { $auth } = useNuxtApp();
      await signOut($auth);
      localStorage.removeItem("user");
      this.user = null;
      this.logoutPopup = false;
      await navigateTo("/auth/login");
    },
  },
});
