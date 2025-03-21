console.log(window.location);
const search=window.location.search;
console.log(search);
// console.log(search.split('').at(4))
console.log(new URLSearchParams(location.search))//size:2
console.log(new URLSearchParams(location.search).get('id'))
console.log(new URLSearchParams(location.search).get('name'))

const main=document.querySelector('main');

const id=new URLSearchParams(location.search).get('id')
//id-ye gore element teyini
const item=data.find(item=>item.id==id);
console.log(item)
function show(){
    main.innerHTML=`
        <div class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <a rel="noopener noreferrer" href="#" class="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                <img src="${item.images[0]}" alt="${item.brand} ${item.model}" class="object-cover w-full h-64 lg:rounded rounded-t sm:h-96 lg:col-span-7 dark:bg-gray-500">
                <div class="p-6 space-y-2 lg:col-span-5 bg-gray-100">
                    <h3 class="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">${item.brand},${item.model}</h3>
                    <span class="text-xs dark:text-gray-600">${item.year},${item.dates} ${item.city}</span>
                    <p>
                        ${item.banType}
                        ${item.odometer}
                        ${item.credit? 'Kredite verilir!' : 'Nagd verilir!'}
                    </p>
                    <h4 class="text-xl font-semibold">${item.price} ${item.currency}</h4>
                </div>
            </a>
        </div>
    `;
}
show();