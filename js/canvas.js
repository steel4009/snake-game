class canvas {
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

    fillRect(vector, size, color) {
        this.context.fillStyle = color
        this.context.fillRect(vector.x, vector.y, size.w, size.h)
    }
}