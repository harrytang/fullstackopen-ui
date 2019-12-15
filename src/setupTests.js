/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: () => {
        savedItems = {}
    }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })