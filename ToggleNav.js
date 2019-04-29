isOpen = false;

function toggleNav(){
	if (!isOpen) {
		openNav();
	} else {
		closeNav();
	}
}

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";

	//document.getElementById("button").innerHTML = "&times;";
	document.getElementById("button").style.color = "#818181";
	isOpen = true;
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";

	document.getElementById("button").innerHTML = "&#9776;";
	document.getElementById("button").style.color = "black";
	isOpen = false;
}
