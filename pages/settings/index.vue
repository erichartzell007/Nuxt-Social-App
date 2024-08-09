<script setup>
definePageMeta({ layout: "user" });
import * as yup from "yup";
import { useForm, Field } from "vee-validate";
import { useAuthentication } from "~/store/authSlice";

const authSlice = useAuthentication();

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
});

const { values, meta, errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});
console.log(authSlice.user);

const fieldsArray = computed(() => {
  return [
    { text: "name", currentVal: authSlice.user.name },
    { text: "address", currentVal: authSlice.user.address },
  ];
});

async function onSuccess(values) {
  console.log(values);

  await authSlice.updateUserProfile(values);
}

const onSubmit = handleSubmit(onSuccess);
</script>

<template>
  <div class="space-y-4">
    <p class="text-center font-medium text-3xl">Edit Profile</p>

    <CustomLoader v-if="authSlice.updateProfileLoader" />
    <div
      class="flex flex-col gap-4 items-center text-2xl text-red-500 font-medium"
      v-else-if="authSlice.updateProfileError"
    >
      <p>Error in updating profile</p>
      <div
        class="bg-gray-1 rounded-md cursor-pointer text-sm px-5 py-2 text-white"
      >
        Go Back
      </div>
    </div>
    <form v-else @submit.prevent="onSubmit" class="space-y-6">
      <div class="flex justify-between">
        <div
          v-for="singleField in fieldsArray"
          class="flex flex-col gap-1.5 w-[calc(50%-8px)]"
        >
          <label class="text-lg capitalize">{{ singleField.text }}</label>
          <Field
            :name="singleField.text"
            :model-value="singleField.currentVal"
            class="bg-gray-1 py-2.5 px-3 rounded-md outline-none w-full"
          >
          </Field>
          <p
            v-if="
              Object.keys(errors).length > 0 &&
              errors.constructor === Object &&
              errors[singleField.text]
            "
            class="text-sm text-red-500 font-semibold mb-2"
          >
            {{ errors[singleField.text] }}
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <button type="submit" class="bg-gray-2 px-6 py-2.5 rounded-md">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
