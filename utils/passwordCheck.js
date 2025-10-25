function checkPassword(password) {
    return new Promise((resolve, reject) => {
        if (typeof password !== 'string') {
            reject(new Error('Password must be a string'));
            return;
        }

        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (password.length < minLength) {
            reject(new Error('Password must be at least 6 characters long'));
        } else if (!hasUpperCase) {
            reject(new Error('Password must contain at least one uppercase letter'));
        } else if (!hasLowerCase) {
            reject(new Error('Password must contain at least one lowercase letter'));
        } else if (!hasNumber) {
            reject(new Error('Password must contain at least one number'));
        } else if (!hasSymbol) {
            reject(new Error('Password must contain at least one special character'));
        } else {
        resolve(password);
        }
    });
}

module.exports = {
    checkPassword
};