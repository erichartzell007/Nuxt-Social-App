import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const fetchChartsData = defineStore("charts", () => {
  const chartsData = ref([]);
  const isError = ref(false);
  const loading = ref(true);
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://api.npoint.io/c77c268f13f8638bff6f"
      );

      chartsData.value = response.data.chartsData;
    } catch (error) {
      isError.value = error.message;
    } finally {
      loading.value = false;
    }
  }

  return { chartsData, isError, loading, fetchData };
});
