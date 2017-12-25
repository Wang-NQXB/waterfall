无依赖的瀑布流插件。压缩后不到1kb。
使用方式
```html
<div class="container">
    <div>item1</div>
    <div>item2</div>
    <div>item3</div>
</div>
```
```js
import waterfall from 'waterfall'

waterfall('.container')
window.addEventListener('resize', ()=>waterfall('.container'))
```