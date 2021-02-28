// HELPER FUNCTIONS
// "2021-02-20T16:34:14.396Z"
//  012345678901234567890123

setTime = function(datetime,timeString) {
	// Returns Date object with the same date as datetime and the time set to timeString
	// timeString must be in format: 'HH:MM:SS:mm.xxx'

	let isoString = datetime.toISOString();
	return new Date( 
		isoString.slice(0,10) + 'T' + timeString + 'Z'
	 );
}

setDate = function(datetime,dateString) {
	// Returns Date object with the date set to dateString and same time as datetime
	// dateString must be in format: 'YYYY-MM-DD'

	let isoString = datetime.toISOString();
	return new Date( 
		dateString + isoString.slice(10)
	 );
}

setDay = function(datetime,dayNum) {
	// Sets day value of datetime to dayNum
	let isoString = datetime.toISOString();
	return new Date(
		isoString.slice(0,8) + ('0' + dayNum).slice(-2) + isoString.slice(10)
	)
}

dateXDaysFrom = function(datetime,X) {
	// get date X number of days from datetime
	// negative X will give days prior to datetime
	return new Date(
		datetime.getTime() + (X * 24 * 60 * 60 * 1000)
		);
}

isValidDateStr = function(dateStr) {
	// Accepts 01/01/1970 and 01-01-1970 both as valid date strings
	// Must be in form dd mm yyyy
	let dateRegex = /[0-3][0-9](-|\/)[0-1][0-9](-|\/)[0-9][0-9][0-9][0-9]/;
	console.log('Date: ' + dateStr + ' | Valid: ' + dateRegex.test(dateStr));
	return dateRegex.test(dateStr);
}

isValidTimeStr = function(timeStr) {
	let timeRegex = /[0-1]?[0-9]:[0-5][0-9] (am|pm)/i;
	console.log('Time: ' + timeStr + ' | Valid: ' + timeRegex.test(timeStr));
	return timeRegex.test(timeStr);
}

convertDateStr2ISODate = function(dateStr) {
	// Convert 01-01-1970 to 1970-01-01 (Y-m-d)
	if (isValidDateStr(dateStr)) {
		let dateParts;
		if (dateStr.includes('/')) {
			dateParts = dateStr.split('/');
		} else if (dateStr.includes('-')) {
			dateParts = dateStr.split('-');
		}
		return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
	}
}

convertTimeStr2Date = function(timeStr,dateStr) {
	if ((isValidTimeStr(timeStr)) && (isValidDateStr(dateStr)) ) {
		let isoDate = convertDateStr2ISODate(dateStr);
		let hrs = timeStr.split(':')[0];
		let mins = timeStr.split(':')[1].split(' ')[0];
		let apm = timeStr.split(':')[1].split(' ')[1];
		console.log(apm);
		if (apm.toLowerCase() == 'pm') {
			hrs = parseInt(hrs) + 12;
			if (hrs == 24) {
				hrs = 0;
			}
		}
		let isoTime = ('0' + hrs).slice(-2) + ':' + mins;
		console.log(isoTime);
		return new Date(isoDate + 'T' + isoTime + ':00.000Z')
	} else {
		return false
	}
}
