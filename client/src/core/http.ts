export default {
    get: async (url: string): Promise<string|null> => {
        return new Promise<string|null>((resolve) => {
            const resolveNull = () => { resolve(null) }
            const xhr: XMLHttpRequest = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.addEventListener('load', () => { resolve(xhr.responseText) })
            xhr.addEventListener('error', resolveNull)
            xhr.addEventListener('abort', resolveNull)
            xhr.addEventListener('timeout', resolveNull)
            xhr.send()
        })
    }
}
