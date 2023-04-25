class HomePage {
    get signIn() {
        return $('=Sign In');   
    }
    
    async open() {
        await browser.url('https://ironcladapp.com/');
    }

    async pageTitle(expected_title) {
        await expect(browser).toHaveTitle(expected_title)
    }

    async clickSignIn() {
        await expect(this.signIn).toHaveAttribute('href', '/signin')
        await this.signIn.click()
    }
}
  
module.exports = new HomePage();