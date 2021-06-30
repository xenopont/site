import Arrays from './Arrays'
import { Dictionary } from './Dictionary'

type HtmlElementEventHandler = (sender: HTMLElement) => void // eslint-disable-line no-unused-vars

type AttributeValue = string | number | boolean | Function | AttributeList
type AttributeList = { // eslint:disable-line:interface-over-type-literal
    [key: string]: AttributeValue
}
type ElementStyle = Dictionary<string|number> // eslint:disable-line:interface-over-type-literal

const applyStyle = (element: HTMLElement, style: ElementStyle) => {
    Object.keys(style).forEach((selector: string) => {
        (element.style as any)[selector] = style[selector]
    })
}

const attachAttribute = (element: HTMLElement, attrName: string, attrValue: AttributeValue) => {
    switch (attrName) {
        case 'style':
            applyStyle(element, attrValue as ElementStyle)
            break
        case 'data':
            Object.keys(attrValue).forEach((field: string) => { element.dataset[field] = (attrValue as any)[field] })
            break
        default:
            (element as any)[attrName] = attrValue
            break
    }
}

const attachInnerHtml = (element: HTMLElement, str: string) => {
    let child: ChildNode
    const tmp: HTMLDivElement = document.createElement('div')
    tmp.innerHTML = str
    while (tmp.firstChild) {
        child = tmp.firstChild
        element.appendChild(child)
    }
}

type ElementChild = ElementMarkup | string

class ElementMarkup { // eslint:disable-line:max-classes-per-file
    protected readonly type: string
    protected readonly attributes: AttributeList
    protected content: ElementChild[]
    // -------- Event Handlers --------
    protected createEventHandler: HtmlElementEventHandler | null = null

    public constructor(type: string, attributes: AttributeList, content: ElementChild[]) {
        this.type = type
        this.attributes = attributes
        this.content = content
    }

    public appendChild(child: ElementChild): ElementMarkup {
        this.content.push(child)
        return this
    }

    public toHtml(): HTMLElement {
        const element: HTMLElement = document.createElement(this.type)
        // attach attributes
        Object.keys(this.attributes).forEach((attrName: string) => {
            attachAttribute(element, attrName, this.attributes[attrName])
        })
        // attach content
        this.content.forEach((item: ElementChild) => {
            if (typeof item === 'string') {
                attachInnerHtml(element, item as string)
                return
            }
            // otherwise, item is ElementMarkup
            element.appendChild((item as ElementMarkup).toHtml())
            return
        })
        // onCreate individual callback
        if (this.createEventHandler !== null) {
            this.createEventHandler(element)
        }

        return element
    }

    public onCreate(callback: HtmlElementEventHandler): this {
        this.createEventHandler = callback
        return this
    }
}

type MarkupContent = ElementMarkup | string | (ElementMarkup | string)[]

export { AttributeList }
export { AttributeValue }
export { ElementMarkup }
export { ElementStyle }
export { HtmlElementEventHandler }
export { MarkupContent }
export { applyStyle }
export default {
    element(type: string, attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        if (!attributes) {
            return new ElementMarkup(type, {}, [])
        }
        if (typeof attributes === 'string' || attributes.constructor === Array || attributes instanceof ElementMarkup) {
            return new ElementMarkup(type, {}, Arrays.ensureArray(attributes))
        }
        if (!content) {
            content = []
        }
        content = Arrays.ensureArray(content)
        return new ElementMarkup(type, attributes as AttributeList, content)
    },

    a(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('a', attributes, content)
    },
    abbr(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('abbr', attributes, content)
    },
    area(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('area', attributes, content)
    },
    article(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('article', attributes, content)
    },
    audio(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('audio', attributes, content)
    },
    br(attributes?: AttributeList): ElementMarkup {
        return this.element('br', attributes, [])
    },
    button(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('button', attributes, content)
    },
    canvas(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('canvas', attributes, content)
    },
    caption(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('caption', attributes, content)
    },
    code(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('code', attributes, content)
    },
    col(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('col', attributes, content)
    },
    colgroup(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('colgroup', attributes, content)
    },
    data(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('data', attributes, content)
    },
    datalist(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('datalist', attributes, content)
    },
    div(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('div', attributes, content)
    },
    h1(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h1', attributes, content)
    },
    h2(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h2', attributes, content)
    },
    h3(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h3', attributes, content)
    },
    h4(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h4', attributes, content)
    },
    h5(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h5', attributes, content)
    },
    h6(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('h6', attributes, content)
    },
    i(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('i', attributes, content)
    },
    img(attributes: AttributeList): ElementMarkup {
        return this.element('img', attributes, [])
    },
    li(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('li', attributes, content)
    },
    p(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('p', attributes, content)
    },
    span(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('span', attributes, content)
    },
    ul(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('ul', attributes, content)
    },
}
