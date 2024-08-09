import { createUserWithEmailAndPassword } from "firebase/auth";

export default function useFirebaseAuth() {
  const { $auth } = useNuxtApp();

  const registerUser = async (email, password) => {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        $auth,
        email,
        password
      );
      if (userCreds) {
        console.log(userCreds);

        return true;
      }
    } catch (error) {
      console.log("error aaguaaa");
      if (error instanceof Error) {
        // handle error
      }
      return false;
    }
    return false;
  };

  return {
    registerUser,
  };
}
