export default class History {
  constructor () {
    this.undos = []
    this.redos = []
  }

  execute (cmd) {
    this.undos.push(cmd)
    cmd.execute()
    this.redos = []
  }

  undo () {
    var cmd = this.undos.pop()
    cmd.undo()
    this.redos.push(cmd)
  }

  redo () {
    var cmd = this.redos.pop()
    cmd.redo()
    this.undos.push(cmd)
  }
}