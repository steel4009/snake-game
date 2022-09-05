export class item {
    type;
    color;
    position;
    eat;
    constructor(data) {
        for (let i in data) this[i] = data[i]
    }

    getForbiddenPositions(character, items) {
        let f = []
        f.push({})
        Object.assign(f[0], character.head)
        for (let i in character.trail) {
            f.push([])
            Object.assign(f[f.length - 1], character.trail[i])
        }
        Object.assign(f[f.length - 1], items.position)
        return f
    }

    generateRandomPosition(forbiddenPositions, canvas) {
        if(!this.eat && this.type === 'fruit') return

        let size = (canvas.size.canvas / canvas.size.block) - 1

        let bool
        do {
            this.eat = 0
            this.position.x = Math.floor(Math.random() * size)
            this.position.y = Math.floor(Math.random() * size)

            bool = false
            for (let i in forbiddenPositions) if (forbiddenPositions[i].x === this.position.x && forbiddenPositions[i].y === this.position.y) {
                bool = true
                break;
            }
        } while (bool)
    }

    clear() {
        this.position = {
            x: null,
            y: null
        }
    }

    draw(canvas) {
        if(this.position.x === null && this.position.y === null) return
        canvas.fillRect(this.position, this.color)
    }
}
