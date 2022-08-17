export class character {
    head;
    direction;
    trail;
    grow;
    requestedDirection;
    gameover;
    constructor(data) {


    }

    update(fruit) {
        this.trail.push({})

        if(fruit.position.x === this.head.x && fruit.position.y === this.head.y) {
            this.grow = 1
            fruit.eat = 1
        }

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
