export class fruit {
    color;
    position;
    eat;
    constructor(data) {
        for (let i in data) this[i] = data[i]
    }

    getForbiddenPositions(character) {
        let f = []
        f.push({})
        Object.assign(f[0], character.head)
        for (let i in character.trail) {
            f.push([])
            Object.assign(f[f.length - 1], character.trail[i])
        }
        return f
    }

    generateRandomPosition(forbiddenPositions) {
        if(!this.eat) return
        let bool
        do {
            this.eat = 0
            this.position.x = Math.floor(Math.random() * 20)
            this.position.y = Math.floor(Math.random() * 20)

            bool = false
            for (let i in forbiddenPositions) if (forbiddenPositions[i].x === this.position.x && forbiddenPositions[i].y === this.position.y) {
                bool = true
                break;
            }
        } while (bool)
    }

    draw(canvas) {
        canvas.fillRect(this.position, this.color)
    }
}
