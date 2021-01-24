<template>
  <div class="all" v-show="showDiaLog">
    <div class="bg"></div>
    <div
      class="container"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <slot name="container">
        <header>
          <slot name="title">删除文件</slot>
          <i class="iconfont icon-guanbi" @click="clear"></i>
        </header>
        <div class="body">
          <slot name="body">确认删除当前文件么?</slot>
        </div>
        <div class="footer">
          <slot name="footer">
            <button class="confirmT" @click="confirmT">确定</button>
            <button class="confirmF" @click="clear">取消</button>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Holo-DiaLog',
  props: {
    showDiaLog: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 210
    }
  },
  methods: {
    // 点击关闭按钮
    clear() {
      this.$emit('clear')
    },
    // 点击确定按钮
    confirmT() {
      this.$emit('confirmT')
    }
  }
}
</script>

<style lang="stylus" scoped>
button
  border none
  border-radius 2px
  outline 0
.all
  z-index 50
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  .bg
    position absolute
    width 100%
    height 100%
    background-color #000
    opacity .5
  .container
    z-index 1
    margin-bottom 80px
    background-color #ffffff
    border-radius 3px
    display flex
    flex-direction column
    justify-content space-between
    header
      position relative
      display flex
      justify-content left
      align-items center
      padding-left 20px
      width 400px
      height 54px
      font-size 15px
      color #666
      border-bottom 1px solid #e9eaeb
      .icon-guanbi
        position absolute
        vertical-align middle
        right 20px
        font-size 19px
        color #999999
        cursor pointer
        &:hover
          color #7c8aa8
    .footer
    .body
      display flex
      justify-content center
      align-items center
      height 43px
    .body
      font-size 19px
    .footer
      padding-bottom 20px
      display flex
      justify-content space-evenly
      .confirmT
      .confirmF
        color #fff
        width 90px
        height 30px
        background-color #2e80ff
        border 1px solid transparent
        &:hover
          background-color #2977ea
      .confirmF
        background-color #fff
        color #000
        border 1px solid #c0c0c0
        &:hover
          background-color #f5f8fa
</style>
