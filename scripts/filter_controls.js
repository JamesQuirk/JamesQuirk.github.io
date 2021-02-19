let options = {
	dateFormat: 'dd-mm-yy',
	changeMonth: true,
	changeYear: true,
	maxDate: 0
}; // COMMON OPTIONS

let dateFrom = new Date(octo.period.from).toLocaleDateString().replace('/','-').replace('/','-');
let dateTo = new Date(octo.period.to).toLocaleDateString().replace('/','-').replace('/','-');
$(function() {
	$('#date-from-input').datepicker($.extend(options,{
		defaultDate: dateFrom
	}));
	$('#date-from-input').datepicker('setDate',dateFrom);
});

$(function() {
	$('#date-to-input').datepicker($.extend(options,{
		defaultDate: dateTo
	}));
	$('#date-to-input').datepicker('setDate',dateTo);
});

let openBtn = document.getElementById('open-filters-btn');
let filters = document.getElementsByClassName('filters')[0];
let filterControls = document.getElementsByClassName('filter-controls')[0];

openBtn.onclick = function(event) {
	if ((!filterControls.style.display) || (filterControls.style.display == "none")) {
		filters.style.height = "12em";
		filterControls.style.opacity = "1";
		setTimeout(function() {filterControls.style.display = "block";},250)
		openBtn.innerHTML = "Filters &#8673;"
	} else {
		filterControls.style.opacity = "0";
		filterControls.style.display = "none";
		filters.style.height = "2em";
		openBtn.innerHTML = "Filters &#8675;"
	}
}

// ON INPUT CHANGE
let dateFromInput = document.getElementById('date-from-input');
let dateToInput = document.getElementById('date-to-input');

processInput = function(event,dateMode) {
	let picker = $('#date-' + dateMode + '-input')
	let inVal = picker.val();
	if ((/^\d{2}-\d{2}-\d{4}$/.test(inVal)) || (/^\d{2}-\d{2}-\d{2}$/.test(inVal))) {
		// potentially valid input
		if (/^\d{2}-\d{2}-\d{2}$/.test(inVal)) {
			// inferred as year last - prepend year with '20'
			inVal = inVal.slice(0,6) + '20' + inVal.slice(6);
		}
		picker.datepicker('setDate',inVal);

		let dateParts = inVal.split('-');
		let dateString = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
		let options = {}
		options['date' + dateMode] = new Date(dateString).toISOString();
		octo.filterData(options);
		picker.blur();
		
	} else {
		// invalid
		document.getElementsByClassName('date-' + dateMode + '-label')[0].getElementsByTagName('span')[0].style.color = 'red';
	}
};

dateFromInput.onchange = function(event) {
	processInput(event,'from')
};

dateToInput.onchange = function(event) {
	processInput(event,'to')
};