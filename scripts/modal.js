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
	if ((octo.profileAvailable) && (profileModal.getElementsByClassName('modal-header')[0].innerText != 'Here are your profile details')) {
		profileAvailable();
	}
},500);

let deleteProfileBtn = document.getElementById('delete-profile');
deleteProfileBtn.onclick = function() {
	octo.deleteProfile();
	location.reload();
}

// -------------- Heating Schedule -----------------
let itemCount = 0;
let addHSItem = document.getElementById('add-heating-schedule-item');
addHSItem.onclick = function() {
	// create new schedule item
	itemCount ++;
	let itemDiv = document.createElement('div');
	itemDiv.setAttribute('class','schedule-item');
	itemDiv.setAttribute('id','hsi' + itemCount);
	document.getElementById('heating-schedule-container').appendChild(itemDiv);
	
	let nameSpan = document.createElement('span');
	nameSpan.setAttribute('class','item-name');
	nameSpan.innerText = 'item ' + itemCount;
	itemDiv.appendChild(nameSpan);

	let timingDiv = document.createElement('div');
	timingDiv.setAttribute('class','timing-block');
	itemDiv.appendChild(timingDiv);

	let startSpan = document.createElement('span');
	startSpan.setAttribute('class','start-time');
	startSpan.innerText = 'start';
	timingDiv.appendChild(startSpan);

	timingDiv.appendChild(document.createTextNode('-'));

	let finishSpan = document.createElement('span');
	finishSpan.setAttribute('class','finish-time');
	finishSpan.innerText = 'finish';
	timingDiv.appendChild(finishSpan);

	let deleteSpan = document.createElement('span');
	deleteSpan.setAttribute('class','delete-item-btn');
	deleteSpan.innerHTML = '&#9747;';
	deleteSpan.setAttribute('parentId','hsi'+itemCount);
	deleteSpan.onclick = function(event) {
		document.getElementById(event.target.attributes.parentId.value).remove();
		itemCount --;
	}
	itemDiv.appendChild(deleteSpan);
}