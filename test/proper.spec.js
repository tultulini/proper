import assert from 'assert'
import proper from '../src/proper';
describe('proper', function () {
    describe('full path', function () {
        it('Should activate pathToParam and have all path components', function () {
            const obj = { prop1: { prop2: 3 } }
            proper(obj, (prop1, prop2) => {
                assert.notEqual(prop1, null, 'path is broken')
                assert.notEqual(prop1, undefined, 'path is broken')
                assert.equal(prop1.prop2, prop2, 'edge value is wrong')

            })
                .else(() => {

                    assert.fail(`else shouldn't run`)
                })
                .catch(() => {
                    assert.fail(`catch shouldn't run`)

                })

            //assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
    describe('Missing edge value', function () {
        it('Should activate else clause', function (done) {
            let passedThroughElse = false
            const obj = { prop1: { prop2: null } }
            proper(obj, (prop1, prop2) => {
                assert.fail('Path to params predicate should not be activated')
            })
                .else(() => {
                    passedThroughElse = true
                    console.log('Else clause hit')
                    assert.ok(true, 'Else clause happened')
                })
                .catch(() => {
                    assert.fail(`Catch shouldn't run`)
                })

            done(passedThroughElse ? undefined : "didn't go through else clause")
            //assert.equal([1, 2, 3].indexOf(4), -1);
        })
    });
});