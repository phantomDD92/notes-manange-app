<template>
  <div class="p-6">
    <div class="flex p-1">
      <div class="flex card w-full">
        <Menubar :model="items" />
        <Button label="Logout" icon="pi pi-user" text @click="logout()" />
      </div>
    </div>

    <div>
      <Button
        label="New"
        severity="success"
        @click="openNew"
        icon="pi pi-plus"
      />
    </div>

    <div class="flex justify-content-center">
      <!-- <ProgressSpinner aria-label="Loading" spinner="loading" /> -->
    </div>

    <div class="grid justify-items-start pt-5 justify-content-center">
      <div v-for="item in notes" class="p-1 cursor-pointer">
        <Card
          style="width: 25rem; overflow: hidden"
          @click="editNote(item)"
          class="bg-white"
        >
          <template #title><div v-html="item.title"></div></template>
          <template #content>
            <p class="m-0" v-html="item.content"></p>
          </template>
        </Card>
      </div>
    </div>

    <Dialog
      v-model:visible="noteDialog"
      :style="{ width: '850px' }"
      header="Notes Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="title">Title</label>
        <InputText
          id="title"
          v-model.trim="note.title"
          v-html="note.title"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !note.title }"
        />
        <small class="p-error" v-if="submitted && !note.title"
          >Title is required.</small
        >
      </div>
      <div class="field">
        <label for="content">Content</label>
        <!-- <Textarea
          id="content"
          v-model="note.content"
          v-html="note.content"
          :class="{ 'p-invalid': submitted && !note.content }"
          required="true"
          rows="10"
          cols="20"
        /> -->
        <Editor
          id="content"
          v-model="note.content"
          editorStyle="height: 320px"
          :class="{ 'p-invalid': submitted && !note.content }"
          required="true"
        />
        <small class="p-error" v-if="submitted && !note.content"
          >Content is required.</small
        >
      </div>

      <template #footer>
        <Button
          icon="pi pi-times"
          severity="danger"
          label="Delete"
          @click="confirmDeleteProduct(note)"
          v-if="note?.id"
        />
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveNote" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteNoteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="note"
          >Are you sure you want to delete <b>{{ note.title }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteNoteDialog = false"
        />
        <Button label="Yes" icon="pi pi-check" text @click="deleteNote" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteNotesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="note"
          >Are you sure you want to delete the selected notes?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteNotesDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          text
          @click="deleteSelectedNotes"
        />
      </template>
    </Dialog>

    <Toast />
  </div>
</template>

<script lang="ts" setup>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import Editor from "primevue/editor";
import ProgressSpinner from "primevue/progressspinner";

import { nextTick } from "vue";

import { useNoteStore } from "~/store/note";
import { useAuthStore } from "~/store/auth";

import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Notes",
    icon: "pi pi-star",
  },
]);

const note = ref({ id: "", title: "", content: "" });
const notes = ref();

const loading = ref(false);
const noteDialog = ref(false);
const deleteNoteDialog = ref(false);
const deleteNotesDialog = ref(false);
const selectedNotes = ref();
const toast = useToast();
const submitted = ref(false);

const {
  getNote,
  getNotes,
  createNotes,
  updateNote,
  deleteNoteId,
  deleteNotes,
} = useNoteStore(); // use note store
const { logUserOut } = useAuthStore(); // use note store

onMounted(async () => {
  await nextTick();

  loading.value = true;

  await getNotes().then(({ data, meta }) => {
    notes.value = data;
    loading.value = false;
  });
});

const confirmDeleteProduct = (prod) => {
  note.value = prod;
  deleteNoteDialog.value = true;
};

const openNew = () => {
  const note = ref({ id: "", title: "", content: "" });
  note.value = { id: "", title: "", content: "" };
  submitted.value = false;
  noteDialog.value = true;
};
const hideDialog = () => {
  note.value = { id: "", title: "", content: "" };
  noteDialog.value = false;
  submitted.value = false;
};

const saveNote = async () => {
  submitted.value = true;

  if (note.value.title.trim() || note.value.content.trim()) {
    if (note.value.id) {
      await updateNote(note.value);
      const { data } = await getNotes();
      notes.value = data;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Note Updated",
        life: 3000,
      });
    } else {
      await createNotes(note.value);
      const { data } = await getNotes();
      notes.value = data;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Note Created",
        life: 3000,
      });
    }

    noteDialog.value = false;
    note.value = { id: "", title: "", content: "" };
  }
};

const editNote = async (prod) => {
  // await getNote(prod);
  note.value = await getNote(prod);
  // note.value = prod;
  noteDialog.value = true;
};

const deleteNote = async () => {
  await deleteNoteId(note.value);
  const { data } = await getNotes();
  notes.value = data;
  noteDialog.value = false;
  deleteNoteDialog.value = false;
  note.value = { id: "", title: "", content: "" };
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Note Deleted",
    life: 3000,
  });
};

const deleteSelectedNotes = async () => {
  await deleteNotes(selectedNotes);
  const { data } = await getNotes();
  notes.value = data;
  deleteNotesDialog.value = false;
  selectedNotes.value = null;
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Notes Deleted",
    life: 3000,
  });
};

const logout = async () => {
  await logUserOut();
  return navigateTo("/");
};
</script>

<style lang="scss">
body {
  --tw-bg-opacity: 1 !important;
  background-color: #f1f5f9 !important;
}
</style>
