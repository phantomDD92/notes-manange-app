<template>
  <div class="p-6">
    <div class="flex p-1">
      <div class="card w-full">
        <Menubar :model="items" />
      </div>
    </div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNew"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedNotes || !selectedNotes.length"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="notes"
        v-model:selection="selectedNotes"
        dataKey="id"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      >
        <template #header>
          <div
            class="flex flex-wrap gap-2 align-items-center justify-content-between"
          >
            <h4 class="m-0">Manage Notes</h4>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column field="title" header="Title" style="min-width: 12rem"></Column>
        <Column
          field="content"
          header="Content"
          style="min-width: 16rem"
        ></Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editNote(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <!-- <Paginator
          v-model:first="firstPage"
          :rows="15"
          :totalRecords="totalCount"
          :rowsPerPageOptions="[15, 30]"
        ></Paginator> -->
    </div>

    <Dialog
      v-model:visible="noteDialog"
      :style="{ width: '450px' }"
      header="Notes Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="title">Title</label>
        <InputText
          id="title"
          v-model.trim="note.title"
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
        <Textarea
          id="content"
          v-model="note.content"
          :class="{ 'p-invalid': submitted && !note.content }"
          required="true"
          rows="3"
          cols="20"
        />
        <small class="p-error" v-if="submitted && !note.content"
          >Content is required.</small
        >
      </div>

      <template #footer>
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
  </div>
</template>

<script lang="ts" setup>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
// import Paginator from "primevue/paginator";
import { nextTick } from "vue";

import { useToast } from "primevue/usetoast";
import { useNoteStore } from "~/store/note";

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
// const totalCount = ref(0);
// const firstPage = ref(0);

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
} = useNoteStore(); // use auth store

onMounted(async () => {
  await nextTick();

  await getNotes().then(({ data, meta }) => {
    notes.value = data;
    // totalCount.value = meta.total;
    // firstPage.value = meta.current_page;
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
  note.value = await getNote(prod);
  noteDialog.value = true;
};

const deleteNote = async () => {
  await deleteNoteId(note.value);
  note.value = { id: "", title: "", content: "" };
  const { data } = await getNotes();
  notes.value = data;
  deleteNoteDialog.value = false;
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Note Deleted",
    life: 3000,
  });
};

const confirmDeleteSelected = () => {
  deleteNotesDialog.value = true;
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
</script>

<style lang="scss">
body {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(30 41 59 / 1) !important;
}
</style>
