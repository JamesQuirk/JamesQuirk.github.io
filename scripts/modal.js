// Get the modal
let modal = document.getElementById("apikey-modal");

// Get the button that opens the modal
let btn = document.getElementById("open-modal-btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Get modal done button
let done = document.getElementById('modal-done');

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Clicking "done"
done.onclick = function(event) {

	if (event.target == done) {
		let mpan = document.getElementById('mpan-input-field').value;
		let serial = document.getElementById('serial-input-field').value;
		let apiKey = document.getElementById('apikey-input-field').value;
		let remember = document.getElementById('remember').checked;

		if ((mpan != '') && (serial != '') && (apiKey != '') ) {
			octo.updateCredentials({
				mpan: mpan,
				serial: serial,
				apiKey: apiKey,
				remember: remember
			});
			modal.style.display = 'none';
			octo.refreshPage();
		} else {
			console.log('NO INFO');
		}
	}
}