/**
 * Returns true if `value` is neither null nor undefined, else returns false.
 * @param {any} value - The value to test.
 * @returns {Boolean}
 */
export function isNullOrUndef(value:any) {
    return value === null || typeof value === 'undefined';
}

/**
 * Returns true if `value` is an object (excluding null), else returns false.
 * @param {any} value - The value to test.
 * @returns {Boolean}
 */
export function isObject(value: any) {
    return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Returns `value` if defined, else returns `defaultValue`.
 * @param {*} value - The value to return if defined.
 * @param {*} defaultValue - The value to return if `value` is undefined.
 * @returns {*}
 */
export function valueOrDefault(value:any, defaultValue:any) {
    return typeof value === 'undefined' ? defaultValue : value;
}
