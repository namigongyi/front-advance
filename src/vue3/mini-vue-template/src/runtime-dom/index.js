export const nodeOps = {
    createText: (text) => {
        return document.createTextNode(text)
    },
    createElement: (tagName) => {
        return document.createElement(tagName)
    },
    insert: (el, node, anchor) => {
        el.insertBefore(node, anchor || null)
    },
    patchProp: (el, atrributeName, preValue, value) => {
        if (atrributeName.startsWith('on')) {
            const event = atrributeName.replace('on', '').toLowerCase()
            el.addEventListener(event, value)
        } else {
            el.setAttribute(atrributeName, value)
        }
    },
    setElementText: (element, text) => {
        element.textContent = text
    },
}