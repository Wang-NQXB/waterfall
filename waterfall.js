/**
 *
 * @param container 容器
 * @param mb margin bottom
 * @param mr 最小 margin right
 */
export default function waterfall (container, mb = 15, mr = 15) {
    typeof(container) === 'string' && (container = document.querySelector(container))

    let debounceTimer = null
    container.style.position = 'relative'

    const els = [].map.call(container.children, el => {
        el.style.position = 'absolute'
        el.querySelector('img').onload = () => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {waterfall(container, mb, mr)}, 200)
        }

    return el
})

    const elNums = els.length
    if (elNums === 0) return

    const elWidth = els[0].clientWidth
    let cols = Math.floor(container.clientWidth / elWidth)
    while ((container.clientWidth - cols * elWidth) / (cols - 1) < mr) {cols--}
    mr = (container.clientWidth - cols * elWidth) / (cols - 1)

    const tempHeights = new Array(cols)
    const getMin = arr => {
        let index = 0
        let val = arr[0]

        for (let i = 1, len = arr.length; i < len; i++) {
            arr[i] < val && (index = i, val = arr[i])
        }

        return [val, index]
    }

    for (let i = 0; i < cols && i < elNums; i++) {
        let el = els[i]

        el.style.top = '0'
        el.style.left = i * (mr + elWidth) + 'px'
        tempHeights[i] = el.clientHeight + mb
    }

    for (let i = cols; i < elNums; i++) {
        let el = els[i]
        let [val, index] = getMin(tempHeights)

        el.style.top = val + 'px'
        el.style.left = index * (mr + elWidth) + 'px'
        tempHeights[index] += el.clientHeight + mb
    }

    container.style.height = Math.max(...tempHeights) + 'px'
}
