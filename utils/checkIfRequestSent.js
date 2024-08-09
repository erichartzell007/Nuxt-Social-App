export default function checkIfRequestSent(searchedUsers) {
  // this function will check whether you have already sent the person a friend request or not

  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(searchedUsers);
  const updatedSearchedUsers = searchedUsers.map((singleUser) => {
    return singleUser.receivedRequestFrom?.includes(currentUser.uid)
      ? { ...singleUser, sentRequest: true }
      : { ...singleUser, sentRequest: false };
  });

  return updatedSearchedUsers;
}
