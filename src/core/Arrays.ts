class Arrays {
    public static ensureArray(entity: any): any[] {
        if (entity === null || entity === undefined) {
            return []
        }
        if (this.isArray(entity)) {
            return entity
        }

        return [entity]
    }

    public static isArray(entity: any): boolean {
        return entity.constructor === Array
    }
}

export default Arrays
