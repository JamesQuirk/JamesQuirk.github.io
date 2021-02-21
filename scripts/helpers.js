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
