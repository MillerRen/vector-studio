import select from '../tools/select'
import pencil from '../tools/pencil'

// TODO: 工具界面
export default class Tool {
  tools = {
    pencil,
    select
  }

  constructor () {
    this.init()
  }

  init () {
    this.select('select')
  }

  select (tool) {
    this.tools[tool].activate()
  }
}