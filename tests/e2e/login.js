describe('Login page', function() {
	var loginForm = element(by.css('form[name="vm.loginForm"]'));

	beforeAll(function() {
		// Allows localStorage to be cleared if this is the first test run
		browser.get('/');
	});

	beforeEach(function() {
		browser.executeScript('localStorage.clear()');
		browser.get('/login');
	});

	it('should login with valid credentials', function() {
		loginForm.element(by.css('input[name="email"]')).sendKeys('test_user@bigwednesday.io');
		loginForm.element(by.css('input[name="password"]')).sendKeys('Testing123');

		loginForm.element(by.css('button[type="submit"]'))
			.click()
			.then(function() {
				expect(browser.getCurrentUrl()).not.toMatch('/login');
			});
	});

	it('should not login without credentails', function() {
		loginForm.element(by.css('button[type="submit"]'))
			.click()
			.then(function() {
				expect(browser.getCurrentUrl()).not.toMatch('/dashboard');
			});
	});
});
