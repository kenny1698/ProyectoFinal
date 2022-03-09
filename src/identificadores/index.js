export function generarId(info) {
    let extraInfo = 'no-info'
    if (info) {
        extraInfo = info
    }
    return `${Date.now()}-${extraInfo}`
}