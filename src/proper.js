import { isAsync, wrapPromiseForResult, isPromise } from "./utils/promises"
import { isNullOrUndefined, isSomething } from "./utils/object"
import { lastItem } from "./utils/arrays"

export default function proper(obj, pathToAction) {
    if (isNullOrUndefined(obj) || isNullOrUndefined(pathToAction)) {
        throw new Error('Need base object and pathToAction')
    }

    const { params, pathError } = getPathParamValues(obj, pathToAction)
    const { catchFunc, elseFunc } = getAlternativePathFuncs(params, pathError)
    const runPathToAction = isSomething(lastItem(params))
    const result = {}

    result.else = (pred) => {
        const fun = elseFunc(pred)
        return isPromise(fun)
            ? wrapPromiseForResult(fun, result)
            : result
    }

    result.catch = (pred) => {
        const fun = catchFunc(pred);
        return isPromise(fun)
            ? wrapPromiseForResult(fun, result)
            : result
    }

    let ret
    if (isAsync(pathToAction)) {
        ret = runPathToAction
            ? wrapPromiseForResult(pathToAction.apply(null, params), result)
            : Promise.resolve(result)
    }
    else {
        if(runPathToAction)
        {
            pathToAction.apply(null, params)
        }
        ret = result
    }
    return ret
}

function getAlternativePathFuncs(params, pathError) {
    const emptyFunc = () => { }
    let catchFunc
    let elseFunc

    if (pathError) {
        elseFunc = emptyFunc
        catchFunc = (pred) => {
            return pred(pathError.prop, pathError.step)
        }
    }
    else {
        if (isNullOrUndefined(params[params.length - 1])) {
            elseFunc = pred => {
                return pred()
            }
        }
        else {

            elseFunc = emptyFunc
        }
        catchFunc = emptyFunc
    }
    return { catchFunc, elseFunc }

}

function getFunctionArgs(func) {
    return (func + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]
}


function getPathParamValues(obj, pathToAction) {
    let step = 0
    const pathComponents = getFunctionArgs(pathToAction)
    const stepCount = pathComponents.length

    if (stepCount === 0) {
        throw new Error("path to action is empty")
    }

    let currentStep = obj
    let pathError
    const params = pathComponents.map(prop => {
        if (!currentStep) {
            return null
        }

        currentStep = currentStep[prop]
        if (isNullOrUndefined(currentStep) && step < stepCount - 1) {
            pathError = { prop, step }
        }
        step++
        return currentStep
    })
    return { params, pathError }

}
