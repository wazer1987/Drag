let box = document.getElementById('box')
    //4. 拿到了一屏幕的高度和宽度
    HTML = document.documentElement
    //4. 设置了边界
    minL = 0
    minT = 0
    maxL = HTML.clientWidth - box.offsetWidth
    maxT = HTML.clientHeight - box.offsetHeight
//获取当前盒子距离当前视口的尺度
// console.log(box.getBoundingClientRect())
// {
//     bottom: 110 右底点 距离 当前上边界的值
//     height: 100
//     left: 10 左顶点 距离 当前左边界的值
//     right: 110 右底点 距离 当前左边界的值
//     top: 10 左定点 距离 当前上边界的值
//     width: 100
//     x: 10 元素当前的左偏移值
//     y: 10 元素当前的上偏移值
// }
//5.  解决焦点丢失问题 在ie下我们可以把盒子和指针绑定在一起 但是谷歌不支持
// setCapture()  releaseCapture()
// 谷歌下 我们🈯只需要在移动的时候 绑定给window 就好了 但是注意 我们的this问题
//1. 鼠标按住的时候 触发这个方法
const down = function (ev) {
    //2. 拿到盒子初始位置 这些信息可能未来会在别的函数中应用
    //所以我们要把它挂在我们盒子的自定义属性上
    let {
        top,
        left
    } = this.getBoundingClientRect()
    //把我们拿到的信息 挂在到我们的盒子上
    this.startT = top
    this.startL = left
    //鼠标开始位置 也挂在我们的盒子上
    this.startX = ev.clientX
    this.startY = ev.clientY   

    //5.ie 下 解决焦点丢失问题 谷歌我们直接换成window即可 这里由于我们bind返回的是个匿名函数
    // 所以我们在鼠标抬起的时候解绑 就不解绑 所以 我们也要保存一下盒子上
    this._move = move.bind(this)
    this._up = up.bind(this)
    // this.setCapture()
    //2. 这里注意只有鼠标按下的时候  而这里面this 就是当前的盒子 才能开始移动
    window.addEventListener('mousemove',this._move)
    //3. 鼠标抬起的时候我们要移除上面的事件
    window.addEventListener('mouseup', this._up)
}
//2.鼠标移动拖拽中
const move = function(ev){
    // 动态算出来盒子应该移动的位置 
    let curL = ev.clientX - this.startX + this.startL
        curT = ev.clientY - this.startY + this.startT
    //4.边界判断
    curL = curL < minL ? minL : (curL > maxL?maxL:curL)
    curT = curT < minT ? minT : (curT > maxT?maxT:curT)

    // 然后设置我们的盒子移动的距离
    this.style.left = curL + 'px'
    this.style.top = curT + 'px'
}
//3.鼠标抬起的时候 我们要移除我们的移动事件 和 抬起事件
const up = function() {
    //5. ie下然后移除
    // this.releaseCapture()
    window.removeEventListener('mousemove',this._move)
    window.removeEventListener('mouseup',this._up)
}
box.addEventListener('mousedown',down)
