(function() {
	var mr = document.createElement('script'); mr.type = 'text/javascript'; mr.async = true;
	mr.src = 'http://files.markerly.com/markerly-cdn.js#pub_id=ma-523a1a1ddab0e';
	var m = document.getElementsByTagName('script')[0]; m.parentNode.insertBefore(mr, m);
})();

var markerly_settings = {
	"services":"facebook,twitter,linkedin,googleplus",
	"image_services":"facebook,twitter",
	"service_color":"fe5a00",
	"container_restrict": "#main"
}

$(document).foundation();

$(function() {
	if($('.print').length > 0) {
		window.print();
	}
	$('.has-overlay').prepend('<img src="/images/project-overlay.png" class="overlay" />');

	$('#contactForm').on('click','.button',function(e) {
		console.log('Contact Form Button Clicked.');
		var error = false;
		var email = $('#yourEmail').val();
		if(email.length < 6) {
			error = true;
		}
		var name = $('#yourName').val();
		if(name.length < 3) {
			error = true;
		}
		var message = $('#yourMessage').val();
		if(message.length < 5) {
			error = true;
		}

		var data = {
			email: email,
			name: name,
			message: message
		};

		if(error === false) {
			$.ajax({
				type: "POST",
				url: '/emailer.php',
				data: data,
				dataType: 'json',
				success: function(data) {

					if(data.success === 'true') {
						$('.results').html('<p class="successMsg alert-box success radius">Message Sent!</p>');
					}
					else {
						$('.results').html('<p class="errorMsg alert-box alert radius">Error!<br />Something went wrong.</p>');
					}
				},
				error: function(xhr) {
					$('.results').html('<p class="errorMsg alert-box alert radius">Error!<br />' + xhr.responseText + '</p>');
				}
			});
		}
		else {
			$('.results').html('<p class="errorMsg alert-box alert radius">Error!<br />Please Complete All Fields</p>');
		}

		e.preventDefault();
	});
});