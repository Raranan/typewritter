// el：挂载元素
// content：打印元素，要求为一个数组
function main(options) {
    let {el, content, typeInterval, backInterval, pauseDelay, cursorInterval} = options
    if (!typeInterval || Number.isNaN(Number(typeInterval))) typeInterval = 300 // 打字间隔
    if (!backInterval || Number.isNaN(Number(backInterval))) backInterval = 200 // 回退间隔
    if (!pauseDelay || Number.isNaN(Number(pauseDelay))) pauseDelay = 0 // 停顿时间
    if (!cursorInterval || Number.isNaN(Number(cursorInterval))) cursorInterval = 200 // 光标闪烁间隔
    if (typeof el != "string") {
        console.error("el is required String")
        return
    }
    if (!Array.isArray(content)) {
        console.error("content is required Array")
        return
    }

    let i = 0 // content数组的索引
    let num = 0 // 目前打印的字体数
    let timer = null; // 定时器
    let flashFlag = true; // 控制光标闪烁

    let typed = document.querySelector(el);

    typing()
    // 打字效果
    function typing() {
        timer = setInterval(() => {
            print(content[i])
            num++
            if (num > content[i].length) {
                num = content[i].length

                let delayTimer = setTimeout(() => {
                    clearInterval(timer)
                    backspace()
                    clearTimeout(delayTimer)
                }, pauseDelay)
            }
        }, typeInterval)
    }
    // 退格效果
    function backspace() {
        timer = setInterval(() => {
            print(content[i])
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
    // element：元素
    // flag：用于控制光标闪烁
    function cursorFlash(element, flag) {
        let cursor = document.querySelector(element)
        let timer = setTimeout(() => {
            if (flag) {
                cursor.style.opacity = "0"
                flag = false
                clearTimeout(timer)
            } else {
                cursor.style.opacity = "1"
                flag = true
                clearTimeout(timer)
            }
        }, cursorInterval)
        return flag
    }

    function print(content) {
        typed.innerHTML = `<span>${content.slice(0, num)}</span><span class="cursor"></span>`;
        flashFlag = cursorFlash(".cursor", flashFlag)
    }
}