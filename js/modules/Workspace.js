import Menubar from './Menubar'
import Inspector from './Inspector'
import Tool from './Tool'

export default class Workspace {
  menubar = null
  mainArea = null
  toolArea  = null
  canvasArea = null
  canvas = null

  constructor (data) {
    this.data = data
    this.init()
  }

  init () {
    this.createMenubar()
    this.createMainArea()
    this.createSidePanel()
    this.createTool()
    this.createEditor()
    this.createInspector()
    this.render()
  }

  createMenubar () {
    this.menubar = new Menubar()
  }

  createMainArea () {
    this.mainArea = new LiteGUI.Area({
      id: 'main_area',
      content_id: 'editor_area',
      main: true,
      height: 'calc( 100% - 32px )',
      inmediateResize: true
    })
    this.mainArea.split('horizontal', [null, 300], true)
    this.editorArea = this.mainArea.getSection(0)
    this.editorArea.split('horizontal', [40, null])
    this.toolArea = this.editorArea.getSection(0)
    this.canvasArea = this.editorArea.getSection(1)
    LiteGUI.add(this.mainArea)
  }

  createEditor () {
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('resize', 'true')
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.background = '#ffffff'
    this.canvasArea.content.appendChild(this.canvas)
    this.mainArea.onresize = () => this.resize()
    paper.setup(this.canvas)
  }

  createTool () {
    this.tool = new Tool()
    this.toolArea.content.appendChild(this.tool.root)
  }

  createSidePanel () {
    this.sidePanel = LiteGUI.sidepanel = new LiteGUI.Panel({
      title: 'side panel',
      close: true
    })
    var tabs = new LiteGUI.Tabs()
    tabs.addTab('图层')
    tabs.addTab('通道')
    tabs.addTab('路径')
    this.sidePanel.add(tabs)
    this.mainArea.getSection(1).add(this.sidePanel)
  }

  createInspector () {
    this.inspector = new LiteGUI.Inspector()
    var section = this.inspector.addSection('Current Style')
    this.inspector.setCurrentSection(section)
    this.inspector.onchange = function (name, value, widget) {
      paper.project.currentStyle[name] = value
    }
    this.sidePanel.content.appendChild(this.inspector.root)
    this.inspector.inspectInstance(paper.project.currentStyle)
  }

  resize () {
    var rect = this.canvas.parentNode.getClientRects()[0];
		this.canvas.width = rect.width;
		this.canvas.height = rect.height;
  }

  render () {
    
  }
}
