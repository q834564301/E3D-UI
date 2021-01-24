import list from './list'

const { holo, need } = list

const holoUI = {
  install(Vue) {
    Vue.mixin({
      components: list.need.length > 0 ? need : holo
    })
  }
}

export default holoUI
