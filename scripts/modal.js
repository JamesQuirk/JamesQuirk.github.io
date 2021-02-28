// Get the modal
let profileModal = document.getElementById("profile-modal");

// Get the button that opens the modal
let openProfileBtn = document.getElementById("add-profile-btn");

// Get the <span> element that closes the modal
let closeSpan = document.getElementById("modal-close");

// Get modal done button
let done = document.getElementById('modal-done');

// When the user clicks on the button, open the modal 
openProfileBtn.onclick = function() {
	profileModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
	octo.updateCharts();
	profileModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == profileModal) {
		octo.updateCharts();
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

	let hsItemIDs = Object.keys(octo.schedule);
	for (let i=0;i<hsItemIDs.length;i++) {
		createHSItem(octo.schedule[hsItemIDs[i]]);
	}
};

let deleteProfileBtn = document.getElementById('delete-profile');
deleteProfileBtn.onclick = function() {
	octo.deleteProfile();
	location.reload();
}

// -------------- Heating Schedule -----------------
let addHSItem = document.getElementById('add-heating-schedule-item');
addHSItem.onclick = function() {
	// Create new item
	createHSItem(null);
}

createHSItem = function(details) {
	let itemID;
	if (details) {
		itemID = details.id;
	} else {
		itemID = 'hsi' + Math.floor(1000 + Math.random() * 9000);
	}
	let itemDiv = document.createElement('div');
	itemDiv.setAttribute('class','schedule-item');
	itemDiv.setAttribute('id',itemID);
	document.getElementById('heating-schedule-container').appendChild(itemDiv);
	
	let nameSpan = document.createElement('span');
	nameSpan.setAttribute('id',itemID + '-name-span');
	nameSpan.setAttribute('class','item-name editable');
	if (details) {
		nameSpan.innerText = details.name;
	} else {
		nameSpan.innerText = 'Item Name';
	}
	nameSpan.onclick = function(event) {
		event.target.style.display = 'none';
		event.target.nextElementSibling.style.display = 'inline-block';
	}
	itemDiv.appendChild(nameSpan);

	let nameInput = document.createElement('input');
	nameInput.setAttribute('id',itemID + '-name-input');
	nameInput.setAttribute('type','text');
	nameInput.setAttribute('placeholder','Item Name');
	if ((details) && (details.name != 'Item Name')) {
		nameInput.value = details.name;
	}
	nameInput.onfocusout = function(event) {
		if (event.target.value.length > 0) {
			document.getElementById(itemID + '-name-span').innerText = event.target.value;	
			octo.schedule[itemID].name = event.target.value;
			localStorage.schedule = JSON.stringify(octo.schedule);
		}
		event.target.style.display = 'none';
		document.getElementById(itemID + '-name-span').style.display = 'inline-block';
	};
	itemDiv.appendChild(nameInput);

	let timingDiv = document.createElement('div');
	timingDiv.setAttribute('class','timing-block');
	itemDiv.appendChild(timingDiv);

	let startSpan = document.createElement('span');
	startSpan.setAttribute('id',itemID + '-start-span');
	startSpan.setAttribute('class','schedule-time start-time editable');
	if (details) {
		startSpan.innerText = details.start;
	} else {
		startSpan.innerText = 'start';
	}
	startSpan.onclick = function(event) {
		// console.log(event);
		event.target.style.display = 'none';
		event.target.nextElementSibling.style.display = 'inline-block';
	};
	timingDiv.appendChild(startSpan);

	let startInput = document.createElement('input');
	startInput.setAttribute('id',itemID + '-start-input');
	startInput.setAttribute('class','time-picker start-time');
	startInput.setAttribute('type','text');
	startInput.setAttribute('placeholder','Start Time');
	if ((details) && (details.start != 'start')) {
		startInput.value = details.start;
	}
	startInput.onfocusout = function(event) {
		if (event.target.value.length > 0) {
			document.getElementById(itemID + '-start-span').innerText = event.target.value;	
			octo.schedule[itemID].start = event.target.value;
			localStorage.schedule = JSON.stringify(octo.schedule);
		}
		event.target.style.display = 'none';
		document.getElementById(itemID + '-start-span').style.display = 'inline-block';
	};
	timingDiv.appendChild(startInput);
	$('#' + itemID + '-start-input').timepicker({
		timeFormat: 'h:mm p',
		interval: 30,
		dynamic: false,
		dropdown: false,
		scrollbar: true,
		zindex: 10
	});

	timingDiv.appendChild(document.createTextNode('-'));

	let finishSpan = document.createElement('span');
	finishSpan.setAttribute('id',itemID + '-finish-span');
	finishSpan.setAttribute('class','schedule-time finish-time editable');
	if (details) {
		finishSpan.innerText = details.finish;
	} else {
		finishSpan.innerText = 'finish';
	}
	finishSpan.onclick = function(event) {
		// console.log(event);
		event.target.style.display = 'none';
		event.target.nextElementSibling.style.display = 'inline-block';
	};
	timingDiv.appendChild(finishSpan);

	let finishInput = document.createElement('input');
	finishInput.setAttribute('id',itemID + '-finish-input');
	finishInput.setAttribute('class','time-picker finish-time');
	finishInput.setAttribute('type','text');
	finishInput.setAttribute('placeholder','Finish Time');
	if ((details) && (details.finish != 'finish')) {
		finishInput.value = details.finish;
	}
	finishInput.onfocusout = function(event) {
		if (event.target.value.length > 0) {
			document.getElementById(itemID + '-finish-span').innerText = event.target.value;	
			octo.schedule[itemID].finish = event.target.value;
			localStorage.schedule = JSON.stringify(octo.schedule);
		}
		event.target.style.display = 'none';
		document.getElementById(itemID + '-finish-span').style.display = 'inline-block';
	};
	timingDiv.appendChild(finishInput);
	$('#' + itemID + '-finish-input').timepicker({
		timeFormat: 'h:mm p',
		interval: 30,
		dynamic: false,
		dropdown: false,
		scrollbar: true,
		zindex: 10
	});

	let deleteSpan = document.createElement('span');
	deleteSpan.setAttribute('class','delete-item-btn');
	deleteSpan.innerHTML = '&#9747;';
	deleteSpan.setAttribute('parentId',itemID);
	deleteSpan.onclick = function(event) {
		delete octo.schedule[itemID];
		localStorage.schedule = JSON.stringify(octo.schedule);
		document.getElementById(event.target.attributes.parentId.value).remove();
	}
	itemDiv.appendChild(deleteSpan);

	if (!details) {
		// Add item to schedule object
		octo.schedule[itemID] = {
			'id': itemID,
			'name': nameSpan.innerText,
			'start': startSpan.innerText,
			'finish': finishSpan.innerText
		}
		localStorage.schedule = JSON.stringify(octo.schedule);
	}
}



if (octo.profileAvailable) {
	profileAvailable();
}

setInterval(function () {
	if ((octo.profileAvailable) && (profileModal.getElementsByClassName('modal-header')[0].innerText != 'Here are your profile details')) {
		profileAvailable();
	}
},500);