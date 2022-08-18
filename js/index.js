const options = ['Easy', 'Medium', 'Hard'];
const difficultButton = document.querySelector('.difficult');
const difficultSpan = document.querySelector('.difficult span span');
let currentDifficult = 0;

const changeDifficult = () => {
    currentDifficult++;
    if (currentDifficult >= 3) currentDifficult = 0;
    difficultSpan.innerText = options[currentDifficult]
}

difficultButton.addEventListener('click', changeDifficult)