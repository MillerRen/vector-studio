import select from '../tools/select'
import pencil from '../tools/pencil'

// TODO: 工具界面
export default class Tool {
  tools = {
    select,
    pencil,
  }

  constructor () {
    this.root = document.createElement('ul')
    this.root.setAttribute('id', 'tools')
    this.root.setAttribute('class', 'tools')
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
    Object.values(this.tools).map(tool => {
      this.createTool(tool)
    })
  }

  createTool (tool) {
    var icon = document.createElement('svg')
    var el = document.createElement('li')
    el.setAttribute('class', 'tools-item')
    icon.innerHTML = tool.icon
    el.appendChild(icon)
    el.addEventListener('click', () => {
      this.select(tool.name)
    })
    this.root.appendChild(el)
  }
}
