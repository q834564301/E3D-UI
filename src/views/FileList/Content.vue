<template>
  <section>
    <!-- 上传  ->  搜索 -->
    <nav>
      <div class="left-nav-btn">
        <label class="upFile">
          <button class="upload">上传</button>
          <input type="file" class="file-input" @change="upLoadF" />
        </label>
        <button class="dir" @click="mkdirstatus(true)">新建文件夹</button>
      </div>
      <!-- <div class="right-search">
        <input
          type="text"
          placeholder="搜索您的文件"
          v-model="SchV"
          v-focus
          @keyup.enter="search"
        />
        <i class="iconfont icon-sousuo" @click="search"></i>
        <i class="iconfont icon-guanbi" v-if="SchV" @click="clearSV"></i>
      </div> -->
    </nav>
    <!-- 列表 -->
    <div class="content-list">
      <!-- 标题列表 -->
      <div class="fixed-box">
        <ul class="list-title">
          <li class="name">
            <span>文件名</span>
          </li>
          <li class="size">
            <span>大小</span>
          </li>
          <li class="date">上传日期</li>
        </ul>
      </div>
      <!-- 占位 -->
      <ul class="list-title"></ul>
      <!-- 返回上级目录 -->
      <ul class="file-list" v-show="FilePath !== '/sd/'">
        <li class="name">
          <span class="text" @click="goBack">.. /</span>
        </li>
        <li class="size">
          <span>- </span>
        </li>
        <li class="date">-</li>
      </ul>
      <!-- 新建文件夹 -->
      <ul class="editName" v-if="mkdirIpt">
        <i class="iconfont icon-icon-folder"></i>
        <div class="editDiv">
          <input
            type="text"
            v-model.trim="mkdirName"
            v-focus
            ref="EIR"
            @keyup.enter="mkdir"
          />
          <i class="iconfont icon-dui" @click="mkdir"></i>
          <i class="iconfont icon-guanbi" @click="mkdirstatus(false)"></i>
        </div>
      </ul>

      <!-- 文件列表 -->
      <template v-for="(file, index) in FileList">
        <ul
          class="file-list"
          @mouseenter="handleHover"
          @mouseleave="handleLeave"
          :key="file.name"
          v-show="index !== editIndex"
        >
          <li class="name">
            <i v-if="file.type === 'dir'" class="iconfont icon-icon-folder"></i>
            <span
              class="text"
              v-if="file.type == 'dir'"
              @click="changeDir(file.name)"
              >{{ file.name }}</span
            >
            <a
              class="text"
              :href="file.name | path(FilePath)"
              download=""
              v-if="file.type == 'file'"
              >{{ file.name }}</a
            >
            <!-- 操作图标 -->
            <span class="icon displayN">
              <i
                class="iconfont icon-xiazai"
                v-if="file.type === 'file'"
                @click="downloadF(file.name, FilePath)"
              ></i>
              <i class="iconfont icon-xiugai" @click="edit(index)"></i>
              <i
                class="iconfont icon-shanchu"
                @click="closeDlg(file.name)"
                v-if="file.type === 'file'"
              ></i>
            </span>
          </li>
          <li class="size">
            <span>{{ file.size | sizeFormat }}</span>
          </li>
          <li class="date">{{ file.date | dateFormat }}</li>
        </ul>
        <ul :key="index" v-if="editIndex === index" class="editName">
          <i v-if="file.type === 'dir'" class="iconfont icon-icon-folder"></i>
          <div class="editDiv">
            <input
              type="text"
              :value="file.name"
              v-focus
              ref="EIR"
              @keyup.enter="editConfirm(file.name)"
            />
            <i class="iconfont icon-dui" @click="editConfirm(file.name)"></i>
            <i class="iconfont icon-guanbi" @click="editCls"></i>
          </div>
        </ul>
      </template>
    </div>
  </section>
</template>

<script>
import { sizeFormat, dateFormat } from '@/lib/filters.js'

