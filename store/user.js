export const state = () => ({
  uid: null,
  userName: null,
  totalWorkTime: null,
  photoURL: null,
})

export const getters = {
  uid: (state) => state.uid,
  userName: (state) => state.userName,
  totalWorkTime: (state) => state.totalWorkTime,
  photoURL: (state) => state.photoURL,
}

export const mutations = {
  updateUid(state, uid) {
    state.uid = uid
  },
  updateUserName(state, userName) {
    state.userName = userName
  },
  updateTotalWorkTime(state, totalWorkTime) {
    state.totalWorkTime = totalWorkTime
  },
  updatePhotoURL(state, photoURL) {
    state.photoURL = photoURL
  },
}
