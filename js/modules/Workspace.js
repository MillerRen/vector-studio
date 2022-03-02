import Menubar from './Menubar'
import Inspector from './Inspector'
import Tool from './Tool'

export default class Workspace {
  menubar = null
  mainArea = null
  canvas = null

  constructor (data) {
    this.data = data
    this.init()
  }

  init () {
    this.createMenubar()
    this.createMainArea()
    this.createSidePanel()
    this.createEditor()
    this.createTool()
    this.createInspector()
    this.render()
    paper.project.currentStyle = {
      strokeColor: 'black'
    }
  }

  createMenubar () {
    this.menubar = new Menubar()
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
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('resize', 'true')
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.background = '#ffffff'
    this.mainArea.content.appendChild(this.canvas)
    this.mainArea.onresize = () => this.resize()
    paper.setup(this.canvas)
  }

  createTool () {
    this.tool = new Tool()
    this.mainArea.content.appendChild(this.tool.root)
  }

  createSidePanel () {
    this.sidePanel = LiteGUI.sidepanel = new LiteGUI.Panel({
      title: 'side panel',
      close: true
    })
    
    this.mainArea.getSection(1).add(this.sidePanel)
  }

  createInspector () {
    this.inspector = new LiteGUI.Inspector()
    this.inspector.onchange = function (name, value, widget) {
      
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
