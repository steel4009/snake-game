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

    update(items, currentFrame, canvas) {
        let size = (canvas.size.canvas / canvas.size.block) - 1
        this.trail.push({})

        for (let i in items ){
            if (items[i].position.x === this.head.x && items[i].position.y === this.head.y) {
                if (items[i].type === 'fruit'){
                    this.grow = 1
                    this.score++
                } else if (items[i].type === 'boost') {
                    items[i].active.bool = true
                    items[i].active.when = currentFrame
                }
                items[i].eat = 1
            }
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
