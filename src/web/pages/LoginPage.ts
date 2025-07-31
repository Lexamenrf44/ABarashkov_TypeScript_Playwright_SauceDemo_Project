import { BasePage } from "./BasePage";
import { step } from "../../utils/decorators.utils";
import { LoginAlerts } from '../../data/loginAlerts';

export class LoginPage extends BasePage {

    private readonly errorContainer = this.page.locator('.error-message-container');

    @step('Assert unauthorized access alert message displayed')
    async assertUnauthorizedAccessAlertMessage(): Promise<void> {
        await this.assertElementVisible(this.errorContainer);
        await this.assertElementHasText(this.errorContainer, LoginAlerts.UNATHORIZED_ALERT);
    }
}
