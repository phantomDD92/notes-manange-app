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
        <!-- <div>
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div class="text-gray-400 tracking-tight leading-6 text-lg mt-6">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </div>
  
          <div class="flex items-center mt-8">
            <div
              class="flex flex-0 items-center -space-x-1.5 ng-tns-c2775354380-1"
            >
              <image
                src="images/avatars/female-18.jpg"
                class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover ng-tns-c2775354380-1"
              /><image
                src="images/avatars/female-11.jpg"
                class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover ng-tns-c2775354380-1"
              /><image
                src="images/avatars/male-09.jpg"
                class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover ng-tns-c2775354380-1"
              /><image
                src="images/avatars/male-16.jpg"
                class="flex-0 w-10 h-10 rounded-full ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-800 object-cover ng-tns-c2775354380-1"
              />
            </div>
            <div class="ml-4 font-medium tracking-tight text-gray-400 text-md">
              More than 17k people joined us, it's your turn
            </div>
          </div> -->

        <div class="title">
          <h1>Login</h1>
        </div>
        <div class="container form">
          <label for="uname" class="uname"><b>Username</b></label>
          <!-- <input
              v-model="user.username"
              type="text"
              class="input username"
              placeholder="Enter Username"
              name="uname"
              required
            /> -->
          <InputText
            type="text"
            v-model="user.username"
            class="input"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label for="psw" class="psw"><b>Password</b></label>
          <!-- <input
              v-model="user.password"
              type="password"
              class="input"
              placeholder="Enter Password"
              name="psw"
              required
            /> -->
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
  username: "1tool.com",
  password: "1234",
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>

<style lang="scss">
.text-gray-700 {
  --tw-text-opacity: 1 !important;
  color: rgb(51 65 85 / 1) !important;
}
.font-bold {
  font-weight: 700 !important;
}
.text-7xl {
  font-size: 3rem !important;
}
.leading-none {
  line-height: 1 !important;
}
.bg-gray-800 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(30 41 59 / 1) !important;
}
html {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(30 41 59 / 1) !important;
}
.overflow-hidden {
  overflow: hidden !important;
}
.justify-center {
  justify-content: center !important;
}
.items-center {
  align-items: center !important;
}
.flex-auto {
  flex: 1 1 auto !important;
}
.h-full {
  height: 100% !important;
}
.font-color-white {
  color: white;
}
.text-gray-400 {
  --tw-text-opacity: 1 !important;
  color: rgb(148 163 184 / 1) !important;
}
.tracking-tight {
  letter-spacing: -0.025em !important;
}
.leading-6 {
  line-height: 1.5rem !important;
}
.text-lg {
  font-size: 1.2rem !important;
}
.mt-6 {
  margin-top: 1.5rem !important;
}
.flex {
  display: flex !important;
}
.mt-8 {
  margin-top: 2rem !important;
}
.flex-0 {
  flex: 0 0 auto !important;
}
.ring-offset-gray-800 {
  --tw-ring-offset-color: #1e293b !important;
}
.ring-offset-1 {
  --tw-ring-offset-width: 1px !important;
}
.ring-gray-800 {
  --tw-ring-opacity: 1 !important;
  --tw-ring-color: rgb(30 41 59 / 1) !important;
}
.ring-4 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000) !important;
}
.object-cover {
  object-fit: cover !important;
}
.rounded-full {
  border-radius: 9999px !important;
}
.w-10 {
  width: 2.5rem !important;
}
.h-10 {
  height: 2.5rem !important;
}
.md\:flex {
  display: flex !important;
}
.p-16 {
  padding: 4rem !important;
}
.bg-gray-800 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(30 41 59 / 1) !important;
}
.overflow-hidden {
  overflow: hidden !important;
}
.justify-center {
  justify-content: center !important;
}
.items-center {
  align-items: center !important;
}
.flex-auto {
  flex: 1 1 auto !important;
}
.h-full {
  height: 100% !important;
}
.relative {
  position: relative !important;
}
.text-gray-400 {
  --tw-text-opacity: 1 !important;
  color: rgb(148 163 184 / 1) !important;
}
.tracking-tight {
  letter-spacing: -0.025em !important;
}
.font-medium {
  font-weight: 500 !important;
}
.ml-4 {
  margin-left: 1rem !important;
}
.text-md {
  font-size: 1rem;
}
.text-gray-700 {
  --tw-text-opacity: 1 !important;
  color: rgb(51, 65, 85) !important;
}
.absolute {
  position: absolute !important;
}
.text-gray-700 {
  color: var(--gray-700);
}
.-top-16 {
  top: -4rem !important;
}
.-right-16 {
  right: -4rem !important;
}
.\!absolute,
.absolute {
  position: absolute !important;
}

.title {
  display: flex;
  justify-content: center;
  padding-top: 150px;
}

.title h1 {
  font-size: 3rem;
}
.container {
  padding: 16px;
}
.form {
  border: 3px solid #f1f1f1;
  border-radius: 10px;
  .input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .button {
    background-color: #04aa6d;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.8;
  }
  .cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }

  span.psw {
    float: right;
    padding-top: 16px;
  }

  .uname {
    b {
      font-size: 1.2rem;
    }
  }
  .psw {
    b {
      font-size: 1.2rem;
    }
  }

  /* Change styles for span and cancel button on extra small screens */
  @media screen and (max-width: 300px) {
    span.psw {
      display: block;
      float: none;
    }
    .cancelbtn {
      width: 100%;
    }
  }
}
</style>
