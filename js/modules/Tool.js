import select from '../tools/select'
import pencil from '../tools/pencil'

// TODO: 工具界面
export default class Tool {
  tools = {
    select,
    pencil,
  }

  selectEl = null

  constructor () {
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
    Object.values(this.tools).map(tool => {
      this.createTool(tool)
    })
  }

  createTool (tool) {
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
  }
}
