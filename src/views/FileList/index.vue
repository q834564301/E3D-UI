<template>
  <div class="all">
    <Header />
    <AsideNav :ASactive="state.ASactive" @switchR="switchR" />
    <Content
      :FileList="state.FileList"
      :FilePath="state.FilePath"
      :editIndex="state.editIndex"
      :mkdirIpt="state.mkdirIpt"
      @mkdirstatus="mkdirstatus"
      @changeDir="changeDir"
      @upload="upload"
      @editConfirm="editConfirm"
      @closeDlg="closeDlg"
      @editCls="editCls"
      @EDIptShow="EDIptShow"
      @mkdir="mkdir"
    />
    <!-- 删除框 -->
    <Holo-Dialog
      :showDiaLog="state.deleteDiaLog"
      @confirmT="confirmT"
      @clear="deleteDiaLogF"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Header from '../../components/Header'
import AsideNav from '../../components/AsideNav'
import store from './store'
import Content from './Content.vue'

export default {
  name: 'FileList',
  components: {
    Header,
    AsideNav,
    Content
  },
  computed: {
    ...mapGetters('FileList', { state: '_state' })
  },
  methods: {
    ...mapMutations('FileList', [
      'SWITCH_ROUTER_STYLE',
      'UPDATE_DELETE_DIALOG',
      'UPDATE_EDIT_INDEX',
      'UPDATE_MKDIR_STATUS'
    ]),
    ...mapActions('FileList', [
      'getFileList',
      'uploadFile',
      'editName',
      'deleteFile',
      'mkdirA'
    ]),
    // 左侧导航路由   path: string    index: number
    switchR(path, index) {
      this.SWITCH_ROUTER_STYLE(index)
      this.$router.push(path)
      if (path === '/') this.getFileList('/sd/')
    },
    // 文件夹路径改变
    changeDir(dirPath) {
      this.getFileList(dirPath + '/')
    },
    // 文件上传
    async upload(file) {
      await this.uploadFile(file)
      await this.getFileList()
    },
    // 文件名修改
    async editConfirm(oldName, newName) {
      const fd = new FormData()
      fd.append('oldName', oldName)
      fd.append('newName', newName)
      await this.editName(fd)
      await this.getFileList()
    },
    // 删除框
    closeDlg(name) {
      this.UPDATE_DELETE_DIALOG({ flag: true, name })
    },
    // 确认删除
    async confirmT() {
      await this.deleteFile()
      await this.getFileList()
    },
    // 取消修改
    editCls() {
      this.UPDATE_EDIT_INDEX(-1)
    },
    // 显示修改框
    EDIptShow(i) {
      this.UPDATE_EDIT_INDEX(i)
    },
    // 关闭删除框
    deleteDiaLogF() {
      this.UPDATE_DELETE_DIALOG({ flag: false })
    },
    // 新建文件夹
    async mkdir(dirName) {
      const fd = new FormData()
      fd.append('dir', dirName)
      await this.mkdirA(fd)
      await this.getFileList()
    },
    // mkdirIpt show ?
    mkdirstatus(status) {
      this.UPDATE_MKDIR_STATUS(status)
    }
  },
  beforeCreate() {
    this.$store.hasModule('FileList') ||
      this.$store.registerModule('FileList', store)
  },
  created() {
    // 获取文件列表
    this.getFileList()
  },
  destroyed() {
    this.$store.hasModule('FileList') &&
      this.$store.unregisterModule('FileList')
  }
}
</script>

<style lang="stylus" scoped>
.all
  height 100%
  user-select none
</style>
