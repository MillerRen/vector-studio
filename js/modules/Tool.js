import tools from '../tools'

// TODO: 工具界面
export default class Tool {
  tools = {}

  selectEl = null

  constructor (editor) {
    this.editor = editor
    this.root = document.createElement('ul')
    this.root.setAttribute('id', 'tools')
    this.root.setAttribute('class', 'toolbar')
    this.init()
  }

  init () {
    this.createTools()
    this.select('select')
  }

  select (tool) {
    this.tools[tool].activate()
  }

  createTools () {
    tools.map(config => {
      var tool = new paper.Tool(config)
      this.tools[config.name] = tool
      this.createTool(tool)
    })
  }

  createTool (tool) {
    var editor = this.editor
    var icon = document.createElement('svg')
    var el = document.createElement('li')
    el.setAttribute('class', 'tools-item tool tool_'+tool.name)
    icon.innerHTML = tool.icon
    el.appendChild(icon)
    if(tool.name == paper.tool.name) {
      el.classList.add('active')
      this.selectEl = el
    }
    el.addEventListener('click', () => {
      this.select(tool.name)
      this.selectEl.classList.remove('active')
      el.classList.add('active')
      this.selectEl = el
    })
    this.root.appendChild(el)
    tool.onChange = (items) => {
      console.log(editor)
      LiteGUI.trigger(editor, 'tool.'+tool.name, items)
    }
  }
}
