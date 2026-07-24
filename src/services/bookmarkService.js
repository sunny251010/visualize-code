import {readJson, writeJson} from './storageService';

const STORAGE_KEY = 'visualize-code:bookmarks';

export const bookmarkService = {
  getBookmarks() {
    return readJson(STORAGE_KEY, []);
  },

  addBookmark({userId = 'anonymous', lessonId}) {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.some(
      (bookmark) => bookmark.userId === userId && bookmark.lessonId === lessonId,
    );

    if (exists) {
      return bookmarks;
    }

    const nextBookmarks = [
      ...bookmarks,
      {
        id: `bookmark_${userId}_${lessonId}`,
        userId,
        lessonId,
        createdAt: new Date().toISOString(),
      },
    ];

    writeJson(STORAGE_KEY, nextBookmarks);
    return nextBookmarks;
  },

  removeBookmark({userId = 'anonymous', lessonId}) {
    const nextBookmarks = this.getBookmarks().filter(
      (bookmark) =>
        !(bookmark.userId === userId && bookmark.lessonId === lessonId),
    );

    writeJson(STORAGE_KEY, nextBookmarks);
    return nextBookmarks;
  },
};
