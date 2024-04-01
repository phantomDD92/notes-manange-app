// store/note.ts

import { defineStore } from "pinia";

interface NotePayloadInterface {
  id: String;
  user_id: String;
  title: string;
  content: string;
  created_at: String;
  updated_at: String;
}

export const useNoteStore = defineStore("note", {
  state: () => ({}),
  actions: {
    async getNotes() {
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      const { data }: any = await useFetch(
        `https://my.1tool.com/suite/api/notes?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      return data?.value;
    },
    async getNote({ id }: NotePayloadInterface) {
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      const { data }: any = await useFetch(
        `https://my.1tool.com/suite/api/notes/${id}?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      console.log("data: ", data);
      console.log("data: 1===", data.value);
      return data?.value?.data;
    },
    async createNotes({ title, content }: NotePayloadInterface) {
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      await useFetch(
        `https://my.1tool.com/suite/api/notes?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`, // Include Bearer token in headers
          },
          body: {
            title,
            content,
          },
        }
      );
    },
    async updateNote({ id, title, content }: NotePayloadInterface) {
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      await useFetch(
        `https://my.1tool.com/suite/api/notes/${id}?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`, // Include Bearer token in headers
          },
          body: {
            title,
            content,
          },
        }
      );
    },
    async deleteNoteId({ id }: NotePayloadInterface) {
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      await useFetch(
        `https://my.1tool.com/suite/api/notes/${id}?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`, // Include Bearer token in headers
          },
        }
      );
    },
    async deleteNotes({ value }) {
      console.log("value: ", value);
      const ids = value.map((item: any) => item.id);
      console.log("ids: ", ids);
      const token = useCookie("token");
      const tenant_identifier = useCookie("tenant_identifier");
      await useFetch(
        `https://my.1tool.com/suite/api/notes?tenant_identifier=${tenant_identifier.value}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`, // Include Bearer token in headers
          },
          body: {
            ids,
          },
        }
      );
    },
  },
});
