class Arrays {
    public static ensureArray(entity: any): any[] {
        if (entity === null || entity === undefined) {
            return []
        }
        if (entity.constructor === Array) {
            return entity
        }

        return [entity]
    }
}

export default Arrays
