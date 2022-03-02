import select from '../tools/select'
import pencil from '../tools/pencil'

// TODO: 工具界面
export default class Tool {
  tools = {
    pencil,
    select
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
    console.log(tool)
    this.tools[tool].activate()
  }

  createTools () {
    Object.keys(this.tools).map(k => {
      this.createTool(k)
    })
  }

  createTool (name) {
    var tool = document.createElement('li')
    tool.setAttribute('class', 'tools-item')
    tool.innerHTML = name
    tool.addEventListener('click', () => {
      this.select(name)
    })
    this.root.appendChild(tool)
  }
}
