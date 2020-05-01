const datetime = (): string => {
    return new Date().toISOString().replace('T', ' ').replace(/^([^.]*)\.(.*)$/, '$1')
}

export default (): void => {
    console.log( // eslint-disable-line no-console
        '\n' +
        '┌─────────────────────┐\n' +
        `│ ${datetime()} │\n` +
        '└─────────────────────┘\n' +
        '\n' +
        'Dev Environment started'
    )
}
