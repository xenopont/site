import Arrays from './Arrays'
import { Dictionary } from './Dictionary'

const elementContent = (root: Document|Element, path: string, params: Dictionary<string> = {}): string => {
    let elementPath: string = path
    Object.keys(params).forEach((p: string) => { elementPath = elementPath.replace(p, params[p]) })
    const element: Element|null = root.querySelector(elementPath)
    if (element === null) {
        return ''
    }

    return element.innerHTML
}

const removeContent = (element: HTMLElement): void => {
    while (element.lastChild) {
        element.removeChild(element.lastChild)
    }
}

const replaceContent = (element: HTMLElement, newContent: HTMLElement|HTMLElement[]): void => {
    removeContent(element)
    Arrays.ensureArray(newContent).forEach((item) => { element.appendChild(item) })
}

const offsetPosition = (element: HTMLElement): DOMRect|null => {
    return element.getClientRects().item(0)
    /* to support IE
    const result = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
    }
    let parent: HTMLElement = element
    while (parent.offsetParent) {
        parent = (parent.offsetParent as HTMLElement)
        result.left += parent.offsetLeft
        result.top += parent.offsetTop
    }

    return new DOMRect(result.left, result.top, result.width, result.height)*/
}

export default {
    $: (id: string): HTMLElement|null => document.getElementById(id),
    elementContent,
    offsetPosition,
    removeContent,
    replaceContent,
}
