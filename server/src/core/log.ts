const now: Function = (): string => {
    // toISOString() returns "2019-03-01T15:59:59.001Z"
    return (new Date()).toISOString().replace('T', ' ').replace(/\..*$/, '')
}

const out: Function = (prefix: string, message: string, ...objects: any[]) => {
    let args: any[] = []
    // always show date and time
    args.push(now() + ' -')
    // prefix, if given
    if (prefix) {
        args.push(prefix + ':')
    }
    // message
    args.push(message)
    // the rest parameters
    if (objects.length > 0) {
        args = [ ...args, ...objects ]
    }
    console.log.apply<Console, any[], void>(console, args) // eslint-disable-line no-console
}

export default {
    info: (message: string, ...objects: any[]) => out('Info', message, ...objects),
    warn: (message: string, ...objects: any[]) => out('Warn', message, ...objects),
    error: (message: string, ...objects: any[]) => out('Error', message, ...objects),
}
