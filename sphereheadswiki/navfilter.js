navBtnArray = []

function navFilterInit() {
	const nav = document.getElementById("nav")
	const btns = nav.querySelectorAll("button")
	navBtnArray = Array.from(btns)
	console.log(navBtnArray)
}

function navFilter(filter) {
	filter = filter.toLowerCase()
	for (let i = 0; i < navBtnArray.length; i++) {
		let btn = navBtnArray[i]
		let btnText = btn.innerHTML.toLowerCase()
		let included = btnText.includes(filter)
		
		btn.style.display = included ? "block" : "none"
	}
}

navFilterInit()