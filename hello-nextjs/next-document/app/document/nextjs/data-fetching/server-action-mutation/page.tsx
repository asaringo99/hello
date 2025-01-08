'use client'

import clsx from "clsx"
import { useState } from "react"

export default function Page() {
	const TEXT_LIMIT_SIZE = 20
	const [formText, setFormText] = useState<string>("")
	const [isOverLimit, setIsOverLimit] = useState<boolean>(false)
	const handleChange = (text: string) => {
		setFormText(text)
	}
	const handleClick = () => {
		if (formText.length > TEXT_LIMIT_SIZE) {
			setIsOverLimit(true)
		} else {
			setIsOverLimit(false)
		}
	}
	return (
		<div className="flex-col flex items-center justify-center px-32 py-32">
			<div
				className="relative"
			>
				<input
					value={formText}
					className={clsx(
						"w-80 p-4 rounded-3xl", {
						"border-red-500 border-2": isOverLimit
					})}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<span
					className="absolute right-2 top-3 bg-white p-1 z-50"
				>
					{formText.length}/{TEXT_LIMIT_SIZE}
				</span>
			</div>
			{isOverLimit ? (
				<div
					className="text-red-700 mt-2"
				>
					文字数の制限である {TEXT_LIMIT_SIZE} 文字をオーバーしています
				</div>
			) : (
				<div
					className="text-green-600 mt-2"
				>
					正常です
				</div>
			)}
			<button
				className="m-4 p-3 bg-red-400 rounded-3xl hover:bg-red-700 transition duration-200 hover:-translate-y-2"
				onClick={handleClick}
			>
				ボタン
			</button>
		</div>
	)
}