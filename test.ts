
import Container from './deeai'

const a = Container()

attempt('a.foo', () => a.resolve('foo')) /* #1 expect ts error */
// attempt('a.bar', () => a.resolve('bar')) /* expect ts error */
// attempt('a.baz', () => a.resolve('baz')) /* expect ts error */

const b = a.provide('foo', 1)

attempt('b.foo', () => b.resolve('foo'))
attempt('b.bar', () => b.resolve('bar')) /* #2 expect ts error */
// attempt('b.baz', () => b.resolve('baz')) /* expect ts error */

const c = b
.provide('foo', { foo: true })
.provide('bar', { bar: true })
// .provide('bar', 2)

attempt('c.foo', () => c.resolve('foo'))
attempt('c.bar', () => c.resolve('bar'))
attempt('c.baz', () => c.resolve('baz')) /* #3 expect ts error */

console.log('maybe baz', c.resolve_maybe('baz'))

console.log('type mismatch', c.resolve('foo') + 0) /* #4 expect ts error */
console.log('type mismatch', c.resolve('bar') + 0) /* #5 expect ts error */

if (c.resolve_maybe('foo') === 3) { console.log('if maybe foo') } /* #6 expect ts error */
if (c.resolve_maybe('bar') === 3) { console.log('if maybe bar') } /* #7 expect ts error */
if (c.resolve_maybe('baz') === 3) { console.log('if maybe baz') } /* #8 expect ts error */

if (c.resolve_maybe('baz') != null) { console.log('if maybe baz') }

const d = Container()

const qux = Symbol('qux')

attempt('d.qux', () => d.resolve(qux)) /* #9 expect ts error */

const e = d.provide(qux, { qux: true })

attempt('e.qux', () => e.resolve(qux))

console.log('type mismatch', e.resolve(qux).bar)  /* #10 expect ts error */

function attempt (name: string, fn: Function)
{
	try
	{
		console.log('resolve', name, fn())
	}
	catch (e)
	{
		console.log('catch', name, e.message)
	}
}
