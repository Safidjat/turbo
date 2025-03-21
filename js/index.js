const masinlar = document.getElementById('masinlar');
const btn = document.getElementById('btn');
const marka = document.getElementById('marka');
const model = document.getElementById('model');
const il = document.getElementById('il');
const maks = document.getElementById('maks');
const city = document.getElementById('city');
const val = document.getElementById('val');
const ban = document.getElementById('ban');
const likes = document.getElementById('likes');
const sideBar = document.getElementById('sideBar');
const sepet = document.getElementById('sepet');
const closeTag = document.getElementById('close');
const urek = document.getElementById('urek');
const secilmis = document.getElementById('secilmis');
const qiymetler = document.getElementById('qiymetler');

const umEndQiy = document.getElementById('umEndQiy');
const UmEnd = document.getElementById('UmEnd');
const umQiy = document.getElementById('umQiy');
const mehSay = document.getElementById('mehSay');
let mSay = 0;
let umumiQiy = 0;


const modeller = Array.from(new Set(data.map(item => item.model)));
const cities = Array.from(new Set(data.map(item => item.city))).sort();
const vals = Array.from(new Set(data.map(item => item.currency)));
const bans = Array.from(new Set(data.map(item => item.banType))).sort();
const years = Array.from(new Set(data.map(item => item.year))).sort((a, b) => b - a);
const markalar = Array.from(new Set(data.map(item => item.brand))).sort();

const selects = document.querySelectorAll('select');


let count = 8;
function show() {
    masinlar.innerHTML = '';
    data
        .slice(0, count)
        .map((item, i) => {
            masinlar.innerHTML += `
                        <a href="../pages/detail.htm?id=${item.id}&name=${item.brand}" class="w-full small:w-[45%] big1:w-[31%] big3:w-[23%] max-h-[325px] bg-white rounded-[10px] overflow-hidden shadow-[0_0_15px_#ccc] relative">
                            <div  class="absolute top-[15px] right-[15px] cursor-pointer">
                                <svg onclick="sepeteAt(event.preventDefault(),this,${item.id})"  width="20" height="20" class="fill-[white]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. -->
                                    <path
                                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM131.9 280.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L278.5 384.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L131.9 280.9z" />
                                </svg>
                            </div>

                            <div class="h-[60%]">
                                <img class=" w-full  h-[100%]" src="${item.images[0]}" alt="masin" />
                            </div>
                            <div class="px-3.5 pb-2 pt-2 ">
                                <h2>${item.price} ${item.currency}</h2>
                                <p>${item.brand} ${item.model}</p>
                                <p>${item.year},${item.engine} L, ${item.odometer} ${item.odometerUnit}</p>
                                <p class="text-[#8d94ad]">Baki, ${item.dates}</p>
                            </div>
                        </a>
                            `
        })
}
show()

function artir() {
    if (count < data.length) {
        count += 8;
    }
    if (count > data.length) {
        count = data.length;
        btn.innerHTML = `Evvele`;
        btn.onclick = evvel;
    }
    show();
}

function evvel() {
    count = 8;
    show();
    btn.innerHTML = `+ 8 artir!`;
    btn.onclick = artir;
}





function selOpt() {
    modeller.map(item => model.innerHTML += `<option>${item}</option>`);
    markalar.map(item => marka.innerHTML += `<option>${item}</option>`);
    cities.map(item => city.innerHTML += `<option>${item}</option>`);
    vals.map(item => val.innerHTML += `<option>${item}</option>`);
    bans.map(item => ban.innerHTML += `<option>${item}</option>`);
    years.map(item => il.innerHTML += `<option>${item}</option>`);
    years.map(item => maks.innerHTML += `<option>${item}</option>`);
}
selOpt();

function changeCards(sel) {
    let prop = sel.name
    if (sel.value == sel[1].value) {
        sel.value = sel[0].value;
        data = copy;
        show();
    }
    else {
        data = copy.filter(item => item[prop] == sel.value);
        show()
    }

}


