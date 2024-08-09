import { openUploadModal } from "@bytescale/upload-widget-vue";
import { getAuth, updateProfile } from "firebase/auth";
import { AvatarGenerator } from "random-avatar-generator";
import { useAuthentication } from "~/store/authSlice";

const updatingProfilePicOnBackend = async (imageURL) => {
  const auth = getAuth();
  const authStore = useAuthentication();
  await updateProfile(auth.currentUser, {
    photoURL: imageURL.value,
  });

  authStore.user = auth.currentUser;
  localStorage.setItem("user", JSON.stringify(auth.currentUser));
};

export default function useUploadImage() {
  const generator = new AvatarGenerator();

  let imageURL = ref(null);
  const options = {
    apiKey: "public_12a1ymSEMqTZftir7Sk5q4pFYKZ3",
    maxFileCount: 1,
  };

  const uploadFile = (event, type) => {
    openUploadModal({
      event,
      options,
      onComplete: (files) => {
        if (files.length === 0) {
          // imageURL.value = generator.generateRandomAvatar();
        } else {
          imageURL.value = files.map((f) => f.fileUrl).join("\n");

          if (type == "updating") {
            updatingProfilePicOnBackend(imageURL);
          }
        }
      },
    });
  };

  return { imageURL, uploadFile };
}
