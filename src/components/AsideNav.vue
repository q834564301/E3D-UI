<template>
  <aside>
    <ul>
      <template v-for="(item, index) in asideList">
        <li
          :key="index"
          @click="switchR(item.path, index)"
          :class="{ active: ASactive === index }"
        >
          {{ item.title }}
        </li>
      </template>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AsideNav',
  props:
    // ['asideList', 'ASactive'],
    {
      asideList: {
        type: Array,
        default() {
          return [
            {
              path: '/',
              title: '文件管理'
            },
            {
              path: '/',
              title: '路由器设置'
            }
          ]
        }
      },
      ASactive: {
        type: Number,
        default: 0
      }
    },
  methods: {
    switchR(path, index) {
      this.$emit('switchR', path, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
aside
  height calc(100% - 62px)
  width 194px
  padding-top 10px
  background-color #f7f7f7
  overflow hidden
  ul
    display flex
    height 100%
    flex-direction column
    align-items left
    li
      display flex
      align-items center
      flex-grow .04
      padding-left 53px
      cursor pointer
      user-select none
      &:hover
        background-color #eaeaea

.active
  color #1caffd
  background-color #eaeaea
</style>
