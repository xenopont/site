const get = async (url: string): Promise<any> => {
    return new Promise<any>((resolve) => {
        const resolveNull = () => {
            resolve(null)
        }
        const xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open('GET', url)
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

const post = async (url: string, data: any): Promise<any> => {
    throw new Error('Not implemented')
}

export default {
    get,
    post,
};
