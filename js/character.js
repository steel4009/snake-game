export class character {
    head;
    direction;
    trail;
    grow;
    score;
    requestedDirection;
    gameover;
    constructor(data) {
        for (let i in data) this[i] = data[i]
    }

    update(fruit, canvas) {
        let size = (canvas.size.canvas / canvas.size.block) - 1
        this.trail.push({})

        if(fruit.position.x === this.head.x && fruit.position.y === this.head.y) {
            this.grow = 1
            this.score++
            fruit.eat = 1
        }

        Object.assign(this.trail[this.trail.length - 1], this.head)
        if (!this.grow) this.trail.shift()
        this.grow = 0

        if (this.requestedDirection) Object.assign(this.direction, this.requestedDirection)
        this.requestedDirection = null
        for (let i in this.direction) this.head[i] += this.direction[i]
        for (let i in this.head) {
            if (this.head[i] > size) this.head[i] = 0
            if (this.head[i] < 0) this.head[i] = size
        }

        for (let i in this.trail) {
            if (this.trail[i].x === this.head.x && this.trail[i].y === this.head.y) this.gameover = true
        }
    }

    draw(canvas) {
        for (let i in this.trail) canvas.fillRect(this.trail[i], '#eee')
        canvas.fillRect(this.head, 'green')
    }

    requestDirectionChange(move) {
        if(move === this.direction) return
        if((this.direction.x * -1 !== move.x && move.x !== 0) || (this.direction.y * -1 !== move.y && move.y !== 0)) this.requestedDirection = move
    }
}
