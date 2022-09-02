let showProduct = $('#product-switcher').val();

function getCookie(name) {
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
}

function validatePostcode(zip) {
  const postcodeRegEx = /[A-Z]{1,2}[A-Z0-9]{1,2} ?[0-9][A-Z]{2}/i;
  return postcodeRegEx.test(zip);
}

$('form.add-to-cart-form').submit(function (e) {
  e.preventDefault();

  // remove all errors
  $('.product-container').attr('class', 'product-container');
  const zip = $(this).find('.zip').val().replace(/\s+/g, '').toUpperCase();
  if (!validatePostcode(zip) || zip == '') {
    $('.product-container').addClass('zip-error');
    // alert('invalid postcode');
    return false;
  }

  var mon = $(this).find('.mon').is(":checked");
  var tue = $(this).find('.tue').is(":checked");
  var wed = $(this).find('.wed').is(":checked");
  var thu = $(this).find('.thu').is(":checked");
  var fri = $(this).find('.fri').is(":checked");
  var sat = $(this).find('.sat').is(":checked");
  var sun = $(this).find('.sun').is(":checked");

  if ($(this).find('.mon').length) {
    if (!mon && !tue && !wed && !thu && !fri && !sat && !sun) {
      $('.product-container').addClass('day-error');
      // alert('please choose at least one day for collection');
      return false;
    }
  }

  let qty = 0;
  qty = $(this).find('.qty').val();

  var data = {
    action: 'commerce/cart/update-cart',
    shippingAddress: {},
    options: {},
    qty: qty
  }

  var purchasable = $(this).find('.js-purchasableId').val();

  data.purchasableId = purchasable;

  if ($(this).find('.startDate').length) {
    var startDate = $(this).find('.startDate').val();
    if (!startDate) {
      $('.product-container').addClass('start-error');
      // alert('choose start');
      return false;
    }
    let date = $(this).find('.startDate')[0];
    date.setAttribute('value', $('.startDate').val());
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.setHours(0, 0, 0, 0);
    var setDate = new Date(date.getAttribute('value'));
    setDate = setDate.setHours(0, 0, 0, 0);
    if (setDate < tomorrow) {
      $('.product-container').addClass('past-error');
      // alert('start in future');
      return false;
    } else {
      data.options.startDate = startDate;
    }
  }

  var collectionTime = $(this).find('.collectionTime').val();

  data.options.collectionTime = collectionTime;

  if (mon) {
    data.options.monday = 'true';
  }

  if (tue) {
    data.options.tuesday = 'true';
  }

  if (wed) {
    data.options.wednesday = 'true';
  }

  if (thu) {
    data.options.thursday = 'true';
  }

  if (fri) {
    data.options.friday = 'true';
  }

  if (sat) {
    data.options.saturday = 'true';
  }

  if (sun) {
    data.options.sunday = 'true';
  }

  data.shippingAddress.zipCode = zip;


  const addressId = $('.add-to-cart-form').find('input[name="shippingAddress[id]"]').val();
  data.shippingAddressId = addressId;

  const businessName = $('.add-to-cart-form').find('input[name="shippingAddress[businessName]"]').val();
  data.shippingAddress.businessName = businessName;

  const custom1 = $('.add-to-cart-form').find('input[name="shippingAddress[custom1]"]').val();
  data.shippingAddress.custom1 = custom1;

  const address1 = $('.add-to-cart-form').find('input[name="shippingAddress[address1]"]').val();
  data.shippingAddress.address1 = address1;

  const address2 = $('.add-to-cart-form').find('input[name="shippingAddress[address2]"]').val();
  data.shippingAddress.address2 = address2;

  const city = $('.add-to-cart-form').find('input[name="shippingAddress[city]"]').val();
  data.shippingAddress.city = city;

  const countryId = $('.add-to-cart-form').find('input[name="shippingAddress[countryId]"]').val();
  data.shippingAddress.countryId = countryId;

  const notes = $('.add-to-cart-form').find('input[name="shippingAddress[notes]"]').val();
  data.shippingAddress.notes = notes;

  const fullName = $('.add-to-cart-form').find('input[name="shippingAddress[fullName]"]').val();
  data.shippingAddress.fullName = fullName;

  const phone = $('.add-to-cart-form').find('input[name="shippingAddress[phone]"]').val();
  data.shippingAddress.phone = phone;

  let newCookie = getCookie('gclid');
  if (newCookie) {
    data.options.gclid = newCookie;
  }

  let title = $('.product-container .single-product[data-id="' + showProduct + '"]').attr('data-title');
  let size;
  let cat;
  if ($('#product-switcher').prop("tagName") == 'SELECT') {
    size = $('#product-switcher option:selected').text();
    cat = $('#product-switcher option:selected').attr('data-category');
  } else {
    cat = $('#product-switcher').attr('data-category');
    size = $('#product-switcher').attr('data-title');
  }

  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'addToCart',
    'ecommerce': {
      'currencyCode': 'GBP',
      'add': {
        'products': [{
          'name': title + ' ' + size,
          'id': showProduct,
          'quantity': data.qty,
          'category': cat,
          'brand': 'First Mile',
          'quantity': qty
        }]
      }
    }
  });


  $.ajax({
    type: "POST",
    dataType: 'json',
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    url: '',
    data: data,
    success: function (data) {
      // alert('added to cart!');
      window.location.href = '/shop/cart';
    },
    error: function (e) {
      console.log(e.responseJSON.error);
    }
  });
});

$('.changeZip').click(function (e) {
  e.preventDefault();
  $(this).parent().addClass('show-zip-input');
  // $('.zip').css('display', 'block');
});

$('.product-container .single-product:not([data-id="' + showProduct + '"]').css('display', 'none');

$('#product-switcher').change(function (event) {
  // Remove errors
  $('.product-container').attr('class', 'product-container');
  showProduct = $(this).val();
  // console.log(showProduct);
  $('.single-product').css('display', 'block');
  $('.product-container .single-product:not([data-id="' + showProduct + '"]').css('display', 'none');

  let title = $('.product-container .single-product[data-id="' + showProduct + '"]').attr('data-title');
  let size = $('#product-switcher option:selected').text();
  let cat = $('#product-switcher option:selected').attr('data-category');


  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'productDetail',
    'ecommerce': {
      'currencyCode': 'GBP',
      'detail': {
        'products': [{
          'name': title + ' ' + size,
          'id': showProduct,
          'category': cat,
          'brand': 'First Mile',
        }]
      }
    }
  });
});