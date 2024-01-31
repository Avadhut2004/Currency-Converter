const baseurl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

for (select of dropdown)
{
    for(code in countrylist)
    {
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption)
        if (select.id === 'from' && code === 'USD')
        {
            newOption.selected = 'selected';
        }

        if (select.id === 'to' && code === 'INR')
        {
            newOption.selected = 'selected';
        }
    }
    select.addEventListener("change",(res)=>
    {updateflag(res.target)})

}

 const updateflag= (Element)=>
 {
    // getting the currency code for the newly selected countrylist

    let currcode = Element.value;
    let countrycode = countrylist[currcode];
    let newsrc = 'https://flagsapi.com/'+countrycode+'/flat/64.png'
    let img = Element.parentElement.querySelector('img');
    img.src = newsrc;
    
 }

 let from = document.querySelector('.from select');
 let to = document.querySelector('.to select');
 
 let btn = document.querySelector('#btn');
 btn.addEventListener("click",async (evt)=>
 {
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let value=amount.value;
    const url = baseurl+'/'+from.value.toLowerCase()+'/'+to.value.toLowerCase()+'.json';

    let response = await fetch(url);
    let conversion =await response.json();
    console.log(conversion);

    let msg = document.querySelector('form .msg');
    msg.innerText = value+' '+from.value +' = '+ value * conversion[to.value.toLowerCase()]+' '+to.value;
 })