'use client'

import { memo, useCallback, useEffect, useState } from "react"
import { setTimeout } from "timers"

export default function Page() {
	return (
		<ParentComponent />
	)
}

const ParentComponent = () => {
  const [count1, setCount1] =	useState<number>(0)
  const [count2, setCount2] =	useState<number>(0)
	const handleCount1 = () => {
		console.log("count1: ", count1)
		setCount1(c => c + 1)
	}
	const handleCount2 = useCallback(() => {
		console.log("count2: ", count2)
		setCount2(c => c + 1)
	}, [count2])
	const handleCount2_2 = () => {
		console.log("count2: ", count2)
		setCount2(c => c + 1)
	}
	return (
		<div>
			<div className=" h-24 w-24 bg-emerald-600 flex items-center justify-center" onClick={handleCount1}>
				<div className=" h-12 w-12 bg-rose-500" onClick={handleCount2_2}>
					{`${count1} vs ${count2}`}
					<MemoChildComponent />
					<ChildComponent />
				</div>
			</div>
		</div>
	)
}

const MemoChildComponent = memo(() => {
	
	useEffect(() => {
		setTimeout(() => {
			console.log("rendered1")
		},3000)
	})
	return (
		<div>child</div>
	)
})

const ChildComponent = () => {
	
	useEffect(() => {
		setTimeout(() => {
			console.log("rendered2")
		},3000)
	})
	return (
		<div>child</div>
	)
}