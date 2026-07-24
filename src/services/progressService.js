import {readJson, writeJson} from './storageService';

const STORAGE_KEY = 'visualize-code:learning-progress';

export const progressService = {
  getProgress() {
    return readJson(STORAGE_KEY, {});
  },

  recordLessonVisit({courseId, lessonId, path}) {
    const progress = this.getProgress();
    const nextProgress = {
      ...progress,
      activeCourseId: courseId,
      activeLessonId: lessonId,
      lastLessons: {
        ...(progress.lastLessons ?? {}),
        [courseId]: path,
      },
      updatedAt: new Date().toISOString(),
    };

    writeJson(STORAGE_KEY, nextProgress);
    return nextProgress;
  },

  recordHeading(path, headingId) {
    const progress = this.getProgress();
    const nextProgress = {
      ...progress,
      lastHeadings: {
        ...(progress.lastHeadings ?? {}),
        [path]: headingId,
      },
      updatedAt: new Date().toISOString(),
    };

    writeJson(STORAGE_KEY, nextProgress);
    return nextProgress;
  },
};