function sil() {
    Array.from(selects).map(item => item.value = item[0].value);
    data = copy;
    show()
}
let alertShown;
secilmis.onclick = function sepetAc() {
    sideBar.style.right = '0';
    qiymetler.style.right = '0';
    closeTag.style.display = 'inline';
    alertShown = false;
}
closeTag.onclick = function close() {
    closeTag.style.display = 'none';
    sideBar.style.right = '-1000px';
    qiymetler.style.right = '-1000px';
}
let likesArr = [];

function sepeteAt(e,bu, i) {
    //index metoduynan:
    // if(likesArr.includes(data[i])) data[i].count+=1;
    // else {likesArr.push(data[i]); data[i].count=1}
    //id metoduynan:
    let tapdi = data.find(item => item.id == i);
    // let check=likesArr.find(item=>item.id==i);
    // if(check==undefined) {likesArr.push(tapdi); tapdi.count=1;}
    // else tapdi.count+=1;

    bu.classList.toggle('urekBg');
    if (bu.classList.contains('urekBg')) {
        likesArr.push(tapdi);
        qiy();
        tapdi.count = 0;
        urekler.push(bu);

    }
    else {
        document.getElementById(`x${likesArr.findIndex(item => item.id == i)}`).style.display = 'none';
        likesArr = likesArr.filter(item => item.id != i);
        red();
        qiy();
        urekler.splice(urekler.indexOf(bu), 1);
    }
    showLikes();
    umQiyHesabla();
    ozUmqiy(likesArr.findIndex(item => item.id == i));
}
let urekler = [];

function showLikes() {
    likes.innerHTML = '';
    likesArr.map((item, i) => {
       
        likes.innerHTML += `
                            <article  id="x${i}" class="w-full  max-h-[325px] bg-white rounded-[10px] overflow-hidden shadow-[0_0_15px_#ccc]  flex flex-row">
                                <div class="w-[40%]">
                                    <img class=" h-full " src="${item.images[0]}" alt="masin" />
                                </div>
                                <div class="px-3.5 pb-2 pt-2 w-[60%]">
                                    <h2>${item.price} ${item.currency}</h2>
                                    <p>${item.brand} ${item.model}</p>
                                    <p>${item.year},${item.engine} L, ${item.odometer} ${item.odometerUnit}</p>
                                    <p class="text-[#8d94ad]">Baki, ${item.dates}</p>
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <button onclick="miqdarDeyis(-1,${i})" class="p-2.5 bg-[#bdc3c7] rounded-[10px] cursor-pointer">-</button>
                                            <button class="p-2.5 bg-[#f1948a] rounded-[10px]">${item.count}</button>
                                            <button onclick="miqdarDeyis(1,${i})" class="p-2.5 bg-[#bdc3c7] rounded-[10px] cursor-pointer">+</button>
                                        </div>
                                        <div>
                                            <svg onclick="trashCan(${i})" class="cursor-pointer" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <defs>
                                                    <style>
                                                        .fa-secondary {
                                                            opacity: .4
                                                        }
                                                    </style>
                                                </defs>
                                                <path class="fa-secondary"
                                                    d="M32 96L53.4 466.8c1.5 25.4 22.5 45.2 47.9 45.2l245.4 0c25.4 0 46.5-19.8 47.9-45.2L416 96 32 96z" />
                                                <path class="fa-primary"
                                                    d="M163.8 0c-12.1 0-23.2 6.8-28.6 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div id="div${i}">
                                        <p class="text-[15px]">Umumi qiymet: <span id="umQiy${i}"></span></p>
                                        <p class="p1 text-[15px] "></p>
                                        <p class="p2 text-[15px] "></p>
                                    </div>
                                </div>
                         </article>
                        `
        ozUmqiy(i);
        
    })
}
function deleteAll() {
    likes.innerHTML = '';
    likesArr = [];
    qiy();
    urekler.forEach(item => {
        item.classList.toggle('urekBg');
    })
    urekler = [];
    umQiyHesabla()
    red()
}
function miqdarDeyis(miq, index) {
    if(!alertShown) {
        alert('10+ alana 10% endirim!');
        alertShown=true;
    }
    if (likesArr[index].count >= 0) likesArr[index].count += miq;
    if (likesArr[index].count < 0 && miq < 0) {
        likesArr.splice(index, 1);
        urekler.at(index).classList.toggle('urekBg');
        urekler.splice(index, 1);
        showLikes();
    }
    showLikes();
    mid(index)
    red() 
    qiy();
    umQiyHesabla();
    ozUmqiy(index);
}

