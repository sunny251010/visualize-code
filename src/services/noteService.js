import {readJson, writeJson} from './storageService';

const STORAGE_KEY = 'visualize-code:notes';

export const noteService = {
  getNotes({userId = 'anonymous', lessonId} = {}) {
    return readJson(STORAGE_KEY, []).filter((note) => {
      if (userId && note.userId !== userId) {
        return false;
      }

      return lessonId ? note.lessonId === lessonId : true;
    });
  },

  saveNote({userId = 'anonymous', lessonId, content}) {
    const notes = readJson(STORAGE_KEY, []);
    const now = new Date().toISOString();
    const existingNote = notes.find(
      (note) => note.userId === userId && note.lessonId === lessonId,
    );

    const nextNotes = existingNote
      ? notes.map((note) =>
          note.id === existingNote.id ? {...note, content, updatedAt: now} : note,
        )
      : [
          ...notes,
          {
            id: `note_${userId}_${lessonId}`,
            userId,
            lessonId,
            content,
            createdAt: now,
            updatedAt: now,
          },
        ];

    writeJson(STORAGE_KEY, nextNotes);
    return nextNotes;
  },
};
