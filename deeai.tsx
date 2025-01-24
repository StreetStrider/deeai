
import React from 'react'

var x = <div />

export type Key = (string | symbol)

/* type Update <Map extends {}, K extends Key, M> = (Map & { [KN in K]: M }) */
type Update <Map extends {}, K extends Key, M> = (Omit<Map, K> & { [KN in K]: M })

export interface Container <Map extends {}>
{
	provide <K extends Key, M> (key: K, module: M): Container<Update<Map, K, M>>,
	resolve <K extends keyof Map>(key: K): Map[K],
	resolve_maybe <K extends Key>(key: K): K extends keyof Map ? Map[K] : void,
}

export default function Container <Map> (): Container<Map>
{
	var C: any = {}
	if (arguments.length)
	{
		var [ C, key, module ] = arguments
		C = { ...C, [key]: module }
	}

	var cntr =
	{
		provide,
		resolve,
		resolve_maybe,
	}

	function provide <K extends Key, M> (key: K, module: M)
	{
		// @ts-ignore
		var cntr_derv = Container(C, key, module)
		return (cntr_derv as Container<Update<Map, K, M>>)
	}

	function resolve <K extends keyof Map> (key: K): Map[K]
	{
		if (key in C)
		{
			return C[key]
		}
		else
		{
			var e = TypeError('deeai/no_resolve')

			// @ts-ignore
			e.container = cntr

			// @ts-ignore
			e.key = key

			throw e
		}
	}

	function resolve_maybe <K extends Key>(key: K): K extends keyof Map ? Map[K] : void
	{
		return C[key]
	}

	return cntr
}
