export const changeDifficult = (current, options) => {
    current++
    if (current >= 3) current = 0
    return [current, options[current]]
}