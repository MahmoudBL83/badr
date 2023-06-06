document.addEventListener("DOMContentLoaded",function(){
    document.querySelector('.load-wrapp').style='opacity:0;z-index:-55';
})

let areas = map.querySelectorAll('area');
map.querySelectorAll('circle').forEach(e=>{
    e.remove()
})
let intervals = []
/******************************************/
areas.forEach(e=>{
            document.querySelectorAll('polygon').forEach(e=>{
                /*let n1 = setInterval(function(){
                    e.setAttribute('opacity', '0');
                },1000)
                let n2 = setInterval(function(){
                    e.setAttribute('opacity', '0.5');
                },2000)
                intervals.push([n1,e],[n2,e])*/
                e.setAttribute('opacity', '0.5');        
            })
            
        
})
/*********************************************/
async function updateMap(bool){
    (function ($) {
                    $(document).trigger("init");
                })(jQuery);
                

    /*[...document.querySelectorAll("polygon")].forEach(e=>{
        e.remove()
    })*/
    
   map.querySelectorAll('area').forEach(async e=>{
    //e.addEventListener("click",async function(){
        const coords = e.coords.split(',');
        const points = [];
        for (let j = 0; j < coords.length; j += 2) points.push(coords[j] + ',' + coords[j+1]);

        if(![...map.querySelectorAll("polygon")].find(e=>e.getAttribute('points')==points.join(' '))){
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', points.join(' '));
            polygon.setAttribute('opacity', '0.5');
            polygon.classList = '';
            svg = document.createElement("svg")
            map.appendChild(svg)
            map.querySelector('svg').style.zIndex = ''
            map.querySelector('svg').appendChild(polygon);
        }
        
    //})
    })
    map2 = map.cloneNode(true)
    map2.querySelector("img").src = ""
    let data = {
        'html':map2.innerHTML,
        'id':mapDiv.getAttribute('idNum')
    }
    await fetch(`/saveMap/`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async res=>{
            if(bool==true){
                document.querySelector(".image-mapper-svg").innerHTML = map.querySelector("svg").innerHTML
                await fetch(`/auctionMap/pageInfo3/${mapDiv.getAttribute('idNum')}/`)
                .then(res=>res.json())
                .then(res=>{
                    document.querySelector(".image-mapper-img").src = res.video
                    document.querySelector('.load-wrapp').style='opacity:0;z-index:-55';
                    document.querySelector('.image-mapper-svg').innerHTML = map.querySelector("svg").innerHTML
                    document.querySelector('.image-mapper-svg').querySelectorAll('polygon').forEach(e=>{
                        e.classList = ''
                        e.setAttribute("opacity","0.5")
                    })
                    let scale = 1;
                    document.querySelector(".image-mapper-svg").addEventListener("wheel", (event) => {
                        event.preventDefault();
                        const scaleFactor = Math.max(0.2, Math.min(scale + (event.deltaY * -0.001 * scale), 6));
                        scale = scaleFactor;
                        document.querySelector(".image-mapper-img").style.transform = `scale(${scale})`;
                        document.querySelector(".image-mapper-svg").style.transform = `scale(${scale})`;
                        document.querySelector(".image-mapper-img").scrollIntoView({block: 'center', inline: 'center' })
                    });
                })
                document.querySelectorAll(".container")[2].scrollLeft = scrollLeftLast
                document.querySelectorAll(".container")[2].scrollTop = scrollTopLast
                document.querySelector(".image-mapper-img").style.transform = `scale(${scale})`;
                document.querySelector(".image-mapper-svg").style.transform = `scale(${scale})`;
            }
            else{
                return
            }
        })
}

updateMap()

/*map.addEventListener("mouseover",function(){
    intervals.forEach(e=>{
        clearInterval(e[0])
    })
})*/
/*
map.addEventListener("mouseout",function(){
    document.querySelectorAll('polygon').forEach(e=>{
        if(!e.classList.contains('sold')){
            let n1 = setInterval(function(){
                e.setAttribute('opacity', '0');
            },1000)
            let n2 = setInterval(function(){
                e.setAttribute('opacity', '0.5');
            },2000)
            intervals.push([n1,e],[n2,e])
        }
        else{
            intervals.filter(e=>e[1].classList.contains('sold')).forEach(e=>{
                clearInterval(e[0])
                e[1].setAttribute('opacity', '0.5')
            })
        }
        
    })
})*/
