const grid = document.querySelector('#grid')
const color1Input = document.querySelector('#color1')
const color2Input = document.querySelector('#color2')
const gridSizeSetter = document.querySelector('#grid-size-setter')
const gridSizeValueEl = document.querySelector('#slider-value')

let isDrawing = [false, false]
let isErasing = false
let currentColor1 = color1Input.value
let currentColor2 = color2Input.value
let blankColor = "#FFF"
let tempColor
let temptempOutlineColor
let squaresCount = 16

createGrid()

function createGrid(side = squaresCount) {

    grid.innerHTML = ''

    for (let i = 0; i < side * side; i++) {
        const el = document.createElement('div')
        el.classList.add('cel')
        el.style.height = `${100 / side}%`
        el.style.width = `${100 / side}%`
        el.style.backgroundColor = blankColor

        el.addEventListener('mouseenter', () => {
            if (isDrawing[0]) {
                el.style.backgroundColor = currentColor1
                el.style.outlineColor = currentColor1
                el.dataset.preview = false
            }
            else if (isDrawing[1]) {
                el.style.backgroundColor = currentColor2
                el.style.outlineColor = currentColor2
                el.dataset.preview = false
            }
        })

        el.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                el.style.backgroundColor = currentColor1
                el.style.outlineColor = currentColor1
                el.dataset.preview = false
            }
            else if (e.button === 2) {
                el.style.backgroundColor = currentColor2
                el.style.outlineColor = currentColor2
                el.dataset.preview = false
            }
        })

        el.addEventListener('mouseover', () => {
            if (convertRGBToHex(el.style.backgroundColor) !== currentColor1) {
                el.dataset.preview = true
                tempColor = el.style.backgroundColor
                tempOutlineColor = el.style.outlineColor
                el.style.backgroundColor = currentColor1
                el.style.outlineColor = currentColor1
            }
        })

        el.addEventListener('mouseout', () => {
            if (el.dataset.preview === "true") {
                el.dataset.preview = false
                el.style.backgroundColor = tempColor
                el.style.outlineColor = tempOutlineColor
            }
        })

        grid.appendChild(el)
    }
}

grid.addEventListener('mousedown', (e) => {
    if (e.button === 0)
        isDrawing[0] = true
    else if (e.button === 2)
        isDrawing[1] = true
})

grid.addEventListener('mouseup', (e) => {
    if (e.button === 0)
        isDrawing[0] = false
    else if (e.button === 2)
        isDrawing[1] = false
})

grid.addEventListener('mouseleave', (e) => {
    isDrawing[0] = false
    isDrawing[1] = false
})

color1Input.addEventListener("change", (e) => {
    currentColor1 = e.target.value
})

color2Input.addEventListener("change", (e) => {
    currentColor2 = e.target.value
})

gridSizeSetter.addEventListener('change', (e) => {
    squaresCount = parseInt(e.target.value)
    gridSizeValueEl.textContent = `${squaresCount}X${squaresCount}`
    createGrid(squaresCount)
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