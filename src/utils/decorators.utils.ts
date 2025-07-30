import { test } from '@playwright/test';

export function step(stepName?: string) {
    return function (originalMethod: any, context: ClassMethodDecoratorContext) {
        return async function (this: any, ...args: any[]) {
            const paramNames = originalMethod
                .toString()
                .match(/\((.*?)\)/)?.[1]
                ?.split(',')
                ?.map(p => p.trim().replace(/:.*/, '')) || [];
            
            const propertyNames = Object.getOwnPropertyNames(this);
            
            const formattedName = (stepName || String(context.name))
                .replace(/\{(\w+)\}/g, (_, paramName) => {
                    const paramIndex = paramNames.indexOf(paramName);
                    
                    if (paramIndex >= 0 && paramIndex < args.length) {
                        const arg = args[paramIndex];
                        
                        if (arg?.constructor?.name === 'Locator') {
                            const foundProp = propertyNames.find(prop => 
                                this[prop] === arg
                            );
                            return foundProp || paramName;
                        }
                        return String(arg);
                    }
                    return paramName;
                });

            return test.step(formattedName, async () => {
                return await originalMethod.call(this, ...args);
            });
        };
    };
}