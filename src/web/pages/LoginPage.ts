import { BasePage } from "./BasePage";
import { step } from "../../utils/decorators.utils";
import { LoginAlerts } from '../../data/loginAlerts';
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends BasePage {

    private readonly errorContainer = this.page.locator('.error-message-container');
    private readonly usernameInput = this.page.locator('[data-test="username"]');
    private readonly passwordInput = this.page.locator('[data-test="password"]');
    private readonly loginButton = this.page.locator('[data-test="login-button"]');

    @step('Assert login page loaded')
    async assertLoginPageLoaded(): Promise<void> {
        await this.assertPageUrl(`${process.env.SAUCE_DEMO_BASE_URL}`);
    }

    @step('Manual authentication')
    async manualAuthentication(): Promise<InventoryPage> {
        await this.navigateTo(`${process.env.SAUCE_DEMO_BASE_URL}`);
        await this.assertLoginPageLoaded();
        await this.fillSelector(this.usernameInput, `${process.env.STANDARD_USER}`);
        await this.fillSelector(this.passwordInput, `${process.env.PASSWORD}`);
        await this.clickSelector(this.loginButton);

        return new InventoryPage(this.page).waitUntilInventoryPageLoaded();
    }

    @step('Assert unauthorized access alert message displayed')
    async assertUnauthorizedAccessAlertMessage(): Promise<void> {
        await this.assertLoginPageLoaded();
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.UNATHORIZED_ALERT);
    }

    @step('Assert invalid username and password alert message displayed when {usernameInput} and {passwordInput} are filled with invalid data')
    async assertInvalidUsernameAndPasswordAlertMessage(): Promise<void> {
        await this.assertLoginPageLoaded();
        await this.assertElementVisible(this.usernameInput);
        await this.fillSelector(this.usernameInput, 'invalid_user');
        await this.assertElementVisible(this.passwordInput);
        await this.fillSelector(this.passwordInput, 'invalid_password');
        await this.assertElementVisible(this.loginButton);
        await this.clickSelector(this.loginButton);
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.INVALID_USERNAME_AND_PASSWORD_ALERT);
    }

}
