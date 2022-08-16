class snake {
    head;
    direction;
    trail;
    grow;
    requestedDirection;
    constructor(data) {
        for (let i in data) this[i] = data[i]
    }

    update() {
        this.trail.push({})
        Object.assign(this.trail[this.trail.length - 1], this.head)
        if (!this.grow) this.trail.shift()
        this.grow = 0

        if (this.requestedDirection) Object.assign(this.direction, this.requestedDirection)
        this.requestedDirection = null
        for (let i in this.direction) this.head[i] += this.direction[i]
        for (let i in this.head) {
            if (this.head[i] > 19) this.head[i] = 0
            if (this.head[i] < 0) this.head[i] = 19
        }
    }

    draw(canvas) {
        canvas.fillRect(this.head, 'green')
        for (let i in this.trail) canvas.fillRect(this.trail[i], '#eee')
    }

    requestDirectionChange(move) {
        if(move === this.direction) return
        if((this.direction.x * -1 !== move.x && move.x !== 0) || (this.direction.y * -1 !== move.y && move.y !== 0)) this.requestedDirection = move
    }
}
