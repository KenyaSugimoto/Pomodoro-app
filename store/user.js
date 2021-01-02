export const state = () => ({
  uid: null,
  userName: null,
  totalWorkTime: null,
  photoURL: null,
})

// export const getters = {
//   uid(state) {
//     return state.uid
//   },
//   userName(state) {
//     return state.userName
//   },
//   totalWorkTime(state) {
//     return state.totalWorkTime
//   },
//   photoURL(state) {
//     return state.photoURL
//   },
// }
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
}
