//  To be finished

type TEntry = {
	name: string,
	children?: TEntry[]
}

// Función recursiva (se llama a sí misma)
function Entry({ name, children }: TEntry) {
	return <div>
		{name}
		{children?.map((entry) => (
			<Entry {...entry} />
		))}
	</div>
}

export default function TreeBrowser() {

	const folders = {
		children: [
			{
				name: "node_modules",
				children: [
					{
						name: "joi"
					}
				]
			},
			{
				name: "package.json"
			},
			{
				name: "vite.config.ts"
			}
		]
	}

	return (
		<div >
			{folders.children.map((entry) => (
				<Entry {...entry} />
			))}
		</div>
	)
}
