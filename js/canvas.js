export class canvas {
    element;
    size;
    context;
    constructor(data) {
        for (let i in data) this[i] = data[i]

        this.setProperties()
    }

    setProperties() {
        this.size.block = this.size.canvas / 20
        this.element = document.createElement('canvas')
        this.element.width = this.element.height = this.size.canvas
        this.context = this.element.getContext('2d')
    }

    clear() {
        this.context.fillStyle = '#bbb'
        this.context.fillRect(0, 0, this.size.canvas, this.size.canvas)
    }

    fillRect(vector, color, translate = 1) {
        let v = {}
        Object.assign(v, vector)
        if (translate) for (let i in v) v[i] *= this.size.block
        this.context.fillStyle = color
        this.context.fillRect(v.x, v.y, this.size.block, this.size.block)
    }
}