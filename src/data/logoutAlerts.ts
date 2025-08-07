export enum LogoutAlerts {

  INVENTORY_PAGE_ALERT = "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  CART_PAGE_ALERT = "Epic sadface: You can only access '/cart.html' when you are logged in.",
  YOUR_INFORMATION_CHECKOUT_PAGE_ALERT = "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
  OVERVIEW_CHECKOUT_PAGE_ALERT = "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.",
  COMPLETE_CHECKOUT_PAGE_ALERT = "Epic sadface: You can only access '/checkout-complete.html' when you are logged in.",
  INVENTORY_ITEM_PAGE_ALERT = "Epic sadface: You can only access '/inventory-item.html' when you are logged in."
}

// Utility function if you want to get the message pattern by enum value
export function getLogoutAlertMessage(alert: LogoutAlerts): string {
  return alert;
}