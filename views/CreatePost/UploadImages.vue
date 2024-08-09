<script setup>
import { useDropzone } from "vue3-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import { useAfterLogin } from "~/store/afterLoginSlice";

const afterLoginSlice = useAfterLogin();

const saveFiles = (files) => {
  console.log(files, "filesss");

  afterLoginSlice.$patch({ post: { images: files } });
};

function onDrop(acceptFiles, rejectReasons) {
  saveFiles(acceptFiles); // saveFiles as callback
  console.log(rejectReasons);
}

const { getRootProps, getInputProps, open } = useDropzone({ onDrop });
</script>

<template>
  <div class="h-full bg-gray-1">
    <div
      v-bind="getRootProps()"
      class="cursor-pointer flex justify-center items-center h-full"
    >
      <input name="images" id="images" v-bind="getInputProps()" />
      <ArrowUpTrayIcon class="w-10 h-10" />
      <!-- <p>Drop the files here ...</p> -->
    </div>
    <!-- <button @click="open">open</button> -->
  </div>
</template>
