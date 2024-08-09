import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useAuthentication } from "~/store/authSlice";

// when a user tries to sign in a to a provider (such as Google) with an email that already exists for another Firebase user's provider (such as Facebook), the error auth/account-exists-with-different-credential is thrown along with an AuthCredential object

const isExistedWithDifferentProvider = (error, $toast, provider) => {
  const authStore = useAuthentication();

  if (error.code === "auth/account-exists-with-different-credential") {
    authStore.error = "You already have a account on a different provider";
    authStore.$patch({ disableOAuth: { [provider]: true } });
    return true;
  }
};

export default function useOAuth() {
  const authStore = useAuthentication();
  const $toast = inject("$toast");
  const auth = getAuth();

  const redirectToGoogle = async () => {
    if (authStore.disableOAuth.google) {
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(user));
      authStore.user = user;
      await navigateTo("/");
    } catch (error) {
      authStore.error = "error aagyaa helloooo g ";
      isExistedWithDifferentProvider(error, $toast, "google");
    }
  };
  const redirectToTwitter = async () => {
    if (authStore.disableOAuth.twitter) {
      return;
    }
    const provider = new TwitterAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(user));

      authStore.user = user;
      await navigateTo("/");
    } catch (error) {
      authStore.error = "error aagyaa fromm twitterrrr";
      isExistedWithDifferentProvider(error, $toast, "twitter");
    }
  };
  return { redirectToGoogle, redirectToTwitter };
}
