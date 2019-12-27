export default class Arrays {
    public static ensureArray(entity: any): any[] {
        if (entity.constructor === Array) {
            return entity
        }
        return [entity]
    }
}
