import elementsDOM from '../src/js/elementsDOM.js'
import Cursor from '../src/js/cursor.js'
import { Tool, ToolSettingsPopup } from '../src/js/tools.js'

const { canvas } = elementsDOM

const canvasCursor = new Cursor(canvas)

const tools = {
    pencil: new Tool(),
    eraser: new Tool()
}

const { pencil, eraser } = tools

//define tools
pencil.define({ color: '#000', size: 10 })
eraser.define({ size: 50 })

//create the popups object
const pencilPopup = new ToolSettingsPopup(elementsDOM.configPencilPopup)
const eraserPopup = new ToolSettingsPopup(elementsDOM.configEraserPopup)

const hand = {
    hold(toolBtn, toolName) {
        //drop all tools first
        const toolsKeys = Object.keys(tools)
        toolsKeys.forEach(tool => this.drop(tools[tool]))

        //hold the chosen tool
        tools[toolName].inHands = true

        //change button color
        changeBtnColor(toolBtn)

        //change cursor icon
        const cursorURL = `../src/icons/${toolName}-icon.png`
        canvasCursor.setCustom(cursorURL)
    },

    drop(toolObject) {
        //drop tool
        canvasCursor.setDefault()
        this.toolInHand = ''
        toolObject.using = false
        toolObject.inHands = false
    }
}

function main() {
    canvas.width = window.innerWidth
    canvas.height = 800

    const ctx = canvas.getContext('2d')

    let x = 0
    let y = 0

    function start(toolFunc, delay) {
        setTimeout(() => {
            if (pencil.using || eraser.using) toolFunc()
        }, delay)
    }

    function stop() {
        eraser.stop()
        pencil.stop()

        ctx.beginPath()
    }

    function updateCursorPosition(event) {
        x = event.clientX - canvas.offsetLeft
        y = event.clientY - canvas.offsetTop
    }

    function draw() {
        pencilPopup.hide()
        pencil.using = true

        ctx.strokeStyle = pencil.color
        ctx.lineWidth = pencil.size

        ctx.lineCap = 'round'
        ctx.lineTo(x, y)
        ctx.stroke()
        start(draw, 10)
    }

    function erase() {
        eraserPopup.hide()
        eraser.using = true

        ctx.clearRect(x - eraser.size / 2, y - eraser.size / 2, eraser.size, eraser.size)
        start(erase, 10)
    }


    canvas.addEventListener('mousedown', () => {
        if (pencil.inHands) draw()
        if (eraser.inHands) erase()
    })
    canvas.addEventListener('mouseup', stop)
    canvas.addEventListener('mouseout', stop)
    canvas.addEventListener('mousemove', updateCursorPosition)
}

//show or hide popups
function popupController(popup) {
    const popupIsClosed = popup.element.classList.contains('hidden')
    popupIsClosed ? popup.show() : popup.hide()
}

function changeBtnColor(element) {
    //remove the other buttons color to default
    document.querySelectorAll('.tool-btn').forEach(btn => btn.style.backgroundColor = '#eee')
    
    //color button
    const btn = element.classList.contains('tool-btn') ? element : element.parentNode
    btn.style.backgroundColor = '#ccc'
}

//tool button listeners
elementsDOM.pencilBtn.addEventListener('click', e => hand.hold(e.target, 'pencil'))
elementsDOM.eraserBtn.addEventListener('click', e => hand.hold(e.target ,'eraser'))

//popups button listeners
elementsDOM.configPencilBtn.addEventListener('click', () => popupController(pencilPopup))
elementsDOM.configEraserBtn.addEventListener('click', () => popupController(eraserPopup))

//popup inputs listeners
elementsDOM.colorPencilInput.addEventListener('change', e => pencil.define({ color: e.target.value }))
elementsDOM.sizePencilInput.addEventListener('change', e => pencil.define({ size: e.target.value }))
elementsDOM.sizeEraserInput.addEventListener('change', e => eraser.define({ size: e.target.value * 5 }))

document.addEventListener('DOMContentLoaded', main)

