
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
let likesArr =JSON.parse(localStorage.getItem('basket')) || [];
let urekler =JSON.parse(localStorage.getItem('heartsRed')) ||  [];


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

    const str=JSON.stringify(likesArr)
    localStorage.setItem('basket',str);

    const strUr=JSON.stringify(urekler)
    localStorage.setItem('heartsRed',strUr);

    showLikes();
    umQiyHesabla();
    ozUmqiy(likesArr.findIndex(item => item.id == i));
    console.log(tapdi.count)
}
showLikes()
function showLikes() {
    likes.innerHTML = '';
    likesArr.map((item, i) => {
       
        likes.innerHTML += `
                            <a href="../pages/detail.htm?id=${item.id}&name=${item.brand}"  id="x${i}" class="w-full  max-h-[325px] bg-white rounded-[10px] overflow-hidden shadow-[0_0_15px_#ccc]  flex flex-row">
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
                                            <button onclick="miqdarDeyis(event,-1,${i})" class="p-2.5 bg-[#bdc3c7] rounded-[10px] cursor-pointer">-</button>
                                            <button class="p-2.5 bg-[#f1948a] rounded-[10px]">${item.count}</button>
                                            <button onclick="miqdarDeyis(event,1,${i})" class="p-2.5 bg-[#bdc3c7] rounded-[10px] cursor-pointer">+</button>
                                        </div>
                                        <div>
                                            <svg onclick="trashCan(event,${i})" class="cursor-pointer" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
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
                            </a>
                        `
        ozUmqiy(i);
        
    })
}
function deleteAll() {
    likes.innerHTML = '';
    likesArr = [];

    const str=JSON.stringify(likesArr)
    localStorage.setItem('basket',str);

    qiy();
    urekler.forEach(item => {
        item.classList.toggle('urekBg');
    })
    urekler = [];

    const strUr=JSON.stringify(urekler)
    localStorage.setItem('heartsRed',strUr);

    umQiyHesabla()
    red()
}
function miqdarDeyis(e,miq, index) {
    e.preventDefault()
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

    const strUr=JSON.stringify(urekler)
    localStorage.setItem('heartsRed',strUr);

    const str=JSON.stringify(likesArr)
    localStorage.setItem('basket',str);

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
    const str=JSON.stringify(likesArr)
    localStorage.setItem('basket',str);
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

function trashCan(e,index){
    e.preventDefault()
    likesArr.splice(index, 1);

    const str=JSON.stringify(likesArr)
    localStorage.setItem('basket',str);

    showLikes();
    urekler.at(index).classList.toggle('urekBg');
    urekler.splice(index, 1);

    const strUr=JSON.stringify(urekler)
    localStorage.setItem('heartsRed',strUr);

    qiy();
    umQiyHesabla();
    red()
}
function ozUmqiy(ind){
    let qiymet=likesArr[ind].count*likesArr[ind].price;
    document.getElementById(`umQiy${ind}`).innerHTML=qiymet+` ${likesArr[ind].currency}`;
}
