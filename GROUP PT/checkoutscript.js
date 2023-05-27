let cart = JSON.parse(localStorage.getItem('cart'));
console.log('cart : ', cart);
window.onload = function() {
    console.log('checkout logged');
    //cupsize icelevel name price quantity temperature sugarlevel img
    let itemhtml = '';
    let val = 0;
    let vat = 0;
    let pay = 0;
    cart.forEach(item => {
        itemhtml += `
        <div class="linear-box">
            <div>
            <img src="${item.img}">
            </div> 
            <div class="box-element" style='padding-top: '>
                <div>Item name:
                    <h4> ${item.name}<h4>
                </div>
                <div>Ice level: 
                    <p>${item.iceLevel}</p> 
                </div>
                <div>Brew: 
                    <p>${item.temperature}</p> 
                </div>
                <div>Sugar level: 
                    <p>${item.sugarLevel}</p> 
                </div>
                <div>Cup size: 
                    <p>${item.cupSize}</p> 
                </div>
                <div>Price: 
                    <p>${item.price}</p> 
                </div>
                <div>Quantity: 
                    <p>${item.quantity}</p> 
                </div>
                
            </div>
        </div>
        `;

        pay += parseFloat(item.price) * parseFloat(item.quantity);
    });
    val = pay * 0.88;
    vat = pay * 0.12;
    $('#items').append(itemhtml);
    $('#total-value').append(val.toFixed(2));
    $('#vat-value').append(vat.toFixed(2));
    $('#payment').append(pay.toFixed(2));
    
}

document.getElementById('tray').addEventListener('click', function() {
    window.location.href = '/cart.html';
});