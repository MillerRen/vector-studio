export default class AddLayer {
  constructor (editor) {
    this.editor = editor
  }

  execute () {
    var layer = new paper.Layer({
      name: '新图层'
    })
    paper.project.addLayer(layer)
    console.log(this.editor)
    LiteGUI.trigger(this.editor, 'layer.add', layer)
  }
}