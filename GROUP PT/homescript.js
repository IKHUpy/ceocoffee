let cart = JSON.parse(localStorage.getItem('cart')) || [];
var isopen = false;
var id;
var iddigit;
window.onload = function() {
  
    const menuItems = document.querySelectorAll('.menu-item');
    let catego = 'All'
    menuItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
          let catego =  item.innerText;
          fetchset(catego);
        menuItems.forEach((item) => {
          item.classList.remove('selected');
        });
    
        e.target.classList.add('selected');
      });
    });
    fetchset(catego);

    
    $(document).on('click', '[id^="order-button-"]', function(event) {
        if (isopen === false){
            event.stopPropagation();
            id = this.id;
            iddigit = id.split('-')[2];
            var previews = document.getElementById(`overlay2-${iddigit}`);
            previews.style.display = 'block';
            
            isopen = true;
        }    
    });
    $(document).on('click', function(event) {
        if (isopen === true){
            event.stopPropagation();
            if ($(event.target).closest('.preview').length){
            }
            else{
                var previews = document.getElementById(`overlay2-${iddigit}`);
                previews.style.display = 'none';
                
                isopen = false;
            }
        }
    });
    
};

var parentLayer = document.querySelector('.parent-layer');
var overlay = document.querySelector('.overlay');

if (parentLayer) {
  parentLayer.addEventListener('mouseover', function() {
    let overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.opacity = '100%';
      overlay.style.height = '60px';
      overlay.style.bottom = '0';
    }
  });

  parentLayer.addEventListener('mouseout', function() {
      if (isopen === true){
          overlay.style.opacity = '0%';
          overlay.style.height = '0';
      }
  });
}

if (overlay) {
  overlay.addEventListener('mouseover', function() {
      overlay.style.backgroundColor = 'var(--clr-accent-250)';
      overlay.style.color = 'black';
      overlay.style.cursor = 'pointer';
  });

  overlay.addEventListener('mouseout', function() {
      overlay.style.backgroundColor = 'var(--clr-accent-300)';
      overlay.style.color = '';
  });
}   

window.addEventListener('click', function(event) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === 'block' && !event.target.matches('.dropdown')) {
        openDropdown.style.display = 'none';
      }
    }
  });
  
