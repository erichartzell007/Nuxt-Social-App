import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { currentUser } = getAuth();
  console.log(currentUser);
});
