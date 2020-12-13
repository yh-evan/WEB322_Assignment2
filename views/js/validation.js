function validateUser() {
    var validation = true;
    var elem = document.getElementById("username");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label-user");

    for (var i = 0; i < inputValue.length; i++) {
        // check all characters are letters
        if (inputValue.match(/[^\w\.\-]/) != null) {
            validation = false;
        }
    }

    if (!validation || inputValue.length < 6) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        validation = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return validation;
}

function validatePs() {
    var validation = true;
    var elem = document.getElementById("password");
    var inputValue = elem.value.trim();

    var label = document.getElementById("label-pass");

    var valid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/;

    if (!valid.test(inputValue)) {
        validation = false;
    }

    if (!validation || inputValue.length <= 6) {
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        validation = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return validation;
}


function validateFname() {
    var validation = true;
    var elem = document.getElementById("fname");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label0");


    for (var i = 0; i < inputValue.length; i++) {
        // check all characters are letters
        if (inputValue.charAt(i) < "A" || inputValue.charAt(i) > "Z") {
            validation = false;
        }
    }

    if (!validation || inputValue.length <= 0) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        validation = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return validation;
}

function validateLname() {
    var validation = true;
    var elem = document.getElementById("lname");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label1");


    for (var i = 0; i < inputValue.length; i++) {
        // check all characters are letters
        if (inputValue.charAt(i) < "A" || inputValue.charAt(i) > "Z") {
            validation = false;
        }
    }

    if (!validation || inputValue.length <= 0) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        validation = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return validation;
}

function validateEmail() {
    var validation = true;
    var elem = document.getElementById("email");
    var inputValue = elem.value.trim();
    inputValue = inputValue.toUpperCase();
    var label = document.getElementById("label-email");

    var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!valid.test(inputValue)) {
        validation = false;
    }

    if (!validation) {
        //  alert("Name : Please enter a meaningful name with all alphabet letters.");
        label.style.display = "block";
        elem.style.borderBottomColor = "red";
        elem.focus();
        validation = false;

    } else {
        label.style.display = "none";
        elem.style.borderBottomColor = "green";
    }
    return validation;
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