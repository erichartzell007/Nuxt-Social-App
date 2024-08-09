<script setup>
definePageMeta({ layout: "user" });
import * as yup from "yup";
import { UploadImages } from "@/views/CreatePost";
import { useForm } from "vee-validate";
import { useAfterLogin } from "~/store/afterLoginSlice";

const afterLoginSlice = useAfterLogin();

const schema = yup.object({
  hashtags: yup.string(),
  description: yup.string().required(),
});

const { values, meta, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});
const [hashtags, hashtagsAttributes] = defineField("hashtags");
const [description, descriptionAttributes] = defineField("description");

async function onSuccess(values) {
  await afterLoginSlice.createPost({
    ...values,
    images: afterLoginSlice?.post?.images,
  });
}

const onSubmit = handleSubmit(onSuccess);
</script>

<template>
  <div class="space-y-14">
    <!--  -->
    <p class="text-center text-3xl">Create Post Here</p>

    <CustomLoader v-if="afterLoginSlice.postCreationLoader" />
    <form
      v-else
      @submit.prevent="onSubmit"
      class="gap-10 flex flex-col items-center"
    >
      <div class="flex justify-between flex-wrap gap-y-8 w-full">
        <div class="flex flex-col w-[calc(50%-7px)] gap-y-2">
          <label for="description">Description</label>
          <textarea
            v-model="description"
            v-bind="descriptionAttributes"
            name="description"
            class="w-full bg-gray-1 p-3 outline-none resize-none text-sm"
            id="description"
            rows="5"
          ></textarea>
          <p
            v-if="errors.description"
            class="text-sm text-red-500 font-semibold mb-2"
          >
            {{ errors.description }}
          </p>
        </div>
        <div class="flex flex-col w-[calc(50%-7px)] gap-y-2">
          <label for="images">Images</label>

          <UploadImages />
        </div>
        <div class="flex flex-col w-[calc(50%-7px)] gap-y-2">
          <label for="hashtags"
            >Hashtags <span class="text-xs">(seperate by comma)</span></label
          >
          <input
            v-model="hashtags"
            v-bind="hashtagsAttributes"
            name="hashtags"
            id="hashtags"
            type="text"
            class="bg-gray-1 [word-spacing:4px] outline-none p-3"
          />
          <p
            v-if="errors.hashtags"
            class="text-sm text-red-500 font-semibold mb-2"
          >
            {{ errors.hashtags }}
          </p>
        </div>
      </div>
      <button
        :disabled="!meta.valid"
        type="submit"
        style="transition: all 0.3s"
        class="disabled:bg-[#34303e70] flex justify-center items-center hover:bg-gray-2 mx-auto self-center px-5 py-4 bg-gray-1 rounded-lg"
      >
        Create Post
      </button>
    </form>
  </div>
</template>
