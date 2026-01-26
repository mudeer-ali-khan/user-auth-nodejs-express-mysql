 function validatePassword() {
    let pwd = document.getElementById('password').value;
    let cpwd = document.getElementById('confirmPassword').value;

    if (pwd == "" || cpwd == "") {
        alert('Password fields cannot be empty');
        return false;
    }
    if (pwd !== cpwd) {
        alert('Passwords do not match');
        return false;
    }
    return true;
}