function main(options) {
    let { el, content, typeInterval, backInterval, pauseDelay, cursorInterval } = options
    if (typeof el != "string") {
        console.error("el is required String")
        return
    }
    if (!Array.isArray(content)) {
        console.error("content is required Array")
        return
    }
    if (!typeInterval || Number.isNaN(Number(typeInterval))) typeInterval = 300 // 打字间隔
    if (!backInterval || Number.isNaN(Number(backInterval))) backInterval = 200 // 回退间隔
    if (!pauseDelay || Number.isNaN(Number(pauseDelay))) pauseDelay = 0 // 停顿时间
    if (!cursorInterval || Number.isNaN(Number(cursorInterval))) cursorInterval = 200 // 光标闪烁间隔

    let i = 0 // content数组的索引
    let num = 0 // 目前打印的字体数
    let timer = null; // 定时器

    let typed = document.querySelector(el);

    typing()
    cursorFlash(".cursor")

    // 打字效果
    function typing() {
        let delayTimer = null
        timer = setInterval(() => {
            print()
            num++
            if (num > content[i].length) {
                num = content[i].length
                if (!delayTimer) {
                    delayTimer = setTimeout(() => {
                        clearInterval(timer)
                        backspace()
                        clearTimeout(delayTimer)
                    }, pauseDelay)
                }
            }
        }, typeInterval)
    }

    // 退格效果
    function backspace() {
        timer = setInterval(() => {
            print()
            num--
            if (num < 0) {
                num = 0
                clearInterval(timer)
                i++
                if (i === content.length) {
                    i = 0
                }
                typing()
            }
        }, backInterval)
    }

    // 光标闪烁效果
    // el：元素
    function cursorFlash(el) {
        let cursor = document.querySelector(el)
        let flag = true
        let interval = setInterval(() => {
            if (flag) {
                cursor.style.opacity = "0"
                flag = false
            } else {
                cursor.style.opacity = "1"
                flag = true
            }
        }, cursorInterval)
    }

    function print() {
        typed.innerText = `${content[i].slice(0, num)}`;
    }
}

export default main