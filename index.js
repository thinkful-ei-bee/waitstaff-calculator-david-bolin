'use strict';

const store = {
  meals: 0,
  tips: 0,
  price: 0,
  tax: 0,
  percentage: 0
};

function clearStore() {
  Object.keys(store).forEach(function(key){
    store[key] = 0;
  });
}

function render() {
  const { meals, tips, price, tax, percentage } = store;
  const subtotal = price * (1 + tax); 
  $('.js-subtotal').html(subtotal.toFixed(2));
  $('.js-tip').html((subtotal * percentage).toFixed(2));
  $('.js-total').html((subtotal * (1 + percentage)).toFixed(2));
  $('.js-tip-total').html(tips.toFixed(2));
  $('.js-meal-count').html(meals);
  if (meals !== 0) {
    $('.js-average-tip').html((tips / meals).toFixed(2));
  } else {
    $('.js-average-tip').html('0.00');
  }
  $('.meal-details-form input[name="price"]').val('');
  $('.meal-details-form input[name="tax"]').val('');
  $('.meal-details-form input[name="tip"]').val('');
}

function handleInput() {
  $('.meal-details-form').submit(function(event) {
    event.preventDefault();
    const price = $('.meal-details-form input[name="price"]').val();
    const tax = $('.meal-details-form input[name="tax"]').val();
    const tip = $('.meal-details-form input[name="tip"]').val();
    if ((price === '' || tax === '' || tip === '') ||
      (isNaN(price) || isNaN(tax) || isNaN(tip))) {
      render();
      return;
    }
    store.price = price;
    store.tax = tax / 100;
    store.percentage = tip / 100;
    store.meals += 1;
    store.tips += price * (1 + store.tax) * (tip / 100);
    render();
  });
}

function handleReset() {
  $('.reset-button').click(function() {
    clearStore();
    render();
  });
}


function main() {
  handleInput();
  handleReset();
  render();
}

$(main);