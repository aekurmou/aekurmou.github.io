function round(x, d) {
	return Math.round(d * x) / d;
}

calcRPSfloat = parseFloat(document.getElementById("calc-rps").innerHTML);
calcDMGfloat = parseFloat(document.getElementById("calc-dmg").innerHTML);

calcRPMfloat = calcRPSfloat * 60;
calcDPSfloat = calcDMGfloat * calcRPSfloat;
calcTTKfloat = round((Math.ceil(100 / calcDMGfloat) - 1) / calcRPSfloat, 1000);

document.getElementById("calc-rpm").innerHTML = calcRPMfloat;

document.getElementById("calc-dps").innerHTML = round(calcDPSfloat, 100);

document.getElementById("calc-ttk").innerHTML = round(calcTTKfloat, 1000);

calcHeadMult = parseFloat(document.getElementById("calc-dmg-head-mult").innerHTML);
calcArmMult = parseFloat(document.getElementById("calc-dmg-arm-mult").innerHTML);
calcLegMult = parseFloat(document.getElementById("calc-dmg-leg-mult").innerHTML);

document.getElementById("calc-dmg-head").innerHTML += round(calcDMGfloat * calcHeadMult, 100) + " <span class=\"unit\">hp/round</span><br>" + round(calcDPSfloat * calcHeadMult, 100) + " <span class=\"unit\">hp/sec</span>";
document.getElementById("calc-dmg-arm").innerHTML += round(calcDMGfloat * calcArmMult, 100) + " <span class=\"unit\">hp/round</span><br>" + round(calcDPSfloat * calcArmMult, 100) + " <span class=\"unit\">hp/sec</span>";
document.getElementById("calc-dmg-leg").innerHTML += round(calcDMGfloat * calcLegMult, 100) + " <span class=\"unit\">hp/round</span><br>" + round(calcDPSfloat * calcLegMult, 100) + " <span class=\"unit\">hp/sec</span>";