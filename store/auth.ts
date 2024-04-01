// store/auth.ts

import { defineStore } from "pinia";

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch(
        "https://my.1tool.com/suite/api/auth/user",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            email,
            password,
          },
        }
      );
      this.loading = pending;

      if (data.value) {
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        const tenant_identifier = useCookie("tenant_identifier"); // useCookie new hook in nuxt 3
        const id = useCookie("id"); // useCookie new hook in nuxt 3
        token.value = data?.value?.api_token; // set token to cookie
        tenant_identifier.value = data?.value?.tenant_identifier; // set tenant_identifier to cookie
        id.value = data?.value?.id; // set id to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
