import Link from "next/link";

interface DocumentPageInfo {
	name: string
	uri: string
}

const pageInfos: DocumentPageInfo[] =[
	{
		name: "ServerActionMutation",
		uri: "/document/nextjs/data-fetching/server-action-mutation",
	},
	{
		name: "Fetching,Caching,Revalidating",
		uri: "/document/nextjs/data-fetching/fetching-caching-revalidating",
	},
]

export default function Page() {
	return (
		<div className="w-full p-32 flex flex-col items-center ">
			<div className="text-5xl">Select Document written in Next'js that you want to try Experiment</div>
			<div className="group w-1/2 flex overflow-x-scroll flex-wrap justify-center mt-10">
				{pageInfos.map((p) => <Button info={p}/>)}
			</div>
		</div>
	)
}

const Button = (props: { info: DocumentPageInfo}) => {
	return (
		<Link href={props.info.uri}>
			<button className="p-6 m-6 rounded-2xl bg-cyan-500 text-white transition duration-200 hover:bg-emerald-500 hover:-translate-y-1">
				<div className="text-xl">
					{props.info.name}
				</div>
			</button>
		</Link>
	)
}