export default function Layout({
	children,
	left,
	right,
}: {
	children: React.ReactNode
	left: React.ReactNode
	right: React.ReactNode
}) {
	return (
		<>
			{children}
			{left}
			{right}
		</>
	)
}