function fetchset(catego) {
  fetch('data.json')
  .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.text();
  })
  .then(text => {
      var data = JSON.parse(text);
      var contentDiv = $('#product-section');
      $.each(data.categories, function(i, category) {
          if (category.name === catego) {
            contentDiv.empty();
            let shuffledTypes = shuffleArray(category.types);
              $.each(shuffledTypes, function(j, type) {

                  let parenthtml = `<div class="parent-layer" id="${type.ID}">
                  <img src="${type.img}" alt="">
                  <div class="overlay" id="order-button-${type.ID}">
                      <h3 id="h3-${type.ID}">ORDER</h3>
                      <div class="overlay2" id="overlay2-${type.ID}" style="display:none;"> <!--display:none;-->
                          <div class="parent" id="parent-${type.ID}">    
                              <div class="preview" id="preview-${type.ID}" style="background-color: var(--clr-accent-100);">
                                  <div class="choices-column">
                                      <div class="image-row">
                                          <div class="main-column" >
                                              <div class="pop-image">
                                                  <img src="${type.img}" alt="">
                                              </div>    
                                              <div class="dps"> 
                                                      <div style="display: grid; grid-template-rows: 3fr 4fr; align-items: center;">
                                                          <div style="height: 40px;">
                                                              <h3>
                                                              ${type.name}
                                                              </h3>           
                                                          </div>
                                                          <div style="position:flex;display: grid; font-weight: normal; font-size:13px; letter-spacing: 0.5px; margin; 0 10px 0 10px ; width: 380px; overflow: hidden;">  
                                                          <p>${type.description}</p>  
                                                          </div>     
                                                      </div>                                                    
                                                      <div style="display: grid; grid-template-columns: 4fr 2fr;">
                                                      <h5 style="display: grid; align-items: center; justify-content: left; justify-content: center; text-align: center; font-size: 28px; border: 1px solid; border-radius: 10px; margin: 5px;">&#8369; ${type.price.toFixed(2)}</h5> 
                                                      <div style="display:grid;align-items: center; justify-content: center; background-color: var(--clr-accent-300); border-radius: 10px; margin: 5px;">
                                                          <img src="/images/bookmark-silhouette-variant.svg" alt="" style="height: 28px;"> 
                                                      </div>
                                                  </div>
                                              </div>    
                                          </div>
                                      </div>
                                      <div style="display: grid; grid-template-columns: 1fr 1fr; height: 75px; background-color: transparent; border-radius: 0 10px 10px 0;">
                                          <div style="display: grid; grid-template-columns: 75px 225px; border: 2px solid black;"> 
                                              <div style="display: grid;"> 
                                                  <h4 style="display: grid; align-items: center;">BREW</h4>
                                              </div>
                                              <div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center;" id="brew-choice-${type.ID}"> 
                                                  <div style="margin-left: 20px;" class="selectable">HOT</div>
                                                  <div style="margin-right: 20px;" class="selectable">COLD</div>
                                              </div>
                                          </div>
                                          <div style="display: grid; grid-template-columns: 75px 225px;   border-top: 2px solid black;  border-bottom: 2px solid black;"> 
                                              <div style="display: grid; align-items: center; justify-content: center;"> 
                                                  <h4>CUP</h4>
                                              </div>
                                              <div style="display: grid; align-items: center;"> 
                                                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; align-items: center; font-size: 10px;" id="cup-choice-${type.ID}"> 
                                                      <div class="selectable">CLOUT</div>
                                                      <div class="selectable">GYATT</div>
                                                      <div class="selectable">CHINITA</div>
                                                      <div class="selectable">MOMMY</div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div style="display: grid; grid-template-columns: 1fr 1fr; height: 75px; background-color: transparent; border-radius: 0 10px 10px 0;">
                                          <div style="display: grid; grid-template-columns: 75px 225px;  border-top: 2px solid black; border-bottom: 2px solid black; border-left: 2px solid black;" id="ice-section-${type.ID}"> 
                                              <div> 
                                                  <h4 style="justify-items: center; padding-top: 25px;">ICE</h4>
                                              </div>
                                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; align-items: center; padding-right: 20px;" id="ice-choice-${type.ID}"> 
                                                  <div class="selectable">0<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">25<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">50<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">75<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">100<sup style="font-size:10px">%</sup></div>   
                                              </div>
                                          </div>
  
                                          <div style="display: grid; grid-column: 2;grid-template-columns: 75px 225px;  border-top: 2px solid black;  border-bottom: 2px solid black; display: grid; grid-column: 2;grid-template-columns: 75px 225px;  border-top: 2px solid black;  border-bottom: 2px solid black; border-left: 2px solid black;"> 
                                              <div> 
                                                  <h4 style="justify-items: center; padding-top: 25px;">SUGAR</h4>
                                              </div>
                                              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; align-items: center; padding: 0 10px 0 10px;"  id="sugar-choice-${type.ID}"> 
                                                  <div class="selectable">0<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">25<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">50<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">75<sup style="font-size:10px">%</sup></div>
                                                  <div class="selectable">100<sup style="font-size:10px">%</sup></div>  
                                              </div>
                                          </div>
                                      </div>
                                      <button style="display: grid; grid-template-columns: 1fr; align-items: center; background-color: var(--clr-accent-300); letter-spacing: 0px; word-spacing: 4px;" class="cart-" id="add-cart-${type.ID}"> 
                                          <div style=" display: grid; background-color: transparent; font-weight: bold;">ADD TO CART</div>
                                      </button>
                                  </div> 
                                  <div class="shopping-column">
                                      <h3>SHOPPING CART</h3>
                                  </div>
  
                              </div>
                          </div>    
                      </div>
                  </div>
              </div>`
                  contentDiv.append(parenthtml);
                  var parentLayer = document.getElementById(`${type.ID}`);
                  var overlay = document.getElementById(`order-button-${type.ID}`);
  
                  parentLayer.addEventListener('mouseover', function() {
                      overlay.style.opacity = '100%';
                      overlay.style.height = '60px';
                      overlay.style.bottom = '0';
                  });
  
                  parentLayer.addEventListener('mouseout', function() {
                      if (isopen !== true){
                          overlay.style.opacity = '0%';
                          overlay.style.height = '0';
                      }
                  });
                  overlay.addEventListener('mouseover', function() {
                      overlay.style.backgroundColor = 'var(--clr-accent-250)';
                      overlay.style.color = 'black';
                      overlay.style.cursor = 'pointer';
                  });
  
                  overlay.addEventListener('mouseout', function() {
                      overlay.style.backgroundColor = 'var(--clr-accent-300)';
                      overlay.style.color = '';
                  });
                  
  
                  let ice_parent = document.getElementById(`ice-choice-${type.ID}`);
                  ice_parent.addEventListener('click', function(event) {
                      let target = event.target;
                      if (target.classList.contains('selectable')) {
                          let current = ice_parent.getElementsByClassName('selected');
                          if (current[0]) {
                              current[0].classList.remove('selected');
                          }
                          target.classList.add('selected');
                      }
                  });
                  let brew_parent = document.getElementById(`brew-choice-${type.ID}`);
                  brew_parent.addEventListener('click', function(event) {
                      let target = event.target;
                      if (target.classList.contains('selectable')) {
                          let current = brew_parent.getElementsByClassName('selected');
                          if (current[0]) {
                              current[0].classList.remove('selected');
                          }
                          target.classList.add('selected');
                          if (target.textContent === 'HOT') {
                              
                              let iceChoice = document.getElementById(`ice-section-${type.ID}`);
                              
                              iceChoice.style.display = 'none'; 
                          } 
                          if (target.textContent === 'COLD') {
                              
                              let iceChoice = document.getElementById(`ice-section-${type.ID}`);
                              
                              iceChoice.style.display = 'grid'; 
                          } 
                          
                      }
                  });
  
                  let cup_parent = document.getElementById(`cup-choice-${type.ID}`);
                  cup_parent.addEventListener('click', function(event) {
                      let target = event.target;
                      if (target.classList.contains('selectable')) {
                          let current = cup_parent.getElementsByClassName('selected');
                          if (current[0]) {
                              current[0].classList.remove('selected');
                          }
                          target.classList.add('selected');
                      }
                  });
                  let sugar_parent = document.getElementById(`sugar-choice-${type.ID}`);
                  sugar_parent.addEventListener('click', function(event) {
                      let target = event.target;
                      if (target.classList.contains('selectable')) {
                          let current = sugar_parent.getElementsByClassName('selected');
                          if (current[0]) {
                              current[0].classList.remove('selected');
                          }
                          target.classList.add('selected');
                      }
                  });
  
                  let submitButton = document.getElementById(`add-cart-${type.ID}`);
                  submitButton.addEventListener('click', function() {
                      let brewParent = document.getElementById(`brew-choice-${type.ID}`);
                      let iceParent = document.getElementById(`ice-choice-${type.ID}`);
                      let cupParent = document.getElementById(`cup-choice-${type.ID}`);
                      let sugarParent = document.getElementById(`sugar-choice-${type.ID}`);
  
                      let brewSelected = brewParent.querySelector('.selected');
                      let iceSelected = iceParent.querySelector('.selected');
                      let cupSelected = cupParent.querySelector('.selected');
                      let sugarSelected = sugarParent.querySelector('.selected');
  
                      let brewSelectedValue = brewSelected.innerText;
                      let cupSelectedValue = cupSelected.innerText;
                      let sugarSelectedValue = sugarSelected.innerText;
                      let productData = {
                          id: `${type.ID}`,
                          img: `${type.img}`,
                          name: `${type.name}`,
                          price: `${type.price}`,
                          temperature: brewSelectedValue,
                          cupSize: cupSelectedValue,
                          sugarLevel: sugarSelectedValue,
                          quantity: 1
                      };
                      if (brewSelectedValue === "HOT" && (brewSelectedValue || cupSelected || sugarSelected)) {
                          cart.push(productData);
                          localStorage.setItem('cart', JSON.stringify(cart));
                          alert(`Product "${type.name}" has been added to your cart.`);
                          updateCartDisplay();
  
                      }
                      else if (!brewSelected || !iceSelected || !cupSelected || !sugarSelected) {
                          alert('Please select something for all choices.');
                      } 
                      else {
                          let iceSelectedValue = iceSelected.innerText;
                          productData.iceLevel = iceSelectedValue;
                          
                          cart.push(productData);
                          localStorage.setItem('cart', JSON.stringify(cart));
                          
                          alert(`Product "${type.name}" has been added to your cart.`);
                      }
                  });
              });
          }        
      });
  })
  .catch(function() {
      console.log('An error occurred while trying to fetch the JSON file');
  });

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}