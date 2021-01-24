import api from '../api'

export default {
  fetch(store, args) { return api(args) }
}
