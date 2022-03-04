import { AddLayer } from "../commands"

export default class Menubar {
  constructor (editor) {
    this.editor = editor
    this.init()
  }

  init () {
    var editor = this.editor
    var menubar = LiteGUI.menubar
    menubar.add('文件/新建')
    menubar.add('文件/打开')
    menubar.add('文件/最近')
    menubar.add('文件/保存')
    menubar.add('文件/导入')
    menubar.add('文件/导出')

    menubar.add('编辑/撤销')
    menubar.add('编辑/重做')
    menubar.add('编辑/删除')
    menubar.add('编辑/复制')
    menubar.add('编辑/粘贴')

    menubar.add('图层/新建图层', {
      callback () {
        editor.execute(new AddLayer(editor))
      }
    })
    menubar.add('图层/删除图层')

    menubar.add('滤镜/New')

    menubar.add('动画/New')

    menubar.add('窗口/New')
    menubar.add('帮助/New')

    return menubar
  }
}
