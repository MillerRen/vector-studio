export default class Editor {
  constructor (canvas) {
    this.canvas = canvas
    this.init()
  }

  init () {
    paper.setup(this.canvas)
  }
}
