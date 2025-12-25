<?php
// notify.php - PayFast ITN handler

$pfData = $_POST;

// 1️⃣ Ensure POST contains signature
if (!isset($pfData['signature'])) {
    http_response_code(400);
    exit("Missing signature");
}

// 2️⃣ Build string to calculate signature
$pfOutput = '';
foreach ($pfData as $key => $val) {
    if ($key === 'signature') continue; // skip signature itself
    $pfOutput .= $key . '=' . urlencode($val) . '&';
}
$pfOutput = rtrim($pfOutput, '&');

// 3️⃣ Your PayFast passphrase (must match dashboard exactly)
$passphrase = 'Icims0t1r3cl';

// 4️⃣ Calculate and verify signature
$calculatedSignature = md5($pfOutput . $passphrase);

if ($pfData['signature'] !== $calculatedSignature) {
    http_response_code(400);
    error_log("PayFast signature mismatch");
    exit("Invalid signature");
}

// 5️⃣ Process payment
if (isset($pfData['payment_status']) && $pfData['payment_status'] === 'COMPLETE') {

    $to = "wrldwide.development@gmail.com";
    $subject = "Payment Received (PayFast)";

    $message  = "Payment received:\n\n";
    $message .= "Item: " . $pfData['item_name'] . "\n";
    $message .= "Amount: " . $pfData['amount_gross'] . "\n";
    $message .= "Email: " . $pfData['email_address'] . "\n";
    $message .= "Transaction ID: " . $pfData['pf_payment_id'] . "\n";

    $headers = "From: no-reply@wrldwide.co.za";

    mail($to, $subject, $message, $headers);

} else {
    // Optional: handle failed or pending payments
    $to = "wrldwide.development@gmail.com";
    $subject = "Payment Not Complete (PayFast)";

    $message  = "Payment not complete:\n\n";
    $message .= "Item: " . $pfData['item_name'] . "\n";
    $message .= "Amount: " . $pfData['amount_gross'] . "\n";
    $message .= "Email: " . $pfData['email_address'] . "\n";
    $message .= "Transaction ID: " . $pfData['pf_payment_id'] . "\n";

    $headers = "From: no-reply@wrldwide.co.za";

    mail($to, $subject, $message, $headers);
}

// 6️⃣ Respond 200 OK so PayFast knows the notification was received
http_response_code(200);
echo "OK";
?>

