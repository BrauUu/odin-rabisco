const root = document.querySelector('#root')
const squaresSetterButton = document.querySelector('#squares-setter')
createGrid()

function createGrid(side = 16) {
    
    root.innerHTML = ''

    for (let i = 0; i < side * side; i++) {
        const el = document.createElement('div')
        el.classList.add('cel')
        el.style.height = `${100 / side}%`
        el.style.width = `${100 / side}%`

        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('hover')) {
                el.classList.add('hover')
            }
        })

        root.appendChild(el)
    }
}

squaresSetterButton.addEventListener('click', () => {
    let message = 'Digite a quantidade de quadrados desejados:(1-100)'
    while(true){
        const squaresAmount = window.prompt(message)
        if(squaresAmount === null) {
            break
        }
        const squaresAmountInt = parseInt(squaresAmount)
        if(squaresAmountInt > 0 && squaresAmountInt <= 100) {
            createGrid(squaresAmountInt)
            break
        }
        message = 'Digite novamente a quantidade de quadrados desejados: (o valor deve ser entre 1 e 100)'
    }
})