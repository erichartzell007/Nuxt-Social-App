import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBudg8GbnRaCRG192NdKcb87Yt7KzuMyxc",
    authDomain: "social-media-11af5.firebaseapp.com",
    projectId: "social-media-11af5",
    storageBucket: "social-media-11af5.appspot.com",
    messagingSenderId: "246342946316",
    appId: "1:246342946316:web:0057631136ad4acc13a829",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);

  nuxtApp.vueApp.provide("storage", storage);
  nuxtApp.provide("storage", storage);
});
