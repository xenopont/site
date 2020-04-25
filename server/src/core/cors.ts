import { Request, Response } from 'express'

const getAllowedOrigin: Function = (headers: NodeJS.Dict<string>): string => {
    if (!headers.origin) {
        return '*'
    }
    // you can block origins here,
    // or allow just some of them
    return headers.origin
}

export default (request: Request, response: Response, next: Function) => {
    response.setHeader('Access-Control-Allow-Origin', getAllowedOrigin(request.headers))
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('X-Powered-By', 'Portal')
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        // 'Content-Type' header should not be set here, as it's not allowed by the browser
        response.status(204).send()
    }
    else {
        next()
    }
}
