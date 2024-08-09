import {
  doc,
  arrayUnion,
  setDoc,
  serverTimestamp,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useToast } from "vue-toast-notification";

export const useChatSlice = defineStore("chatSlice", {
  state: () => {
    return {
      messages: {
        bothSidesMessages: null,
        loading: false,
        initialInfo: null,
        error: null,
      },
    };
  },

  actions: {
    async sendMessage(data) {
      const toast = useToast();
      if (this.messages.error) {
        toast.error("An error occured", {
          position: "top-right",
          duration: 2000,
        });
        return;
      }
      if (data.typedMessage.length == 0) {
        toast.error("Please enter a message", { position: "top-right" });
        return;
      }

      this.messages.initialInfo = null;
      const { $firestore } = useNuxtApp();
      const currentUser = JSON.parse(localStorage.getItem("user"));

      await setDoc(
        doc($firestore, "messages", `${currentUser.uid}/chats/${data.id}`),

        {
          details: arrayUnion({
            message: data.typedMessage,
            timeStamp: Date.now(),
          }),
        },
        { merge: true }
      );
    },

    async updatingLocally(bothSidesMessages, updatedDocSnap, updatedDocSnap2) {
      bothSidesMessages = [];
      bothSidesMessages.push(...updatedDocSnap, ...updatedDocSnap2);
      var sortedByTimestamp = bothSidesMessages.sort(
        (a, b) => a.timeStamp - b.timeStamp
      );

      if (sortedByTimestamp.length == 0) {
        this.messages.initialInfo = "No messages. Start conversation";
      }

      this.messages.bothSidesMessages = sortedByTimestamp;
    },

    async fetchMessages(data) {
      const toast = useToast();
      const { $firestore } = useNuxtApp();
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!data.id) {
        this.messages.loading = false;
        this.messages.error = "Invalid Request";
        toast.error("Invalid request", { position: "top-right" });
        return;
      }
      console.log("fethhh messagesss");
      if (!isMyFriend(data.id)) {
        console.log("hellloooo noww i should not be called");
        this.messages.loading = false;
        this.messages.error = "You both are not friends";
        return;
      }

      this.messages.loading = true;
      this.messages.error = null;

      try {
        let bothSidesMessages = [];
        let updatedDocSnap = [];
        let updatedDocSnap2 = [];
        onSnapshot(
          doc($firestore, "messages", `${currentUser.uid}/chats/${data.id}`),
          async (updated) => {
            updatedDocSnap =
              (await updated.data()?.details.map((singleMessage) => {
                return { ...singleMessage, sentBy: currentUser.uid };
              })) || [];
            this.updatingLocally(
              bothSidesMessages,
              updatedDocSnap,
              updatedDocSnap2
            );
          }
        );

        onSnapshot(
          doc($firestore, "messages", `${data.id}/chats/${currentUser.uid}`),
          async (updated) => {
            updatedDocSnap2 =
              (await updated.data()?.details.map((singleMessage) => {
                return { ...singleMessage, sentBy: data.id };
              })) || [];
            this.updatingLocally(
              bothSidesMessages,
              updatedDocSnap,
              updatedDocSnap2
            );
          }
        );
      } catch (error) {
        console.log(error);
        this.messages.error = "An unexpected error occured";
        this.messages.bothSidesMessages = [];
      } finally {
        this.messages.loading = false;
      }
    },
  },
});
