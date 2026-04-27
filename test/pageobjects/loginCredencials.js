import testUrl from './testUrl.js';

class LoginCredentials extends testUrl {
    get typeUsername() {
        return $('input[type="text"]');
    }

    get typePassword() {
        return $('input[type="password"]');
    }

    get loginButton() {
        return $('button[class*="fui-Button"]');
    }

    get loggedIn() {
        return $('[data-testid="menu-notifications-button"]');
    }

    get logout() {
        return $('[data-testid="menu-logout-button"]');
    }

    async login(username, password) {
        await this.typeUsername.setValue(username);
        await this.typePassword.setValue(password);
        await this.loginButton.click();
    }

    async url() {
        return super.url('https://app.thecasework.com/');
    }
}

export default new LoginCredentials();
