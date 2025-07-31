export type UserType = 
'standard' | 
'locked' | 
'problem' | 
'glitch_user' |
'error' | 
'visual';

export interface UserCredentials {
    usernameKey: string
    passwordKey: string
}

export const userMappings: Record<UserType, UserCredentials> = {
    standard: {
        usernameKey: 'STANDARD_USER',
        passwordKey: 'PASSWORD'
    },
    locked: {
        usernameKey: 'LOCKED_OUT_USER',
        passwordKey: 'PASSWORD'
    },
    problem: {
        usernameKey: 'PROBLEM_USER',
        passwordKey: 'PASSWORD'
    },
    glitch_user: {
        usernameKey: 'PERFORMANCE_GLITCH_USER',
        passwordKey: 'PASSWORD'
    },
    error: {
        usernameKey: 'ERROR_USER',
        passwordKey: 'PASSWORD'
    },
    visual: {
        usernameKey: 'VISUAL_USER',
        passwordKey: 'PASSWORD'
    }
}