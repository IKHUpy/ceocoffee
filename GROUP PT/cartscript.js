
$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalprice = 0;
    let pricehtml = '';
    var decrementButton;
    var incrementButton;
    if (cart && cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] === null){
                console.log('null in : ', i);
                continue;
            } else if (cart[i].quantity === 0 ){
                continue;
            }
            else {
                let item = cart[i];
                let price = parseFloat(item.price).toFixed(2);
                
                totalprice += parseFloat(item.price) * item.quantity;
                let cartHtml = `
                    
                    <div class="container" id="cart-item-id-${item.id}" style="display: block;">
                        <div class="cart-item" style="padding-bottom: 40px;">
                            <img src="${item.img}">
                            
                            <div style="justify-content:center; text-align; margin: 30px; ">
                                <h4 style="font-size:30px; line-height: 2.5;">${item.name}</h4>
                                
                                <div class="flex-container" style="justify-content:center;">
                                    <p style="display:flex; flex-direction:column;"><span style="font-weight:bold; font-size: 18px; margin: 0 10px 0 10px">Brew:</span> ${item.temperature}</p>
                                    <p style="display:flex; flex-direction:column;"><span style="font-weight:bold; font-size: 18px; margin: 0 10px 0 10px">Cup Size:</span> ${item.cupSize}</p>
                                    <p style="display:flex; flex-direction:column;"><span style="font-weight:bold; font-size: 18px; margin: 0 10px 0 10px">Sugar Level:</span> ${item.sugarLevel}</p>
                                    <p style="display:flex; flex-direction:column;"><span style="font-weight:bold; font-size: 18px; margin: 0 10px 0 10px">Ice Level:</span> ${item.iceLevel}</p>
                                </div>
                            </div>   
                            <div style="padding: 60px 0 60px 0; font-size:30px; margin: 0 30px 0 30px;">
                                <p><sup>&#8369;</sup> ${price}</p>
                            </div> 
                            <div class="incrementer" style="margin-left: 30px">
                                <button style="border-top-left-radius: 10px; border-bottom-left-radius: 10px; font-size:40px;box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);" id="decrement-${i}">-</button>
                                <span id="value-${i}"></span>
                                <button style="border-top-right-radius: 10px; border-bottom-right-radius: 10px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);"id="increment-${i}">+</button>
                            </div>
                        </div>
                        </div>
                `;
                if (!item.iceLevel){
                    cartHtml = cartHtml.replace(`<p style="display:flex; flex-direction:column;"><span style="font-weight:bold; font-size: 18px; margin: 0 10px 0 10px">Ice Level:</span> ${item.iceLevel}</p>`, '');
                }
                $('#cart-display').append(cartHtml);
                let quantity = document.getElementById(`value-${i}`);
                quantity.innerHTML = cart[i].quantity;

                totalprice += parseFloat(`${item.price}`);
                console.log(i);
                decrementButton = document.getElementById(`decrement-${i}`);
                incrementButton = document.getElementById(`increment-${i}`);
                
                item.cartid = i;
                
                


                incrementButton.addEventListener('click', function() {
                    let cartid = `${item.cartid}`;
                    let cart = JSON.parse(localStorage.getItem('cart'));

                    let pricetotal = document.getElementById('total-price');

                    let decrementButton = document.getElementById(`decrement-${cartid}`);
                    let valueElement = document.getElementById(`value-${cartid}`);
                    console.log(valueElement, cartid, i);
                    if (valueElement) {
                        valueElement2 = parseInt(valueElement.innerText);
                        valueElement2++;
                        cart[cartid].quantity = valueElement2;

                        valueElement.innerText = valueElement2;
                        let updatepriceincre = 0;
                        for (var i = 0; i < cart.length; i++){
                            updatepriceincre += parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
                        }
                        pricetotal.innerText = updatepriceincre.toFixed(2);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        decrementButton.disabled = false;
                    }
                });
                
                decrementButton.addEventListener('click', function() {
                    let cartid = `${item.cartid}`;
                    let cart = JSON.parse(localStorage.getItem('cart'));

                    let pricetotal = document.getElementById('total-price');
                    console.log(pricetotal);
                    let decrementButton = document.getElementById(`decrement-${cartid}`);
                    let valueElement = document.getElementById(`value-${cartid}`);
                    valueElement2 = parseInt(valueElement.innerHTML);

                    if (valueElement2 > 0) { 
                        valueElement2--;
                        cart[cartid].quantity = valueElement2;
                        
                        let updatepricedecre = 0;
                        for (var i = 0; i < cart.length; i++){
                            updatepricedecre += parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
                        }
                        console.log(parseFloat(cart[cartid].quantity), parseFloat(cart[cartid].price));
                        console.log(updatepricedecre);


                        localStorage.setItem('cart', JSON.stringify(cart));
                        valueElement.innerText = valueElement2;
                        pricetotal.innerText = updatepricedecre.toFixed(2);
                    }
                    if (valueElement2 === 0) {
                        decrementButton.disabled = true;
                    }
                });
                

            }
        }
        pricehtml += `<h2 style="font-size: 30px"> TOTAL PRICE :&nbsp;&nbsp; <sup style="font-size: 20px">&#8369;</sup> <span style="font-size: 30px" id="total-price" class="total-price"></span> </h2>        `;
        $('#totalprice').html(pricehtml);
        let pricetotal = document.getElementById('total-price');
        let prices = 0;
        for (var j = 0; j < cart.length; j++){
            prices += parseFloat(cart[j].quantity) * parseFloat(cart[j].price);
        }
        console.log(pricetotal);
        pricetotal.innerText = prices.toFixed(2);

    } else {
        $('#cart-display').html('<p>Your Tray is empty.</p>');
    }
});

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

