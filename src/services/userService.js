import {mockUserProfiles} from '@site/src/data/mockDatabase';

export const userService = {
  getCurrentUserProfile() {
    return undefined;
  },

  getUserProfile(userId) {
    return mockUserProfiles.find((profile) => profile.id === userId);
  },
};
