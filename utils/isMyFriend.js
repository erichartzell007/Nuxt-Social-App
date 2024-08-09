import { useAuthentication } from "~/store/authSlice";

export default function isMyFriend(uid) {
  const authSlice = useAuthentication();
  console.log(authSlice.user);
  const isAFriend = authSlice.user.friendshipWith.find((singleFriend) => {
    return singleFriend == uid;
  });

  return isAFriend;
}
