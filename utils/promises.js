
export function isPromise(val) {
    return val && val.constructor && val.constructor.name === "Promise"
}

export function wrapPromiseForResult(promise, result) {
    return new Promise((resolve, reject) => {
        promise.then(() => resolve(result))
            .catch(() => reject(result))

    })
}

export function isAsync(func) {
    const string = func.toString().trim();

    return !!(
        // native
        string.match(/^async /) ||
        // babel (this may change, but hey...)
        string.match(/return _ref[^\.]*\.apply/)
        // insert your other dirty transpiler check

        // there are other more complex situations that maybe require you to check the return line for a *promise*
    );
}
