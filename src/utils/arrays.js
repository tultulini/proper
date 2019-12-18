import { isNullOrUndefined } from "./object";

export function lastItem(arr) {
    return hasSomething(arr)
        ? arr[arr.length - 1]
        : null
}

function hasSomething(arr) {
    return !isNullOrEmpty(arr)
}

function isNullOrEmpty(arr) {
    return isNullOrUndefined(arr) || arr.length == 0
}