<template>
  <div class="relative">
    <div
      class="relative hidden md:flex flex-auto items-center justify-center h-full p-16 px-28 overflow-hidden bg-gray-800 dark:border-l"
    >
      <svg
        viewBox="0 0 220 192"
        width="220"
        height="192"
        fill="none"
        class="absolute -top-16 -right-16 text-gray-700 ng-tns-c2775354380-1"
      >
        <defs class="ng-tns-c2775354380-1">
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            class="ng-tns-c2775354380-1"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              fill="currentColor"
              class="ng-tns-c2775354380-1"
            ></rect>
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          class="ng-tns-c2775354380-1"
        ></rect>
      </svg>
      <div class="font-bold text-7xl leading-none font-color-white">
        <div>
          <div>Welcome to</div>
          <div>our community</div>
        </div>
        <div class="text-gray-400 tracking-tight leading-6 text-lg mt-6">
          Fuse helps developers to build organized and well coded dashboards
          full of beautiful and rich modules. Join us and start building your
          application today.
        </div>

        <div class="flex items-center mt-8">
          <div class="flex flex-0 items-center -space-x-1.5">
            <image
              src="images/avatars/female-18.jpg"
              alt="Image"
              class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover"
            ></image
            ><image
              src="images/avatars/female-11.jpg"
              alt="Image"
              class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover"
            ></image
            ><image
              src="images/avatars/male-09.jpg"
              alt="Image"
              class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover"
            ></image
            ><image
              src="images/avatars/male-16.jpg"
              alt="Image"
              class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover"
            ></image>
          </div>
          <div class="ml-4 font-medium tracking-tight text-gray-400 text-md">
            More than 17k people joined us, it's your turn
          </div>
        </div>

        <div class="title">
          <h1>Login</h1>
        </div>
        <div class="container form">
          <label for="email" class="email"><b>Email</b></label>
          <InputText
            type="text"
            v-model="user.email"
            class="input"
            placeholder="Enter Email"
            name="email"
            required
          />

          <label for="psw" class="psw"><b>Password</b></label>
          <InputText
            type="text"
            v-model="user.password"
            class="input"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <button @click.prevent="login" class="button">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import InputText from "primevue/inputtext";

const { authenticateUser } = useAuthStore(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const user = ref({
  email: "demo@1tool.com",
  password: "1234",
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/note");
  }
};
</script>

<style lang="scss" scoped>
@import "public/styles/login/style.css";
</style>
<style lang="scss">
body {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(30 41 59 / 1) !important;
}
</style>
