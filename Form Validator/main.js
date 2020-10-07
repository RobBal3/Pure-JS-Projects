const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Submiting with wrong Input
function showError(input, message) {
    const parentEl = input.parentElement;
    parentEl.className = 'form-control error';
    const small = parentEl.querySelector('small');
    small.innerHTML = message;
}

// Checking for the Length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be more than ${min} character`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} Characters`)
    }
}

// Checking Email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not Valid')
    }
}

// Check Passwords Match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    } else {
        showSuccess(input2ssd);
    }
}


// Submiting with right Input
function showSuccess(input) {
    const parentEl = input.parentElement;
    parentEl.className = 'form-control success'
}

// Getting Field Name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateInputs(inputArr) {
    inputArr.forEach(function(item) {
        if(item.value.trim() === '') {
            showError(item, `${getFieldName(item)} is required`)
        } else {
            showSuccess(item);
        }
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    validateInputs([username, email, password, password2]);
    checkLength(username, 3 , 15)
    checkLength(password, 6 , 15)
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})