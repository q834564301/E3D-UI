const state = {
  FilePath: '/sd/',
  FileList: [],
  ASactive: 0,
  editIndex: -1,
  deleteFileName: '',
  deleteDiaLog: false,
  mkdirIpt: false
}

const getters = {
  _state(state) {
    return state
  }
}

const mutations = {
  SWITCH_ROUTER_STYLE(state, index) {
    state.ASactive = index
  },
  UPDATE_FILE_LIST(state, list) {
    state.FileList = list
  },
  UPDATE_FILE_PATH(state, dirPath) {
    state.FilePath = dirPath
  },
  UPDATE_DELETE_DIALOG(state, args = {}) {
    const { flag, name } = args
    state.deleteDiaLog = flag
    state.deleteFileName = name
  },
  UPDATE_EDIT_INDEX(state, index) {
    state.editIndex = index
  },
  UPDATE_MKDIR_STATUS(state, status) {
    state.mkdirIpt = status
  }
}

const actions = {
  getFileList({ commit, dispatch, getters }, goFilePath) {
    const { mkdirIpt, FilePath } = getters._state
    return dispatch('fetch', {
      url: goFilePath || FilePath
    }, { root: true }).then(res => {
      const { data } = res
      commit('UPDATE_FILE_LIST', data)
      commit('UPDATE_EDIT_INDEX', -1)
      goFilePath && commit('UPDATE_FILE_PATH', goFilePath)
      mkdirIpt && commit('UPDATE_MKDIR_STATUS', false)
      return data
    })
  },

  uploadFile({ dispatch, getters }, file) {
    const fd = new FormData()
    const { FilePath } = getters._state
    fd.append('file', file)
    return dispatch('fetch', {
      method: 'POST',
      url: FilePath,
      data: fd
    }, { root: true })
  },

  editName({ dispatch, getters }, args) {
    const { FilePath } = getters._state
    return dispatch('fetch', {
      method: 'PUT',
      url: FilePath,
      data: args
    }, { root: true })
  },

  deleteFile({ dispatch, commit, getters }) {
    const { FilePath, deleteFileName } = getters._state
    return dispatch('fetch', {
      method: 'DELETE',
      url: FilePath + deleteFileName
    }, { root: true })
      .then(res => commit('UPDATE_DELETE_DIALOG', { flag: false }))
  },

  mkdirA({ dispatch, getters }, args) {
    const { FilePath } = getters._state
    return dispatch('fetch', {
      method: 'POST',
      url: FilePath,
      data: args
    }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
