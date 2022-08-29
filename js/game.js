import { character } from "./character.js";
import { canvas } from "./canvas.js";
import { fruit } from "./fruit.js";

function getDifficult() {
    let d = parseInt(new URLSearchParams(window.location.search).get('difficult'))
    if(d > 2) d = 3
    else if(d < 0) d = 0
    return d
}

export let difficult = getDifficult()

const initialData = {
    board: {
        size: {
            canvas: 600,
            block: null
        },
        element: null
    }
}

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

const randomize = (max) => {
    return {
        x: Math.floor(Math.random() * max),
        y: Math.floor(Math.random() * max)
    }
}

const mainDiv = document.querySelectorAll('.main')[0]
const gameoverDiv = document.querySelectorAll('.gameover')[0]
const board = new canvas(initialData.board)
const score = document.querySelector('.score')
const time = document.querySelector('.time')
const timer = {}
document.querySelector('.info').style.width = board.size.canvas + 'px'

let snake, apple, rendering, t
const load = () => {

    gameoverDiv.style.top = '-100%'
    gameoverDiv.style.visibility = 'hidden'

    initialData.snake = {
        head: {
            x: Math.floor(Math.random() * (20 + 10 * difficult)),
                y: Math.floor(Math.random() * (20 + 10 * difficult))
        },
        direction: {
            x: null,
                y: null
        },
        trail: [],
        grow: 0,
        gameover: false,
        score: 0
    }
    initialData.apple = {
        position: {
            x: null,
                y: null
        },
        eat: 1,
            color: 'red'
    }

    initialData.snake.direction = randomize(2)
    if (initialData.snake.direction.x === 1) {
        initialData.snake.direction.x = initialData.snake.direction.y === 0 ? -1 : 1
        initialData.snake.direction.y = 0
    } else {
        initialData.snake.direction.y = initialData.snake.direction.y === 0 ? -1 : 1
    }

    initialData.snake.trail.push({
        x: initialData.snake.head.x - initialData.snake.direction.x,
        y: initialData.snake.head.y - initialData.snake.direction.y
    })

    snake = new character(initialData.snake)
    apple = new fruit(initialData.apple)

    rendering = setInterval(render, 400 - (difficult * 50))
    startTimer()
}

mainDiv.appendChild(board.element)

const keyDown = ({key}) => {
    if(Object.keys(moves).includes(key)) snake.requestDirectionChange(moves[key])
}

document.addEventListener('keydown', keyDown)
gameoverDiv.addEventListener('click', load)

const render = () => {
    board.clear()

    snake.update(apple, board)
    apple.generateRandomPosition(apple.getForbiddenPositions(snake), board)

    apple.draw(board)

    snake.draw(board)

    score.innerText = snake.score

    if(snake.gameover) {
        clearInterval(rendering)
        stopTimer()
        gameoverDiv.style.top = '0'
        gameoverDiv.style.visibility = 'visible'
    }
}

const doTimer = () => {
    let display = {
        s: () => {
            let r
            if(timer.s < 10) r = `0${timer.s}`
            else r = timer.s
            return r
        },
        m: () => {
            let r
            if(timer.m < 10) r = `0${timer.m}`
            else r = timer.m
            return r
        }
    }
    time.innerText = `${display.m()}:${display.s()}`
    timer.s++
    if(timer.s >= 60) {
        timer.s = 0
        timer.m++
    }
}

const startTimer = () => {
    timer.s = 0
    timer.m = 0
    doTimer()
    t = setInterval(doTimer, 1000)
}

const stopTimer = () => {
    clearInterval(t)
}

load()