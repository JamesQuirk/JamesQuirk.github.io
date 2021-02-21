let datepickerOptions = {
	dateFormat: 'dd-mm-yy',
	changeMonth: true,
	changeYear: true,
	maxDate: 0
}; // COMMON OPTIONS

let dateFrom = new Date(octo.period.from);
let dateTo = new Date(octo.period.to);

$('#date-from-input').datepicker($.extend(datepickerOptions,{
	defaultDate: dateFrom.toLocaleDateString().replace('/','-').replace('/','-')
}));

$('#date-to-input').datepicker($.extend(datepickerOptions,{
	defaultDate: dateTo.toLocaleDateString().replace('/','-').replace('/','-')
}));

$.updateDatePickers = function(from,to) {
	console.log('UPDATING DATEPICKER DATES');
	console.log('PICKER FROM: '+from.toLocaleDateString().replace('/','-').replace('/','-'));
	console.log('PICKER TO: '+to.toLocaleDateString().replace('/','-').replace('/','-'));
	$('#date-from-input').datepicker('setDate',from.toLocaleDateString().replace('/','-').replace('/','-'));
	$('#date-to-input').datepicker('setDate',to.toLocaleDateString().replace('/','-').replace('/','-'));
};

$.updateDatePickers(dateFrom,dateTo);

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

let filterOptions = {};

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
		filterOptions['date' + dateMode] = new Date(dateString).toISOString();
		octo.filterData(filterOptions);
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

let last7DaysBtn = document.getElementById('last-7-days');
last7DaysBtn.onclick = function(event) {
	let today = new Date();
	filterOptions = {
		datefrom: setTime(dateXDaysFrom(today,-7),'00:00:00.000'),
		dateto: new Date()
	}
	octo.filterData(filterOptions);
	$.updateDatePickers(filterOptions.datefrom,filterOptions.dateto);
};

let last24HrsBtn = document.getElementById('last-24-hrs');
last24HrsBtn.onclick = function(event) {
	let today = new Date();
	filterOptions = {
		datefrom: setTime(dateXDaysFrom(today,-1),'00:00:00.000'),
		dateto: new Date()
	}
	octo.filterData(filterOptions);
	$.updateDatePickers(filterOptions.datefrom,filterOptions.dateto);
};

let thisMonthBtn = document.getElementById('this-month');
thisMonthBtn.onclick = function() {
	let today = new Date();
	filterOptions = {
		datefrom: setTime(setDay(today,1),'00:00:00.000'),
		dateto: today
	};
	octo.filterData(filterOptions);
	$.updateDatePickers(filterOptions.datefrom,filterOptions.dateto);
};

let resetFiltersBtn = document.getElementById('reset-filters');
resetFiltersBtn.onclick = function(event) {
	console.log('RESETTING FILTERS')
	octo.resetPage();
	$.updateDatePickers(dateFrom,dateTo);
}