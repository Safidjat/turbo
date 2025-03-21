const masinlar = document.getElementById('masinlar');
const btn = document.getElementById('btn');
const marka = document.getElementById('marka');
const model = document.getElementById('model');
const il = document.getElementById('il');
const maks = document.getElementById('maks');
const city = document.getElementById('city');
const val = document.getElementById('val');
const ban = document.getElementById('ban');

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

