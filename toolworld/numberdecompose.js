function getPrimeFactors(n) {
    let factors = [];
	
	let d = 2;
	
	while (n >= 2) {
		if (n % d == 0) {
			n /= d;
			factors.push(d)
		}
		else {
			d++;
		}
	}
	
	return factors;
}
function factorArrayToUniqueFactorArray(fa) {
	let uniqueFactors = [];
	let endIndex = -1;
	
	for (let i = 0; i < fa.length; i++) {
		let f = fa[i];
		if (endIndex == -1 || f != uniqueFactors[endIndex].base) {
			uniqueFactors.push({base:f, exponent:1});
			endIndex++;
		}
		else {
			uniqueFactors[endIndex].exponent++;
		}
	}
	
	return uniqueFactors;
}
function uniqueFactorArrayString(ufa) {
	let outString = '';
	for (let i = 0; i < ufa.length; i++) {
		let uf = ufa[i];
		let s = `${uf.base}`;
		if (uf.exponent > 1) s += `<sup>${uf.exponent}</sup>`;
		if (i == 0)	outString += s;
		else outString += ' * ' + s;
	}
	return outString;
}
function generateDivisorsFromUniqueFactorArray(ufa) {
	// start with a list containing only 1
    let divisors = [1];

    // for each prime and its exponent,
    for (let { base, exponent } of ufa) {
        const newDivisors = [];

        // multiply existing divisors by powers of the current prime
        for (let d of divisors) {
            let value = 1;
            for (let e = 1; e <= exponent; e++) {
                value *= base; // base^e
                newDivisors.push(d * value); // multiply by existing divisor
            }
        }

        // then add newly generated divisors to the list
        divisors = divisors.concat(newDivisors);
    }

    divisors.sort((a, b) => a - b);

    return divisors;
}

const numberInputField = document.getElementById('inputNumber');

const largeNumWarnDiv = document.getElementById('largeNumWarnDiv');

const primeDiv = document.getElementById('primeDiv');

const compositeDiv = document.getElementById('compositeDiv');
const primeFactorSpan = document.getElementById('primeFactorSpan');
const divisorSpan = document.getElementById('divisorSpan');

function displayOutput(state, uniquePrimeFactorList, divisorList) {
	largeNumWarnDiv.style.display = 'none';
	
	let uniquePrimeFactorListLength = uniquePrimeFactorList.length;
	
	switch (state) {
		case 2: { // COMPOSITE
			primeDiv.style.display = 'none';
			compositeDiv.style.display = 'block';
			
			primeFactorSpan.innerHTML = uniqueFactorArrayString(uniquePrimeFactorList);
			
			let divisorString = '';
			for (let i = 0; i < divisorList.length; i++) {
				let divisor = divisorList[i];
				if (i == 0) divisorString += `${divisor}`;
				else divisorString += `, ${divisor}`;
			}
			divisorSpan.innerHTML = divisorString;
		}
		break;
		case 1: { // PRIME
			primeDiv.style.display = 'block';
			compositeDiv.style.display = 'none';
		}
		break;
		default: { // invalid input
			primeDiv.style.display = 'none';
			compositeDiv.style.display = 'none';
		}
		break;

	}
}

function doCalculation() {
	try {
		let inputNumber = parseInt(numberInputField.value);
		
		let primeFactors = getPrimeFactors(inputNumber);
		
		let uniquePrimeFactorListLength = factorArrayToUniqueFactorArray(primeFactors);
		
		let divisorList = generateDivisorsFromUniqueFactorArray(uniquePrimeFactorListLength);
		
		displayOutput(inputNumber >= 2 ? (primeFactors.length > 1 ? 2 : 1) : 0, uniquePrimeFactorListLength, divisorList);
	}
	catch {
		displayOutput(0, [], []);
	}
}

numberInputField.addEventListener('input', function(event) {
	try {
		let inputNumber = parseInt(numberInputField.value);
	
		if (inputNumber > 268435456) { // auto calculation limit
			displayOutput(0, [], []);
			largeNumWarnDiv.style.display = 'block';
		}
		else {
			doCalculation();
		}
	}
	catch {
		displayOutput(0, [], []);
	}
});
