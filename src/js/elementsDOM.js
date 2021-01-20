const elementsDOM = {
    body: getElementDOM('body'),

    /* TOOLS PANEL */
    pencilBtn: getElementDOM('.pencil .tool-btn'),
    configPencilBtn: getElementDOM('.config-pencil'),
    configPencilPopup: getElementDOM('.config-pencil-popup'),
    colorPencilInput: getElementDOM('#pencil_color'),
    sizePencilInput: getElementDOM('#pencil_size'),

    eraserBtn: getElementDOM('.eraser .tool-btn'),
    configEraserBtn: getElementDOM('.config-eraser'),
    configEraserPopup:getElementDOM('.config-eraser-popup'),
    sizeEraserInput: getElementDOM('#eraser_size'),

    /* CANVAS */
    canvas: getElementDOM('canvas')
}

function getElementDOM(identifier, selectionMode = 'single') {
    if (selectionMode === 'all') return document.querySelectorAll(identifier)
    if (selectionMode === 'single') return document.querySelector(identifier)
}

export default elementsDOM
    