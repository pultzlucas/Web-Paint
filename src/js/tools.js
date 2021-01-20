class Tool {
    constructor() {
        this.inHands = false
        this.using = false
    }

    define(features) {
        const keysAndValues = Object.entries(features)
        keysAndValues.forEach(([key, value]) => this[key] = value)
    }

    stop() {
        this.using = false
    }
}

class ToolSettingsPopup {
    constructor(element) {
        this.element = element
    }

    show() {
        //show config popup
        this.element.classList.remove('hidden')
        this.element.classList.add('show')
    }

    hide() {
        //hide config popup
        this.element.classList.remove('show')
        this.element.classList.add('hidden')
    }

    getData() {
        const inputsArray = this.element.querySelectorAll('input')
        const inputsValue = Array.from(inputsArray).map(input => input.value)
        return inputsValue
    }
}

export {
    Tool,
    ToolSettingsPopup
}
