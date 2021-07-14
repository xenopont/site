export type RouteAction = (args?: string[]) => void

export const defaultAction: RouteAction = () => { /* do nothing */ }
