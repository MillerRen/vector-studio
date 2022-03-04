export default class Inspector {
  constructor (root) {
    this.root = root
    this.init()
  }

  init () {
    this.inspector = new LiteGUI.Inspector()
    // inspector.addList(null, paper.project.layers.map(item => {
    //   return {
    //     content: 'hello'
    //   }
    // }))
    this.inspector.onchange = (name, value, widget) => {
      this.onchange(name,value,widget)
    }
    this.root.content.appendChild(this.inspector.root)
  }

  onchange () {

  }

  update (data) {
    this.inspector.clear()
    this.inspector.inspectInstance(data)
  }
}
