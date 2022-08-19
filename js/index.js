const options = ['Easy', 'Medium', 'Hard'];
const difficultButton = document.querySelector('.difficult');
const difficultSpan = document.querySelector('.difficult span span');
const difficultHref = document.querySelector('.buttons a');
const href = './html/game.html?difficult='
let currentDifficult = 0;

const changeDifficult = () => {
    currentDifficult++;
    if (currentDifficult >= 3) currentDifficult = 0;
    difficultHref.href = `${href}${currentDifficult}`
    difficultSpan.innerText = options[currentDifficult]
}

difficultButton.addEventListener('click', changeDifficult)