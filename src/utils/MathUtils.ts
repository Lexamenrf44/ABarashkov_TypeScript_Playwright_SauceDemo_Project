export class MathUtils {
    static toNumber(value: unknown): number {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            const sanitized = value.replace(/[^\d.-]/g, '');
            if (!sanitized || isNaN(Number(sanitized))) {
                throw new Error(`Invalid numeric value: ${value}`);
            }
            return Number(sanitized);
        }
        if (typeof value === 'bigint') return Number(value);
        throw new Error(`Unknown type: ${typeof value}`);
    }

    static add(a: unknown, b: unknown): number {
        return MathUtils.toNumber(a) + MathUtils.toNumber(b);
    }

    static addRounded(a: unknown, b: unknown, decimals = 2): number {
        return Number(MathUtils.add(a, b).toFixed(decimals));
    }

    static subtract(a: unknown, b: unknown): number {
        return MathUtils.toNumber(a) - MathUtils.toNumber(b);
    }

    static subtractRounded(a: unknown, b: unknown, decimals = 2): number {
        return Number(MathUtils.subtract(a, b).toFixed(decimals));
    }

    static multiply(a: unknown, b: unknown): number {
        return MathUtils.toNumber(a) * MathUtils.toNumber(b);
    }

    static multiplyRounded(a: unknown, b: unknown, decimals = 2): number {
        return Number(MathUtils.multiply(a, b).toFixed(decimals));
    }

    static divide(a: unknown, b: unknown): number {
        return MathUtils.toNumber(a) / MathUtils.toNumber(b);
    }

    static divideRounded(a: unknown, b: unknown, decimals = 2): number {
        return Number(MathUtils.divide(a, b).toFixed(decimals));
    }

    static assertEquals(a: unknown, b: unknown): void {
        if (MathUtils.toNumber(a) !== MathUtils.toNumber(b)) {
            throw new Error(`${a} is not equal to ${b}`);
        }
    }
}