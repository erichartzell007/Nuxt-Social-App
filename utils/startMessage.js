import { useChatSlice } from "~/store/chatSlice";

export default function startMessage(singleResult) {
  const route = useRoute();
  const chatSlice = useChatSlice();
  const { uid } = route.params;
  const router = useRouter();

  chatSlice.messages.loading = false;
  chatSlice.messages.initialInfo = null;
  router.push({
    path: "/messages",
    query: {
      id: singleResult ? singleResult.uid : uid,
    },
  });
}
