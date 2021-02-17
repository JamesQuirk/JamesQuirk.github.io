// Get the modal
let profileModal = document.getElementById("profile-modal");

// Get the button that opens the modal
let openProfileBtn = document.getElementById("add-profile-btn");

// Get the <span> element that closes the modal
let closeSpan = document.getElementsByClassName("close")[0];

// Get modal done button
let done = document.getElementById('modal-done');

// When the user clicks on the button, open the modal 
openProfileBtn.onclick = function() {
	profileModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
	profileModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == profileModal) {
		profileModal.style.display = "none";
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
			profileModal.style.display = 'none';
			profileAvailable();
		} else {
			console.log('NO INFO');
		}
	}
};

let addProfileContent = document.getElementById('add-profile-content');
let showProfileContent = document.getElementById('show-profile-content');

profileAvailable = function() {
	// Transform open profile button
	openProfileBtn.style.width = '2.5em';
	openProfileBtn.style.borderRadius = '2.5em';
	openProfileBtn.innerHTML = '<i class="material-icons">&#xe7fd;</i>';

	// Edit modal contents
	profileModal.getElementsByClassName('modal-header')[0].innerText = 'Here are your profile details'
	addProfileContent.style.display = 'none';
	showProfileContent.style.display = 'block';

	document.getElementById('mpan-span').innerText = octo.mpan;
	document.getElementById('serial-span').innerText = octo.serial;
	document.getElementById('apikey-span').innerText = octo.apiKey;
};

if (octo.profileAvailable) {
	profileAvailable();
}

setInterval(function () {
	if (octo.profileAvailable) {
		profileAvailable();
	}
},500);

let deleteProfileBtn = document.getElementById('delete-profile');
deleteProfileBtn.onclick = function() {
	octo.deleteProfile();
	location.reload();
}