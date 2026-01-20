function convertBase(numberStr, fromBase, toBase) {
    let base10 = parseInt(numberStr, fromBase);
	if (isNaN(base10)) throw new Error('Invalid integer');
    return base10.toString(toBase);
}

const inputA = document.getElementById('inputA')
const inputB = document.getElementById('inputB')

const baseA = document.getElementById('baseA')
const baseB = document.getElementById('baseB')

const capitalizeCheckbox = document.getElementById('capitalizeCheckbox')

const inputUpdate = function(newValue, toInput, fromBase, toBase) {
	let gotValue = newValue.trim()
	
	try {
		let setValue = convertBase(gotValue, fromBase, toBase)
		if (capitalizeCheckbox.checked) { setValue = setValue.toUpperCase() }
		toInput.value = setValue
	}
	catch (error) {
		toInput.value = "ERR"
	}
};

inputA.addEventListener('input', function(event) { inputUpdate(inputA.value, inputB, parseInt(baseA.value), parseInt(baseB.value)) });
inputB.addEventListener('input', function(event) { inputUpdate(inputB.value, inputA, parseInt(baseB.value), parseInt(baseA.value)) });

//baseA.addEventListener('input', function(event) { inputUpdate(inputA.value, inputB, parseInt(baseA.value), parseInt(baseB.value)) });
//baseB.addEventListener('input', function(event) { inputUpdate(inputB.value, inputA, parseInt(baseB.value), parseInt(baseA.value)) });


baseB.addEventListener('input', function(event) { inputUpdate(inputA.value, inputB, parseInt(baseA.value), parseInt(baseB.value)) });
baseA.addEventListener('input', function(event) { inputUpdate(inputB.value, inputA, parseInt(baseB.value), parseInt(baseA.value)) });


capitalizeCheckbox.addEventListener('change', function(event) { inputUpdate(inputA.value, inputB, parseInt(baseA.value), parseInt(baseB.value)) });