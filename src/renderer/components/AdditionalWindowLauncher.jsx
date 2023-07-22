import { ExternalLink } from "react-feather";

export default function AdditionalWindowLauncher() {
	return (
		<button
			onClick={() => {
				const childWindow = window.open(
					"/secondary",
					"_blank",
					"width=750, height=600, minWidth=200, minHeight=100, autoHideMenuBar=yes, alwaysOnTop=yes"
				);
			}}
			className="flex items-center justify-center h-12 text-gray-400 border-l border-gray-700 w-14"
		>
			<ExternalLink className="w-5 h-5 stroke-current" />
		</button>
	);
}
