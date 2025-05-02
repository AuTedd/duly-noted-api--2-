import cuid from "cuid";
import { saveNotes, getNotes } from "./notes.js";

export default {
  Mutation: {
    async createNote(_, args) {
      const savedNotes = await getNotes();
      const { note } = args;
      const newNote = { ...note };

      if (!newNote.id) {
        newNote.id = cuid();
      }

      if (!newNote.createdAt) {
        const now = new Date();
        newNote.createdAt = now.toISOString();
      }

      if (!newNote.updatedAt) {
        const now = new Date();
        newNote.updatedAt = now.toISOString();
      }

      if (typeof newNote.isArchived !== "boolean") {
        newNote.isArchived = false;
      }

      savedNotes.push(newNote);
      await saveNotes(savedNotes);
      return newNote;
    },

    async updateNote(_, args) {
      const savedNotes = await getNotes();
      const note = savedNotes.find((note) => note.id === args.id);

      if (note.id != null) {
        if (typeof args.note.isArchived === "boolean") {
          const now = new Date();
          note.updatedAt = now.toISOString();
          note.isArchived = args.note.isArchived;
        }

        if (typeof args.note.text === "string") {
          const now = new Date();
          note.updatedAt = now.toISOString();
          note.text = args.note.text;
        }
      }

      await saveNotes(savedNotes);
      return note;
    },

    async deleteNote(_, args) {
      const savedNotes = await getNotes();
      const note = savedNotes.find((note) => note.id === args.id);

      if (note.id != null) {
        savedNotes.splice(savedNotes.indexOf(note), 1);
      }

      await saveNotes(savedNotes);
      return note;
    }
  },

  Query: {
    async note(_, args) {
      const savedNotes = await getNotes();
      return savedNotes.find((note) => note.id === args.id);
    },

    async notes(_, args) {
      const savedNotes = await getNotes();
      let filterNotes = savedNotes.filter((note) => note.isArchived !== true);

      if (args.includeArchived) {
        return savedNotes;
      } else {
        return filterNotes;
      }
    }
  }
};