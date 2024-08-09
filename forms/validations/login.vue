<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useAuthentication } from "@/store/authSlice";
const inputFieldClasses = inject("inputFieldClasses");
const auth = useAuthentication();

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const { values, meta, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});
const [email, emailAttributes] = defineField("email");
const [password, passwordAttributes] = defineField("password");

async function onSuccess(values) {
  await auth.loginUser(values);
}
function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <form @submit="onSubmit" class="mx-auto max-w-xs">
    <input
      :class="inputFieldClasses"
      v-model="email"
      v-bind="emailAttrs"
      type="email"
      placeholder="Email"
    />
    <p v-if="errors.email" class="mb-2 text-sm text-red-500 font-semibold">
      {{ errors.email }}
    </p>

    <input
      :class="inputFieldClasses"
      v-model="password"
      v-bind="passwordAttributes"
      type="password"
      placeholder="Password"
    />

    <p v-if="errors.password" class="text-sm text-red-500 font-semibold mb-2">
      {{ errors.password }}
    </p>

    <button
      :disabled="!meta.valid"
      type="submit"
      class="tracking-wide font-semibold bg-indigo-500 disabled:bg-indigo-300 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    >
      <svg
        class="w-6 h-6 -ml-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="{2}"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
      <span class="ml-3">Login</span>
    </button>

    <p class="mt-6 text-xs text-gray-600 text-center">
      New to Shop Envy?
      <NuxtLink href="register" class="underline">
        Go to Register Page
      </NuxtLink>
    </p>
  </form>
</template>
