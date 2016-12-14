Stripe.setPublishableKey('pk_test_yMF9rXgMiPf9MJaArKSHQLLt');

var $form  = $('#checkout-form');

$form.submit(function(event){

    $form.find('button').prop('disabled' , true);

    Stripe.card.createToken({
        number: $('#card-number').val(),
        name: $('#card-name').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        cvc: $('#csv').val()
    }, stripeResponsehandler );

    return false;
});


//executed after validating the data
function stripeResponsehandler(status , response) {
    if (response.error) { // Problem!
        console.log(response.error);
        // Show the errors on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;
        console.log("token: "+ token);

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();
  }
}


