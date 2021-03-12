const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const y = localStorage.getItem('y');
const xObject=JSON.parse(y)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.bootcdn.cn/' },
    { logo: 'B', url: 'https://bilibili.com' },
    { logo: 'I', url: 'https://www.iconfont.cn/' }
];//parcel 会默认添加一个全局作用域，所以要用window去创建全局变量


const simplifyurl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
    .replace( /\.*/,'')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>          
                    <div class="site"> 
                    <div class="log">${node.logo}</div>
                    <div class="link">${simplifyurl(node.url)}</div>
                    <div class="close">
                     <svg class="icon">
                            <use xlink:href="#iconclose1"></use>
                        </svg>
                    </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', ()=> {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$(".button").on('click', () => {
        let url = window.prompt('请问你要添加的网址是什么？')
        if (url.indexOf('http') !== 0) {
            url = 'https://www.' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyurl(url)[0].toUpperCase(),
            logoType: "text",
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('y',string)
}//储存到本地银盘为y的一个地方


$(document).on('keypress', (e) => {
    //const key = e.key当变量名和属性名一致的情况下可以使用简写
    const { key } = e
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
    //console.log(e.keyCode)//这里用key打印出来的是字母用keycode是字母在编码里的数字
})//键盘监听事件