<script setup>
import * as yup from "yup";
import { Field, useForm } from "vee-validate";
import { useAuthentication } from "@/store/authSlice";
const inputFieldClasses = inject("inputFieldClasses");
const auth = useAuthentication();

const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required().email(),
  address: yup.string().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const profilePictureRef = ref(null);

const { values, meta, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const fieldsArray = computed(() => {
  return [
    { text: "name" },
    { text: "username" },
    { text: "email" },
    { text: "password", type: "password" },
    { text: "address" },
  ];
});

async function onSuccess(values) {
  console.log({ ...values, profilePicture: profilePictureRef.value });
  await auth.registeringUser(
    removeFalsyKeys({ ...values, profilePicture: profilePictureRef.value })
  );
}

const onSubmit = handleSubmit(onSuccess);
</script>

<template>
  <form @submit="onSubmit" class="mx-auto max-w-xs">
    <div v-for="singleField in fieldsArray" class="mb-3 space-y-2">
      <label :for="singleField.text" class="capitalize">{{
        singleField.text
      }}</label>
      <Field
        :class="inputFieldClasses"
        :name="singleField.text"
        :type="singleField.type ? singleField.type : 'text'"
      />
      <p
        v-if="errors[singleField.text]"
        class="mb-2 text-sm text-red-500 font-semibold"
      >
        {{ errors[singleField.text] }}
      </p>
    </div>

    <div class="w-full">
      <input
        @change="(event) => (profilePictureRef = event.target.files[0])"
        type="file"
        id="file-upload-button"
        hidden
      />

      <label
        for="file-upload-button"
        class="w-full px-5 py-3.5 flex justify-center rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
        >Choose File</label
      >
    </div>

    <button
      :disabled="!meta.valid"
      type="submit"
      class="tracking-wide font-semibold bg-indigo-500 disabled:bg-indigo-300 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    >
      <svg
        class="w-6 h-6 -ml-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
      <span class="ml-3">Register</span>
    </button>

    <p class="mt-6 text-xs text-gray-600 text-center">
      New here?
      <NuxtLink href="login" class="underline"> Go to Login </NuxtLink>
    </p>
  </form>
</template>
