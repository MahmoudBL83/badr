let scrollTopLast=0,scrollLeftLast = 1, scale = 1;
        savePoly.addEventListener('click',async function(evt){
            evt.preventDefault()
            if(beginArea.value&&pieceNum.value&&blockNum.value){
                scrollLeftLast = document.querySelectorAll(".container")[2].scrollLeft
                scrollTopLast = document.querySelectorAll(".container")[2].scrollTop
                document.querySelector('.load-wrapp').style='';
                let code = $("#image-map").imageMapper("asHTML") + '<svg width="500" height="500" style="z-index:-1"></svg>'
                document.querySelector('.container.toggle-content').style.display = "none"
                areasHTML = ''
                map.querySelectorAll("area").forEach(e=>{
                    areasHTML+=e.outerHTML
                })
                let oldSVGs = ""
                if(map.querySelector("svg")){
                    oldSVGs = map.querySelector("svg").innerHTML
                }
                
                map.innerHTML = ''
                map.insertAdjacentHTML('beforeend',code)
                
                map.querySelector("map").insertAdjacentHTML('beforeend',`
                    ${areasHTML}
                `)

                map.querySelector("svg").insertAdjacentHTML('beforeend',`
                    ${oldSVGs}
                `)
                
                map.querySelector('img').src = document.querySelector('.image-mapper-img').src
                map.querySelector('img').style.width = '100%'
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
                .then(async()=>{
                    let pieceInfo = [...document.querySelector('#image-mapper-table').querySelector('tbody').querySelectorAll('td')].filter((_,i)=>i>4)
                    let data2 = {
                        'id':mapDiv.getAttribute('idNum'),
                        'pieceType': pieceInfo[0].querySelector('select').value,
                        'name': pieceInfo[1].querySelector('input').value,
                        'number': pieceInfo[2].querySelector('input').value,
                        'width': pieceInfo[3].querySelector('input').value,
                        'height': pieceInfo[4].querySelector('input').value,
                        'area': pieceInfo[5].querySelector('input').value,
                        'type': pieceInfo[6].querySelector('select').value,
                        'price': pieceInfo[8].querySelector('input').value,
                        'shape': localStorage.getItem("coords"),
                        //'shape': document.querySelector('.image-mapper-svg').innerHTML,
                    };
                    await fetch('/pieces/add/',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data2)
                    })
                    .then(()=>{
                        //map.querySelector("svg").innerHTML = document.querySelector(".image-mapper-svg").innerHTML;
                        getMap(true);     
                    });
                });
            }
            if(!beginArea.value){
                beginArea.style.borderColor = "red"
                beginArea.addEventListener("input",function(){this.style.borderColor = ""})
            }
            if(!pieceNum.value){
                pieceNum.style.borderColor = "red"
                pieceNum.addEventListener("input",function(){this.style.borderColor = ""})
            }
            if(!blockNum.value){
                blockNum.style.borderColor = "red"
                blockNum.addEventListener("input",function(){this.style.borderColor = ""})
            }
            /*else{
                alert("تأكد من ملاً جميع البيانات")
            }*/
        })

        async function getMap(bool){
            await fetch(`/getMap/${mapDiv.getAttribute('idNum')}/`)
            .then(res=>res.json())
            .then(res=>{
                if(map.querySelector("img")){
                    map.innerHTML = res
                    if(bool == true){
                        console.log(99)
                        updateMap(true)
                    }
                }
            });
        }

        document.querySelectorAll('area').forEach(e=>{
            e.href = "#"
        })

        //editBlocks.addEventListener("click",function(){
            document.querySelector('.container.toggle-content').classList.add('forceDisplay')
            document.querySelector('.container.toggle-content.segment')?.classList.add('forceDisplay')
            
            document.querySelector('.image-mapper-img').src = map.querySelector("img").src
            document.querySelector('.image-mapper-svg').innerHTML = map.querySelector("svg").innerHTML
            document.querySelector('.image-mapper-svg').querySelectorAll('polygon').forEach(e=>{
                e.classList = ''
                e.setAttribute("opacity","0.5")
            })
            /*document.querySelector("#image-map-container").querySelectorAll("polygon").forEach(e=>{
            e.addEventListener("contextmenu",async function(event){
                event.preventDefault();
                Swal.fire({
                        title: "تحذير",
                        text: 'هل أنت متأكد من حذف القطعة أو البلوك ؟',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'تنفيذ',
                        cancelButtonText: 'تراجع',
                    })
                    .then(async(result) => {
                        if (result.isConfirmed) {
                            await fetch(`/pieces/del/?id=${mapDiv.getAttribute('idNum')}&coords=${e.getAttribute("points")}`)
                            .then(async()=>{
                                console.log(e);
                                [...map.querySelectorAll("area")].forEach(elm=>console.log(elm.getAttribute("coords")));
                                console.log(e.getAttribute("points").replaceAll(" ",","));
                                console.log([...map.querySelectorAll("area")].filter(elm=>elm.getAttribute("coords")==e.getAttribute("points").replaceAll(" ",","))[0]);
                                [...map.querySelectorAll("area")].filter(elm=>elm.getAttribute("coords")==e.getAttribute("points").replaceAll(" ",","))[0]?.remove()
                                map.querySelector("svg")?.remove()
                                let data = {
                                    'html':map.innerHTML,
                                    'id':mapDiv.getAttribute('idNum')
                                }
                                await fetch(`/saveMap/`,{
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                })
                                .then(()=>{
                                    Swal.fire(
                                        'تم التعديل',
                                        '',
                                        'success'
                                    )
                                    .then(()=>{
                                        location.reload()
                                    })
                                })
                            })
                        }
                    })
                })
            })*/
        //})

        /*async function autoFunc(){
            document.querySelector("#beginSQM").addEventListener("input",function(){
                beginTotal.value = document.querySelector("#beginArea").value * this.value
            })

            beginTotal.addEventListener("input",function(){
                document.querySelector("#beginSQM").value = this.value / document.querySelector("#beginArea").value
            })
        }

        setInterval(()=>{
            autoFunc()
        },1000)*/

        if(!document.querySelector(".image-mapper-img").src.includes("base")){
            document.querySelector("#image-mapper-delete").style.display = "none"
            document.querySelector("#image-mapper-upload").style.display = ""
        }
        else{
            document.querySelector("#image-mapper-delete").style.display = ""
            document.querySelector("#image-mapper-upload").style.display = "none"
        }

        document.querySelector("#image-mapper-delete").addEventListener("click",async function(){
            Swal.fire({
                title: "تحذير",
                text: 'سيتم حذف كامل القطع الموجودة بالمخطط',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'تنفيذ',
                cancelButtonText: 'تراجع',
            })
            .then(async(result) => {
                if (result.isConfirmed) {
                    document.querySelector('.load-wrapp').style=''
                    await fetch(`/deleteMap?id=${mapDiv.getAttribute('idNum')}`)
                    .then(()=>{location.reload()})
                }
            })
        })

        //zooming
        document.querySelector(".image-mapper-img").addEventListener("mousemove", (event) => {
            const x = event.clientX;
            consty = event.clientY;
            const imageWidth = document.querySelector(".image-mapper-img").offsetWidth;
            const imageHeight = document.querySelector(".image-mapper-img").offsetHeight;
            const offsetX = (x - document.querySelector(".image-mapper-img").offsetLeft - imageWidth / 2) / imageWidth * 2;
            const offsetY = (y - document.querySelector(".image-mapper-img").offsetTop - imageHeight / 2) / imageHeight * 2;
            document.querySelector(".image-mapper-img").style.transform = `scale(1.2) translate(${offsetX * 20}px, ${offsetY * 20}px)`;
        });

        const image = document.querySelector(".image-mapper-img");
        
        document.querySelector(".image-mapper-svg").addEventListener("wheel", (event) => {
            event.preventDefault();
            const scaleFactor = Math.max(0.2, Math.min(scale + (event.deltaY * -0.001 * scale), 6));
            scale = scaleFactor;
            document.querySelector(".image-mapper-img").style.transform = `scale(${scale})`;
            document.querySelector(".image-mapper-svg").style.transform = `scale(${scale})`;
            document.querySelector(".image-mapper-img").scrollIntoView({block: 'center', inline: 'center' })
        });