export default {
  name: 'Content',
  props: {
    FileList: {
      type: Array,
      default() {
        return []
      }
    },
    FilePath: {
      type: String,
      default: ''
    },
    editIndex: {
      type: Number,
      default: -1
    },
    mkdirIpt: false
  },
  data() {
    return {
      mkdirName: ''
    }
  },
  filters: {
    sizeFormat,
    dateFormat,
    path(name, FilePath) {
      return FilePath + name
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  methods: {
    // 内容列表 hover -> 清除 display: none
    handleHover(e) {
      e.target.firstChild.lastChild.classList.toggle('displayN')
    },
    // 鼠标移出  Leave ->  添加 display: none
    handleLeave(e) {
      e.target.firstChild.lastChild.classList.toggle('displayN')
    },
    // 当前文件夹改变 -> name: string
    changeDir(name) {
      //  options 属性是用来获取定义在 data 外的数据和方法
      this.$emit('changeDir', this.$options.filters.path(name, this.FilePath))
    },
    // 返回上级目录
    goBack() {
      // ["", "sd", ""]
      const arr = this.FilePath.split('/')
      arr.pop()
      arr.pop()
      this.$emit('changeDir', arr.join('/'))
      this.mkdirIpt = false
    },
    // 下载文件
    downloadF(name, FPath) {
      const path = this.$options.filters.path(name, FPath)
      const a = document.createElement('a')
      a.setAttribute('download', '')
      a.setAttribute('href', path)
      a.click()
      a.remove()
    },
    // 文件上传
    upLoadF(e) {
      // 单个文件
      this.$emit('upload', e.target.files[0])
    },
    // 点击修改显示input的项
    edit(index) {
      this.$emit('EDIptShow', index)
    },
    // 确认修改文件名称
    editConfirm(oldName) {
      const newName = this.$refs.EIR[0].value.trim()
      if (newName.trim() === oldName.trim()) this.$emit('editCls')
      else this.$emit('editConfirm', oldName, newName)
    },
    // 删除按钮 - 点击 -> name: string
    closeDlg(name) {
      this.$emit('closeDlg', name)
    },
    // 修改名称 - 取消
    editCls() {
      this.$emit('editCls')
    },
    // 创建文件夹的状态
    mkdirstatus(status) {
      this.$emit('mkdirstatus', status)
    },
    // 新建文件夹
    mkdir() {
      this.mkdirName && this.$emit('mkdir', this.mkdirName)
      this.mkdirName = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
button
input
  outline none
  border none

section
  position absolute
  overflow hidden
  top 62px
  left 194px
  height calc(100% - 62px)
  width calc(100% - 194px)
  // 导航栏 -> 上传 -> 搜索框
  nav
    display flex
    justify-content flex-start
    overflow hidden
    align-items center
    height 66px
    // min-width 440px
    .left-nav-btn
      display flex
      justify-content space-evenly
      position relative
      flex-wrap nowrap
      width: 50%;
      height 34px
      margin 0 7px
      .upFile
        position: relative;
      button
        // margin-left 30px
        cursor pointer
      .file-input
      .upload
        width 84px
        height 34px
      .file-input
        position absolute
        top 0
        left 0
        opacity 0
      // 上传按钮
      .upload
        color white
        background-color #09aaff
        border 1px solid #09aaff
        border-radius 4px
        &:hover
          background-color #0097e8
      .dir
        width 111px
        height 34px
        color #20aaff
        background-color #fff
        border 1px solid #c3eaff
        border-radius 4px
        &:hover
          color #0098ea
    // .right-search
    //   position relative
    //   height 32px
    //   input
    //   .icon-sousuo
    //     height 32px
    //     line-height 32px
    //     color #666
    //   // 搜索框
    //   input
    //     padding 0 57px 0 15px
    //     width 293px
    //     font-size 12px
    //     background-color #e4e5e7
    //     border none
    //     border-radius 33px
    //   .icon-sousuo
    //     position absolute
    //     right 0
    //     font-size 22px
    //     width 32px
    //     border-radius 0 50% 50% 0
    //     &:hover
    //       color #09aaff
    //       cursor pointer
    //   .icon-guanbi
    //     position absolute
    //     right 37px
    //     font-size 17px
    //     height 32px
    //     line-height 32px
    //     color #c1c2c3
    //     &:hover
    //       color #d7d8d9

// 内容列表展示
.fixed-box
  width calc(100% - 194px)
  position fixed
  background-color #fff
  z-index 1

.content-list
  height calc(100% - 66px)
  overflow auto
  // 标题列表
  .list-title
  .file-list
    display flex
    justify-content space-between
    overflow hidden
    height 36px
    line-height 36px
    li
      padding 0 30px 0 70px
      font-size 12px
      color #888
      border-bottom 1px solid #f3f7fd
    .name
      padding-right 150px
      width 838px
      min-width 276px
    .size
      flex-grow 1
      width 223px
      min-width 123px
      span
        display inline-block
        text-align right
        min-width 54px
    .date
      width 321px
      min-width 220px
  // 文件列表
  .file-list
    li
      color #666
      .text
        display block
        text-overflow ellipsis
        overflow-x hidden
        white-space nowrap
        cursor pointer
        &:hover
          color #09aaff
    .name
      position relative
      a
        color #666666
    &:hover
      background-color #f4fbff

.icon
  position absolute
  display flex
  justify-content space-evenly
  top 0
  right 0
  width 150px
  .icon-xiazai
  .icon-xiugai
  .icon-shanchu
    color #7f6666
    text-align center
    font-size 17px
    cursor pointer
    &:hover
      color #09aaff
  .icon-xiugai
    font-size 16px
  .icon-shanchu
    font-size 15px

.displayN
  display none

.icon-icon-folder
  position absolute
  left 26px
  color #1caffd

.editName
  position relative
  height 36px
  display flex
  align-items center
  background-color #fff
  border 1px solid #f3f7fd
  .editDiv
    position relative
    width 350px
    min-width 350px
    padding-left 70px
    input
      font-size 12px
      color #666666
      width 207px
      height 26px
      vertical-align middle
      border 1px solid #C3EAFF
      &:focus
        border 1px solid skyblue
        box-shadow 0 0 15px -5px rgba(23,22,220,.5)
    .icon-dui
    .icon-guanbi
      position absolute
      vertical-align middle
      line-height 28px
      color #1cbcf6
      cursor pointer
    .icon-dui
      font-size 17px
      right 40px
    .icon-guanbi
      font-size 18.5px
      right 10px
</style>
