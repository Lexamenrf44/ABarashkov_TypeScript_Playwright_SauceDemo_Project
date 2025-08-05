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
                .replace(/\{([\w.]+)\}/g, (_, path) => {
                    const [paramName, ...props] = path.split('.');
                    const paramIndex = paramNames.indexOf(paramName);
                    let value = paramIndex >= 0 && paramIndex < args.length ? args[paramIndex] : undefined;
                    for (const prop of props) {
                        value = value?.[prop];
                    }
                    if (value?.constructor?.name === 'Locator') {
                        const foundProp = propertyNames.find(prop => this[prop] === value);
                        return foundProp || paramName;
                    }
                    return value !== undefined ? String(value) : path;
                });

            return test.step(formattedName, async () => {
                return await originalMethod.call(this, ...args);
            });
        };
    };
}