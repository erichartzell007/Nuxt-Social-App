import { defineStore } from "pinia";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useToast } from "vue-toast-notification";
import { useAuthentication } from "./authSlice";

export const useAfterLogin = defineStore("afterLogin", {
  state: () => {
    return {
      post: null,
      postCreationLoader: false,
      fetchedPosts: null,
      fetchedPostsLoader: false,
      fetchedPostsError: null,
    };
  },

  actions: {
    async createPost(data) {
      const toast = useToast();
      const authSlice = useAuthentication();
      this.postCreationLoader = true;
      try {
        const { $auth, $firestore } = useNuxtApp();
        const { currentUser } = $auth;
        const post = removeFalsyKeys(data);
        let imageURLS = [];
        if (data.images || data.images?.length > 0) {
          const storage = getStorage();
          const imagesToUpload = data.images.map(async (singleImage) => {
            const path = ref(
              storage,
              `images/${currentUser.uid}/${singleImage.name}`
            );
            await uploadBytes(path, singleImage);
            await getDownloadURL(path).then((url) => {
              imageURLS.push(url);
            });
          });
          await Promise.all(imagesToUpload);
          post["images"] = imageURLS;
        }
        await updateDoc(doc($firestore, "posts", currentUser.uid), {
          posts: arrayUnion({
            ...post,
          }),
        });
        await updateDoc(doc($firestore, "users", currentUser.uid), {
          totalPosts: authSlice.user.totalPosts + 1,
        });
        authSlice.$patch({
          user: { totalPosts: authSlice.user.totalPosts + 1 },
        });
        toast.success("Post created successfully", { position: "top-right" });
      } catch (error) {
        toast.error("Error in creating post", { position: "top-right" });
      } finally {
        this.postCreationLoader = false;
      }
    },

    async fetchPosts() {
      const { $firestore } = useNuxtApp();
      try {
        this.fetchedPostsLoader = true;
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const docRef = doc($firestore, "posts", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.fetchedPosts = docSnap.data();

          if (docSnap.data()?.posts?.length == 0) {
            this.fetchedPostsError = "No posts exists";
          }
        }
      } catch (error) {
        this.fetchedPostsError = "Error in fetching posts";
      } finally {
        this.fetchedPostsLoader = false;
      }
    },
  },
});
