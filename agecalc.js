function calcAge(birthDate, currentDate) {
	
	const bYear = birthDate.getFullYear()
	const bMonth = birthDate.getMonth()
	const bDate = birthDate.getDate()
	const bHour = birthDate.getHours()
	const bMinute = birthDate.getMinutes()
	const bSecond = birthDate.getSeconds()
	const bMillisecond = birthDate.getMilliseconds()
	
	const cYear = currentDate.getFullYear()
	const cMonth = currentDate.getMonth()
	const cDate = currentDate.getDate()
	const cHour = currentDate.getHours()
	const cMinute = currentDate.getMinutes()
	const cSecond = currentDate.getSeconds()
	const cMillisecond = currentDate.getMilliseconds()
	
	let ageInt = cYear - bYear
	
	// dont count if current month is less than birth date ignoring year
	if (cMonth < bMonth || cDate < bDate) ageInt--
	
	let lastBirthDate = new Date(bYear + ageInt, bMonth, bDate)
	let nextBirthDate = new Date(bYear + ageInt + 1, bMonth, bDate)
	
	let totalDaysBtwn = getDaysBetween(lastBirthDate, nextBirthDate)
	
	let daysSinceLastBD = getDaysBetween(lastBirthDate, currentDate)
	
	let preciseAge = ageInt + daysSinceLastBD / totalDaysBtwn;
	
	let preciseAgeMiniAdjust = (0.001 * (cMillisecond - bMillisecond) + 1.0 * (cSecond - bSecond) + 60.0 * (cMinute - bMinute) + 3600.0 * (cHour - bHour)) / (86400.0 * totalDaysBtwn)
	
	preciseAge += preciseAgeMiniAdjust
	
	return preciseAge
}

function isLeapYear(year) {
	if (year % 4 !== 0) return false;
	if (year % 100 !== 0) return true;
	if (year % 400 !== 0) return false;
	return true;
}
function countLeap(preDate, postDate) {
	const preYear = preDate.getFullYear()
	const postYear = postDate.getFullYear()
	
	let leapCount = 0
	
	if (isLeapYear(preYear) && preDate.getMonth() >= 2) leapCount-- // dont count if predate is march or later
	if (isLeapYear(postYear) && postDate.getMonth() <= 1 && postDate.getDate() <= 28) leapCount-- // dont count if postdate is february or earlier and date is at most 28
	
	
	for (let year = preYear; year <= postYear; year++) {
		if (isLeapYear(year)) {
			leapCount++
		}
	}
	
	return leapCount
}
function getDaysBetween(preDate, postDate) {
    // Ensure preDate is earlier than postDate
    if (preDate > postDate) {
        [preDate, postDate] = [postDate, preDate]; // Swap if dates are in wrong order
    }

    // Function to calculate the number of days for a given date
    function daysSinceEpoch(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        let days = 0;

        // Count the number of days in full years before the given year
        for (let currentYear = 1; currentYear < year; currentYear++) {
            days += isLeapYear(currentYear) ? 366 : 365;
        }

        // Add days for the months in the current year, considering leap years
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Common year month lengths
        for (let i = 0; i < month; i++) {
            // If the current year is a leap year and we have passed February, add an extra day for February
            days += monthDays[i];
            if (i === 1 && isLeapYear(year)) {  // Check if it's February in a leap year
                days += 1;
            }
        }

        // Add the days of the current month
        days += day - 1;

        return days;
    }

    // Get the number of days between the two dates
    const daysBetween = daysSinceEpoch(postDate) - daysSinceEpoch(preDate);

    return daysBetween;
}