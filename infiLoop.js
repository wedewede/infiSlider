let $buttons=$('#buttons>button')
let $sliders=$('#sliders')
let $images=$('#sliders>img')
let current=0
makefake()
bindEvents()
function makefake() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $sliders.append($firstCopy)
    $sliders.prepend($lastCopy)
}
function slide(index){
    if(index<0){
        index=$buttons.length-1
    } else if (index > $buttons.length - 1){
        index=0
    }
    if (current === ($buttons.length - 1) && index === 0) {
        //最后一张到第一张
        $sliders.css({
                transform: `translateX(${-($buttons.length + 1)*400}px)`
            })
            .one('transitionend', function () {
                $sliders.hide().offset()
                $sliders.css({
                    transform: `translateX(${-(index+1)*400}px)`
                }).show()
            })
    } else if (current === 0 && index === ($buttons.length - 1)) {
        //第一张到最后一张    
        $sliders.css({
                transform: 'translateX(0px)'
            })
            .one('transitionend', function () {
                $sliders.hide().offset()
                $sliders.css({
                    transform: `translateX(${-(index+1)*400}px)`
                }).show()
            })
    } else {
        $sliders.css({
            transform: `translateX(${-(index+1)*400}px)`
        })
    }
    current = index
    highlight(index)
}
$('#prev').on('click',function(){
    slide(current-1)
})
$('#next').on('click', function () {
    slide(current+1)
})
function highlight(index){
    $buttons.eq(index).addClass('red').siblings().removeClass('red')
}
function bindEvents(){
    $('#buttons').on('click', 'button', function (e) {
        let index = $(e.currentTarget).index()
        slide(index)
    
    })

}

