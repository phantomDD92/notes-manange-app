// middleware/auth.ts

import { useAuthStore } from "~/store/auth"; // import the auth store we just created

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (authenticated.value) {
    if (to?.name === "login") {
      return navigateTo("/note");
    }
    if (to?.name === "index") {
      return navigateTo("/note");
    }
  }

  // if token doesn't exist redirect to log in
  if (!authenticated.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
