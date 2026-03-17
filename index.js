const grid = document.querySelector('#grid')
const colorInput = document.querySelector('#color')
const squaresSetterButton = document.querySelector('#squares-setter')

let isDrawing = false
let isErasing = false
let currentColor = colorInput.value
let blankColor = "#FFF"
let tempColor

createGrid()

function createGrid(side = 16) {

    grid.innerHTML = ''

    for (let i = 0; i < side * side; i++) {
        const el = document.createElement('div')
        el.classList.add('cel')
        el.style.height = `${100 / side}%`
        el.style.width = `${100 / side}%`
        el.style.backgroundColor = blankColor

        el.addEventListener('mouseenter', () => {
            if (isDrawing) {
                el.style.backgroundColor = currentColor
                el.dataset.preview = false
            }
            else if (isErasing) {
                el.style.backgroundColor = blankColor
                el.dataset.preview = false
            }
        })

        el.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                el.style.backgroundColor = currentColor
                el.dataset.preview = false
            }
            else if (e.button === 2) {
                el.style.backgroundColor = blankColor
                el.dataset.preview = false
            }
        })

        el.addEventListener('mouseover', () => {
            if (convertRGBToHex(el.style.backgroundColor) !== currentColor) {
                el.dataset.preview = true
                tempColor = el.style.backgroundColor
                el.style.backgroundColor = currentColor
            }
        })

        el.addEventListener('mouseout', () => {
            if (el.dataset.preview === "true") {
                el.dataset.preview = false
                el.style.backgroundColor = tempColor
            }
        })

        grid.appendChild(el)
    }
}

grid.addEventListener('mousedown', (e) => {
    if (e.button === 0)
        isDrawing = true
    else if (e.button === 2)
        isErasing = true
})

grid.addEventListener('mouseup', (e) => {
    if (e.button === 0)
        isDrawing = false
    else if (e.button === 2)
        isErasing = false
})

colorInput.addEventListener("change", (e) => {
    currentColor = e.target.value
})

squaresSetterButton.addEventListener('click', () => {
    let message = 'Digite a quantidade de quadrados desejados:(1-100)'
    while (true) {
        const squaresAmount = window.prompt(message)
        if (squaresAmount === null) {
            break
        }
        const squaresAmountInt = parseInt(squaresAmount)
        if (squaresAmountInt > 0 && squaresAmountInt <= 100) {
            createGrid(squaresAmountInt)
            break
        }
        message = 'Digite novamente a quantidade de quadrados desejados: (o valor deve ser entre 1 e 100)'
    }
})

document.addEventListener('contextmenu', event => event.preventDefault());

function convertRGBToHex(rgb) {
    rgb = rgb.substring(4, rgb.length - 1)
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    return "#" + r + g + b;
}