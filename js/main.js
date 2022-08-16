const initialData = {
    board: {
        size: {
            canvas: 600,
            block: null
        },
        element: null
    },
    character: {
        head: {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        },
        direction: {
            x: null,
            y: null
        },
        trail: [],
        grow: 0
    }
}
initialData.character.direction.x = Math.floor(Math.random() * 2) === 0 ? Math.floor(Math.random() * 2) === 0 ? -1 : 1 : 0
initialData.character.direction.y = initialData.character.direction.x === 0 ? Math.floor(Math.random() * 2) === 0 ? -1 : 1 : 0
initialData.character.trail.push({
    x: initialData.character.head.x - initialData.character.direction.x,
    y: initialData.character.head.y - initialData.character.direction.y
})

const moves = {
    w: {
        x: 0,
        y: -1
    },
    a: {
        x: -1,
        y: 0
    },
    s: {
        x: 0,
        y: 1
    },
    d: {
        x: 1,
        y: 0
    }
}

const mainDiv = document.querySelectorAll('.main')[0]
const board = new canvas(initialData.board)
const character = new snake(initialData.character)

mainDiv.appendChild(board.element)

const keyDown = ({key}) => {
    if(Object.keys(moves).includes(key)) character.requestDirectionChange(moves[key])
}

document.addEventListener('keydown', keyDown)

const render = () => {
    board.clear()

    character.update()
    character.draw(board)
}

(() => {
    setInterval(render, 400)
})()