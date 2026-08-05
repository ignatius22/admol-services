<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

function clean_field(string $value): string
{
    return trim(str_replace(["\r", "\0"], '', $value));
}

$honeypot = clean_field((string) ($_POST['company_website'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Thank you. Your enquiry has been received.']);
    exit;
}

$name = clean_field((string) ($_POST['name'] ?? 'Website visitor'));
$email = clean_field((string) ($_POST['email'] ?? ''));
$service = clean_field((string) ($_POST['service'] ?? 'General enquiry'));
$message = clean_field((string) ($_POST['message'] ?? ''));
$source = clean_field((string) ($_POST['form_source'] ?? 'Website'));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

$messageLength = function_exists('mb_strlen') ? mb_strlen($message) : strlen($message);
if ($messageLength < 10 || $messageLength > 5000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide project details between 10 and 5,000 characters.']);
    exit;
}

$recipient = 'info@admolservices.com';
$subject = 'Website enquiry: ' . preg_replace('/[^a-zA-Z0-9 &()\-]/', '', $service);
$body = implode("\n", [
    'New enquiry from admolservices.com',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Service: ' . $service,
    'Source: ' . $source,
    '',
    'Message:',
    $message,
]);

$headers = [
    'From: Admoltech Website <no-reply@admolservices.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'Email delivery is temporarily unavailable.']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you. Your enquiry has been sent and our team will respond shortly.',
]);
