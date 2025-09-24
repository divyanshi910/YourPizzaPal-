import productOperation from "./services/product-operations.js"; // adjust path if needed

// USD → INR conversion rate
const usdToInrRate = 83; // change this to current rate if needed

// Calculate total amount in INR dynamically from cart
const totalAmountInUSD = productOperation.getCartTotal();  // total in USD
const totalAmountInINR = totalAmountInUSD * usdToInrRate;
const amountInPaise = Math.round(totalAmountInINR * 100).toString(); // Razorpay needs paise

var options = {
    "key": "rzp_test_R7CjLn6UKO34Vy",
    "amount": amountInPaise,  // dynamically set amount
    "currency": "INR",
    "name": "Pizza Shop",
    "description": "Pizza Shop Transaction",
    "image": "https://example.com/your_logo",
    
    "handler": function (response){
        alert("Payment Done");
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
    },
    "prefill": {
        "name": "Customer Name",
        "email": "customername@example.com", 
        "contact": "CustomerPhone"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

var rzp1 = new Razorpay(options);

rzp1.on('payment.failed', function (response){
    alert("Payment Fail");
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});

document.getElementById('rzp-button1').addEventListener('click', function(e){
    rzp1.open();
    e.preventDefault();
});


