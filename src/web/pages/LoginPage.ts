import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../../utils/decorators.utils";
import { LoginAlerts } from '../../data/loginAlerts';
import { InventoryPage } from "./InventoryPage";
import { AlertTypes } from "../../data/alertTypes";

export class LoginPage extends BasePage {

    private readonly loginWindow: Locator = this.page.locator('.login_wrapper-inner');
    private readonly errorContainer: Locator = this.page.locator('.error-message-container');
    private readonly usernameInput: Locator = this.page.locator('[data-test="username"]');
    private readonly passwordInput: Locator = this.page.locator('[data-test="password"]');
    private readonly loginButton: Locator = this.page.locator('[data-test="login-button"]');

    @step('Should navigate to login page')
    async navigateToLoginPage(): Promise<LoginPage> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        return this;
    }   

    @step('Assert login page loaded')
    async waitUntilLoginPageLoaded(): Promise<LoginPage> {
        await this.assertPageUrl(`${process.env.SAUCE_DEMO_BASE_URL}`, '/');
        await this.assertElementVisible(this.loginWindow);

        return this;
    }

    @step('Manual authentication')
    async manualAuthentication(): Promise<InventoryPage> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.waitUntilLoginPageLoaded();
        await this.fillSelector(this.usernameInput, `${process.env.STANDARD_USER}`);
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);

        return new InventoryPage(this.page).waitUntilInventoryPageLoaded();
    }

    @step('Should not login with empty credentials')
    async submitEmptyCredentials(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, '');
        await this.fillSelector(this.passwordInput, '');
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login without username')
    async submitWithoutUsername(): Promise<LoginPage> {
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login without password')
    async submitWithoutPassword(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, `${process.env.STANDARD_USER}`);
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login with invalid username')
    async submitInvalidUsername(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, 'invalid_user');
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login with invalid password')
    async submitInvalidPassword(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, `${process.env.STANDARD_USER}`);
        await this.fillSelector(this.passwordInput, 'invalid_password');
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login with invalid credentials')
    async submitInvalidCredentials(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, 'invalid_user');
        await this.fillSelector(this.passwordInput, 'invalid_password');
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not login with locked user')
    async submitLockedUsername(): Promise<LoginPage> {
        await this.fillSelector(this.usernameInput, `${process.env.LOCKED_OUT_USER}`);
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);

        return this;
    }

    @step('Should not navigate to inventory page unauthorized')
    async navigateToInventoryPage(): Promise<LoginPage> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}/inventory.html`);

        return this;
    }

    @step('Assert {alertMessage} alert message string displayed')
    async assertAlertMessageDisplayed(alertMessage: string): Promise<void> {
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, alertMessage);
    }

    @step('Assert unauthorized access alert message displayed')
    async assertUnauthorizedAccessAlertMessage(): Promise<void> {
        await this.waitUntilLoginPageLoaded();
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.UNATHORIZED_ALERT);
    }

    @step('Assert invalid username and password alert message displayed when {usernameInput} and {passwordInput} are filled with invalid data')
    async assertInvalidUsernameAndPasswordAlertMessage(): Promise<void> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.waitUntilLoginPageLoaded();
        await this.assertElementVisible(this.usernameInput);
        await this.fillSelector(this.usernameInput, 'invalid_user');
        await this.assertElementVisible(this.passwordInput);
        await this.fillSelector(this.passwordInput, 'invalid_password');
        await this.assertElementVisible(this.loginButton);
        await this.clickSelector(this.loginButton);
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.INVALID_USERNAME_AND_PASSWORD_ALERT);
    }

    @step('Assert empty username alert message displayed when {usernameInput} is empty')
    async assertEmptyUsernameAlertMessage(): Promise<void> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.waitUntilLoginPageLoaded();
        await this.clickSelector(this.loginButton);
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.EMPTY_USERNAME_ALERT);
    }

    @step('Assert empty password alert message displayed when {passwordInput} is empty')
    async assertEmptyPasswordAlertMessage(): Promise<void> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.waitUntilLoginPageLoaded();
        await this.fillSelector(this.usernameInput, `${process.env.STANDARD_USER}`);
        await this.clickSelector(this.loginButton);
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.EMPTY_PASSWORD_ALERT);
    }

    @step('Assert locked out user alert message displayed when {usernameInput} is filled with locked out user')
    async assertLockedOutUserAlertMessage(): Promise<void> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.waitUntilLoginPageLoaded();
        await this.fillSelector(this.usernameInput, `${process.env.LOCKED_OUT_USER}`);
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.LOCKED_OUT_USER_ALERT);
    }

}