function red(){
    umEndQiy.innerHTML=likesArr.reduce((sum,item)=>sum+((item?.endirimli || 0)*currencySwitch(item.currency)),0)+' AZN';
    UmEnd.innerHTML=likesArr.reduce((sum,item)=>sum+((item?.end || 0)*currencySwitch(item.currency)),0)+' AZN';
}
function mid(index){
    if(likesArr[index].count<10){
        likesArr[index].endirimli=0;
        likesArr[index].end=0;
    }
    else{
        let ilk=likesArr[index].count*likesArr[index].price;
        let endirimli=ilk- 0.1*ilk; 
        let end=0.1*ilk;
        likesArr[index].endirimli=endirimli;
        likesArr[index].end=end;
        
        document.querySelector(`#div${index} .p1`).innerHTML=`Endirimli umumi qiy.: ${endirimli}`;
        document.querySelector(`#div${index} .p2`).innerHTML=`Endirim meblegi.: ${end}`;
    }
    
}


// qiymetler.style.width=`${sideBar.clientWidth}px`;
function qiy() {
    mSay = likesArr.reduce((sum, item, ind, arr) => sum += 1, 0);
    mehSay.innerHTML = mSay;
}
qiy();
function currencySwitch(cur){
    let change;
    if(cur=='USD') change= 1,7
    else if (cur=='EUR') change=1,84
    else if (cur=='AZN') change=1
    return change
}
function umQiyHesabla() {
    umumiQiy = likesArr.reduce((sum, item, ind, arr) => {
        if(item.currency=='AZN') sum += item.price * item.count
        else sum += item.price * item.count*currencySwitch(item.currency)
        return sum; 
    }, 0);  
    umQiy.innerHTML = umumiQiy+' AZN';
}
umQiyHesabla();

function trashCan(index){
    likesArr.splice(index, 1);
    showLikes();
    urekler.at(index).classList.toggle('urekBg');
    urekler.splice(index, 1);
    qiy();
    umQiyHesabla();
    red()
}
function ozUmqiy(ind){
    let qiymet=likesArr[ind].count*likesArr[ind].price;
    document.getElementById(`umQiy${ind}`).innerHTML=qiymet+` ${likesArr[ind].currency}`;
}

// function seyfedeAc(id){
//     const elem=data.find(item=>item.id==id);
//     document.querySelector('main').innerHTML='';
//     document.querySelector('main').innerHTML=`
//             <div class="mt-[20px] w-full flex-row flex max-small3:w-full  max-small3:flex-col  max-w-[600px] rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
//                 <img src="${elem.images[0]}" alt="" class=" max-small3:w-full w-[60%] object-cover object-center  rounded-t-md h-72 dark:bg-gray-500">
//                 <div class="flex max-small3:w-full  w-[40%] flex-col justify-between p-6 space-y-8">
//                     <div class="space-y-2">
//                         <h2 class="text-3xl font-semibold tracking-wide">${elem.brand},${elem.model}</h2>
//                         <p class="dark:text-gray-800">${elem.year},${elem.dates}</p>
//                         <h3>${elem.price} ${elem.currency}</h3>
//                     </div>
//                     <button type="button" class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50" fdprocessedid="edrlsj">Read more</button>
//                 </div>
//             </div>
//     `;
//     document.querySelector('main').classList.add('justify-center')
//     document.querySelector('main').classList.add('flex')
// }