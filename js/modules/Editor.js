import History from "./History"

export default class Editor {
  constructor (root) {
    this.root = root
    this.history = new History()
    this.init()
  }

  init () {
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('resize', 'true')
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.background = '#ffffff'
    this.root.content.appendChild(this.canvas)
    paper.setup(this.canvas)
    paper.project.currentStyle.strokeColor = 'black'
  }

  execute (cmd) {
    this.history.execute(cmd)
  }

  undo () {
    this.history.undo()
  }

  redo () {
    this.history.redo()
  }
}