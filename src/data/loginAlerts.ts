export enum LoginAlerts {
  INVALID_USERNAME_ALERT = "Epic sadface: Username is required",
  INVALID_PASSWORD_ALERT = "Epic sadface: Password is required",
  INVALID_USERNAME_AND_PASSWORD_ALERT = "Epic sadface: Username and password do not match any user in this service",
  LOCKED_OUT_USER_ALERT = "Epic sadface: Sorry, this user has been locked out.",
  UNATHORIZED_ALERT = "Epic sadface: You can only access '/inventory.html' when you are logged in.",

}

// Utility function if you want to get the message pattern by enum value
export function getLoginAlertMessage(alert: LoginAlerts): string {
  return alert;
}