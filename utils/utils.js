export const initWorkTime = 25 * 60
export const initBreakTime = 5 * 60

/**
 * Example
 * ```
 * console.log(zeroPadding(5, 2)); // -> "05"
 * console.log(zeroPadding(109, 5)); // -> "00109"
 * ```
 * @param num {number} - target number
 * @param len {number} - padding length
 */
export const zeroPadding = (num, len) =>
  (new Array(len).fill('0').join('') + num).slice(-len)
