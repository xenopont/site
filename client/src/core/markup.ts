import Arrays from './Arrays'

type HtmlElementEventHandler = (sender: HTMLElement) => void

type AttributeValue = string | number | AttributeList
type AttributeList = { // tslint:disable-line:interface-over-type-literal
    [key: string]: AttributeValue
}

const attachAttribute = (element: HTMLElement, attrName: string, attrValue: AttributeValue) => {
    switch (attrName) {
        case 'style':
            Object.keys(attrValue).forEach((selector: string) => {
                (element.style as any)[selector] = (attrValue as AttributeList)[selector]
            })
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

class ElementMarkup { // tslint:disable-line:max-classes-per-file
    private readonly type: string
    private readonly attributes: AttributeList
    private content: ElementChild[]
    // -------- Event Handlers --------
    private createEventHandler: HtmlElementEventHandler | null = null

    public constructor(type: string, attributes: AttributeList, content: ElementChild[]) {
        this.type = type
        this.attributes = attributes
        this.content = content
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

type MarkupContent = ElementMarkup | ElementMarkup[] | string | string[]

export { AttributeList }
export { AttributeValue }
export { ElementMarkup }
export { HtmlElementEventHandler }
export { MarkupContent }
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
    img(attributes: AttributeList): ElementMarkup {
        return this.element('img', attributes, [])
    },
    p(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('p', attributes, content)
    },
    span(attributes?: AttributeList | MarkupContent, content?: MarkupContent): ElementMarkup {
        return this.element('span', attributes, content)
    },
}
