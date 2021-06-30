import { Dictionary } from './Dictionary'

const get = async (url: string, headers?: Dictionary<string>): Promise<any> => {
    return new Promise<any>((resolve) => {
        const resolveNull = () => {
            resolve(null)
        }
        const xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open('GET', url)
        setCustomHeaders(xhr, headers)
        xhr.addEventListener('load', () => {
            let result: any = null
            try {
                result = JSON.parse(xhr.responseText)
            } catch (e) {
                //
            }

            resolve(result)
        })
        xhr.addEventListener('error', resolveNull)
        xhr.addEventListener('abort', resolveNull)
        xhr.addEventListener('timeout', resolveNull)
        xhr.send()
    })
}

const setCustomHeaders = (xhr: XMLHttpRequest, headers?: Dictionary<string>) => {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach((key: string) => xhr.setRequestHeader(key, headers[key]))
}

export default {
    get,
}
