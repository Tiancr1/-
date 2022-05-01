const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
//初始化hashMap，如果hasMap为空时用原有的数组，如果不为空则使用xObject
const hasMap = xObject || [
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'bilibili.jpg',logoType:'image',url:'https://www.bilibili.com'},
]

const simplifyUrl = (url)=>{
    return url
    .replace('http://','')
    .replace('https://','')
    .replace('www.','')
    .replace(/\/.*/,'')  //删除/开头的内容
}
const rander = ()=>{
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node, index)=>{
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url,'_self')
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡
            hasMap.splice(index,1)
            rander()
        })
    })
}
rander()
$('.addButton').on('click',()=>{
    
    let url = window.prompt('你要添加的网址是什么？')
    if(url.indexOf('http')!==0){
        url = 'https://'+url
    }
    hasMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        logoType:'text',
        url:url
    });
    rander()
})
window.onbeforeunload = ()=>{
    //将hasMap从对象变成string类型
    const string = JSON.stringify(hasMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i=0;i<hasMap.length;i++){
        if(hasMap[i].logo.toLowerCase() === key){
            window.open(hasMap[i].url,'_self')
        }
    }
})