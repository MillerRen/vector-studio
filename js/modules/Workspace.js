import Menubar from './Menubar'
import Inspector from './Inspector'
import Tool from './Tool'
import Editor from './Editor'

export default class Workspace {
  menubar = null
  mainArea = null
  canvas = null
  editor = null

  constructor (data) {
    this.data = data
    this.init()
  }

  init () {
    this.createMainArea()
    this.createSidePanel()
    this.createEditor()
    this.createMenubar()
    this.createTool()
    this.createInspector()
  }

  createMenubar () {
    this.menubar = new Menubar(this.editor)
  }

  createMainArea () {
    this.mainArea = new LiteGUI.Area({
      id: 'main_area',
      content_id: 'canvas_area',
      main: true,
      height: 'calc( 100% - 32px )',
      inmediateResize: true
    })
    this.mainArea.split('horizontal', [null, 300], true)
    LiteGUI.add(this.mainArea)
  }

  createEditor () {
    this.editor = new Editor(this.mainArea)
  }

  createTool () {
    this.tool = new Tool(this.editor)
    this.mainArea.content.appendChild(this.tool.root)
  }

  createSidePanel () {
    this.sidePanel = LiteGUI.sidepanel = new LiteGUI.Panel({
      close: true
    })
    this.mainArea.getSection(1).add(this.sidePanel)
  }

  createInspector () {
    this.inspector = new Inspector(this.sidePanel)
    this.inspector.onchange = (name, value) => {
      console.log(name, value)
    }
    LiteGUI.bind(this.editor, 'layer.add', (layer) => {
      console.log(layer)
    })
    LiteGUI.bind(this.editor, 'item.change', (item) => {
      this.inspector.update(item)
    })
    LiteGUI.bind(this.editor, 'tool.select', (item) => {
      console.log(item)
      this.inspector.update(item)
    })
  }

}
