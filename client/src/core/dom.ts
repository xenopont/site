import Arrays from './Arrays'

const removeContent = (element: HTMLElement): void => {
    while (element.lastChild) {
        element.removeChild(element.lastChild)
    }
}

const replaceContent = (element: HTMLElement, newContent: HTMLElement|HTMLElement[]): void => {
    removeContent(element)
    Arrays.ensureArray(newContent).forEach((item) => { element.appendChild(item) })
}

export default {
    $: (id: string) => document.getElementById(id),
    removeContent,
    replaceContent,
}
