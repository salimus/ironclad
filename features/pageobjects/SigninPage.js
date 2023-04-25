class SigninPage {
    get header() {
        return $('div[data-test-selector="SignIn_signInHeader"]');
    }
    
    get email() {
        return $('input[data-test-selector="SignIn_emailInput_form"]');
    }
    
    get continueButton() {
        return $('button[data-test-selector="SignIn_continueButton"]');
    }

    get password() {
        return $('input[data-test-selector="SignIn_passwordInput_form"]');
    }

    get submitButton() {
        return $('button[data-test-selector="SignIn_submitButton"]');
    }

    
    async pageTitle(expected_title) {
        await expect(browser).toHaveTitle(expected_title)
    }

    async signInHeader(expected_header) {
        await expect(this.header).toHaveText(expected_header)
    }

    async signInEmail(email) {
        await this.email.setValue(email);
        await this.continueButton.click();
    }

    async signInPassword(password) {
        await this.password.setValue(password);
        await this.submitButton.click();
    }
}
  
module.exports = new SigninPage();