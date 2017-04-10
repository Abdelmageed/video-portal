export const initialState = {
  user: {
    loggingIn: false,
    loggingOut: false,
    login: {
      error: ''
    },
    username: '',
    sessionId: ''
  },
  videos: {
    items: [],
    loadedAll: false,
    loading: false
  },
  video: {}
};