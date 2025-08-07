export const alertTypes = {

    EMPTY_ALL: {
        flowType: 'empty',
        endpoint: '',
        alertMessage: 'Epic sadface: Username is required',
    },
    EMPTY_USERNAME: {
        flowType: 'no_username',
        endpoint: '',
        alertMessage: 'Epic sadface: Username is required',
    },
    EMPTY_PASSWORD: {
        flowType: 'no_password',
        endpoint: '',
        alertMessage: 'Epic sadface: Password is required',
    },
    INVALID_USERNAME_AND_PASSWORD: {
        flowType: 'invalid',
        endpoint: '',
        alertMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    LOCKED_OUT_USER: {
        flowType: 'locked',
        endpoint: '',
        alertMessage: 'Epic sadface: Sorry, this user has been locked out.',
    },
    UNATHORIZED: {
        flowType: 'unauthorized',
        endpoint: '',
        alertMessage: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    }

}

export type AlertTypes = keyof typeof alertTypes;