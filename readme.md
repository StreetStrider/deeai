# api
```js
interface Container
{
	provide (key, module): Container,
	resolve (key): module,
	resolve_maybe (key): ?module,
}
```
