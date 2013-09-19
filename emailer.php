<?php
/*****************************
*
*	filename: emailer.php
*	author: Ken Howard <ken@simplicatedweb.com>
*	created on: August 25th, 2013
*
******************************/

function errorMsg($id) {
	$msg = '';
	switch($id) {
		case 1:
			$msg = 'No Input Data Found.';
			break;
		case 2:
			$msg = 'Missing Required Field.';
			break;
        case 3:
            $msg = 'Could Not Send Mail.';
            break;
	}

	return $msg;
}

// Setup input variable
$input = array();
$error = false; // 1 = no input data; 2 = missing input data;
$response = array();

if(isset($_GET) && count($_GET) > 0) {
	$input = $_GET;
}
elseif(isset($_POST) && count($_POST) > 0) {
	$input = $_POST;
}
else {
	$error = 1;
}

$name = $input['name'];
$email = $input['email'];
$message = wordwrap("From: $name <$email>" . "\r\n\r\n" . $input['message'], 70, "\r\n");
$headers = 'From: ken@simplicatedweb.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


if (!$error && mail('ken@simplicatedweb.com','RE: Web Design Services',$message,$headers)) {
	$response = array('success' => 'true');
}
else {
    $error = 3;
	$response = array('error' => errorMsg($error));
}

header('Content-Type: application/json');
echo json_encode($response);

?>