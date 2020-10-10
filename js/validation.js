function valid() {
    return validateSurname();
}

function validateSurname() {
    var allAlpha = true;
    var elem = document.getElementById("fname");
    var elem2 = document.getElementById("lname");



    var inputValue = elem.value.trim();
    var inputValue2 = elem2.value.trim();
    inputValue = inputValue.toUpperCase();


    if (inputValue <= 0 || inputValue2 <= 0) {
        allAlpha = false;
    }


    if (!allAlpha) {
        alert("Name : Please enter a meaningful name with all alphabet letters.");
        elem.focus();
        return false;
    }
    return true;
}


function validateFname() {
    var allAlpha = true;
    var elem = document.getElementById("fname");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label0");


    for (var i = 0; i < inputValue.length; i++) {
        // check all characters are letters
        if (inputValue.charAt(i) < "A" || inputValue.charAt(i) > "Z") {
            allAlpha = false;
        }
    }

    if (!allAlpha || inputValue.length <= 0) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        allAlpha = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return allAlpha;
}

function validateLname() {
    var allAlpha = true;
    var elem = document.getElementById("lname");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label1");


    for (var i = 0; i < inputValue.length; i++) {
        // check all characters are letters
        if (inputValue.charAt(i) < "A" || inputValue.charAt(i) > "Z") {
            allAlpha = false;
        }
    }

    if (!allAlpha || inputValue.length <= 0) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        allAlpha = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return allAlpha;
}

function validatePostal() {
    var valid = true;
    var elem = document.getElementById("postal");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label2");

    var valid = /^([a-zA-Z])+[0-9]+[a-zA-Z]+[0-9]+[a-zA-Z]+[0-9]$/;
    var valid2 = /^([a-zA-Z])+[0-9]+[a-zA-Z]+\s+[0-9]+[a-zA-Z]+[0-9]$/

    if (!valid2.test(inputValue) && !valid.test(inputValue) || inputValue.length <= 0) {
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        var valid = false;
    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return valid;
}

function orderP() {
    if (document.getElementById("orderP").checked) {
        document.getElementById("ordernum").style.display = "flex";
    } else {
        document.getElementById("ordernum").style.display = "none";
    }
}

window.onload = function () {
    var order = document.querySelector("#type");
    order.addEventListener("click", function () {
        orderP();
    })
}