export default async (ms: number): Promise<void> => new Promise<void>((resolve: Function) => setTimeout(() => resolve(), ms))
