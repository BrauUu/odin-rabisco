const grid = document.querySelector('#grid')
const color1Input = document.querySelector('#color1')
const color2Input = document.querySelector('#color2')
const gridSizeSetter = document.querySelector('#grid-size-setter')
const gridSizeValueEl = document.querySelector('#grid-size-value')

const eraser = document.querySelector('#eraser')
const draw = document.querySelector('#draw')
const clear = document.querySelector('#clear')
const eyedropper = document.querySelector('#eyedropper')

let isMousePressed = [false, false]
let currentMode = 'draw'
let currentColor1 = color1Input.value
let currentColor2 = color2Input.value
let squaresCount = 16
const bgColors = ['#d5d5d5', '#757575']

let tempColor


createGrid()

function createGrid(side = squaresCount) {

    grid.innerHTML = ''

    for (let i = 0; i < side * side; i++) {
        const el = document.createElement('div')
        el.classList.add('cel')
        el.style.width = `${100 / side}%`
        el.dataset.numId = i

        el.style.backgroundColor = getBackgroundColor(i);

        el.addEventListener('mouseenter', () => {
            switch (currentMode) {
                case 'draw':
                    if (isMousePressed[0]) {
                        el.style.backgroundColor = currentColor1
                        el.dataset.preview = false
                    }
                    else if (isMousePressed[1]) {
                        el.style.backgroundColor = currentColor2
                        el.dataset.preview = false
                    }
                    break;
                case 'erase':
                    if (isMousePressed[0] || isMousePressed[1]) {
                        el.style.backgroundColor = getBackgroundColor(el.dataset.numId)
                        el.dataset.preview = false
                    }
                    break;
            }
        })

        el.addEventListener('mousedown', (e) => {
            switch (currentMode) {
                case 'draw':
                    if (e.button === 0) {
                        el.style.backgroundColor = currentColor1
                        el.dataset.preview = false
                    }
                    else if (e.button === 2) {
                        el.style.backgroundColor = currentColor2
                        el.dataset.preview = false
                    }
                    break;
                case 'erase':
                    if (e.button === 0 || e.button === 2) {
                        el.style.backgroundColor = getBackgroundColor(el.dataset.numId)
                        el.dataset.preview = false
                    }
                    break;
                case 'eyedropper':
                    if (e.button === 0) {
                        currentColor1 = el.style.backgroundColor
                        color1Input.value = currentColor1
                    }
                    else if (e.button === 2) {
                        currentColor2 = el.style.backgroundColor
                        color2Input.value = currentColor2
                    }
                    break;
            }
        })

        el.addEventListener('mouseover', () => {
            switch (currentMode) {
                case 'erase':
                    el.dataset.preview = true
                    tempColor = el.style.backgroundColor
                    el.style.backgroundColor = getBackgroundColor(el.dataset.numId)
                    break;
                case 'draw':
                    if (convertRGBToHex(el.style.backgroundColor) !== currentColor1) {
                        el.dataset.preview = true
                        tempColor = el.style.backgroundColor
                        el.style.backgroundColor = currentColor1
                    }
                    break;
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

eraser.addEventListener('click', () => {
    currentMode = 'erase'
    eraser.classList.add('button-active')
    draw.classList.remove('button-active')
    eyedropper.classList.remove('button-active')
})

draw.addEventListener('click', () => {
    currentMode = 'draw'
    draw.classList.add('button-active')
    eraser.classList.remove('button-active')
    eyedropper.classList.remove('button-active')
})

eyedropper.addEventListener('click', () => {
    currentMode = 'eyedropper'
    eyedropper.classList.add('button-active')
    eraser.classList.remove('button-active')
    draw.classList.remove('button-active')
})

clear.addEventListener('click', () => {
   createGrid(squaresCount)
})

grid.addEventListener('mousedown', (e) => {
    if (e.button === 0)
        isMousePressed[0] = true
    else if (e.button === 2)
        isMousePressed[1] = true
})

grid.addEventListener('mouseup', (e) => {
    if (e.button === 0)
        isMousePressed[0] = false
    else if (e.button === 2)
        isMousePressed[1] = false
})

grid.addEventListener('mouseleave', (e) => {
    isMousePressed[0] = false
    isMousePressed[1] = false
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
    gridSizeSetter.value = squaresCount
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

function getBackgroundColor(i) {
    const row = Math.floor(i / squaresCount);
    const col = i % squaresCount;
    const inTop = row < Math.ceil(squaresCount / 2);
    const inLeft = col < Math.ceil(squaresCount / 2);
    return (inTop === inLeft) ? bgColors[0] : bgColors[1];
}