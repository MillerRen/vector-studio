export default class Inspector {
  constructor (root) {
    this.root = root
    this.init()
  }

  init () {
    var inspector = new LiteGUI.Inspector()
    inspector.onchange = function (name, value, widget) {
      
    }
    this.root.content.appendChild(inspector.root)
  }
}
