# propert (pronounced property)

## An object property utility
This util helps ensure that the using a path such as obj.prop_1.prop_2....prop_n is safe to use and handles such cases where prop_i (i: 1<=i<n) is null or undefined (catch) or prop_n is null or undefined (else)

## How to use
```
import { proper } from '@tultulini/proper'

const user = { cat: { name: 'terror' } }


proper(user, (cat, name) => {
    console.log(`The user's cat is called ${name}`)
})
    .else(() => {

        console.log(`The cat doesn't have a name`)
    })
    .catch((prop) => {
        console.log(`There's no ${prop}`)

    })
```
