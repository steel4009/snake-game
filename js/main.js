const initialData = {
    board: {
        size: {
            canvas: 600,
            block: null
        },
        element: null
    }
}

const mainDiv = document.querySelectorAll('.main')[0]
const board = new canvas(initialData.board)

mainDiv.appendChild(board.element)