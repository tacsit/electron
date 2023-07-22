import CurrentDate from "../components/CurrentDate";
import CurrentTimestamp from "../components/CurrentTimestamp";

export default function SecondaryMapLayout({ children }) {
	return (
		<div className="flex flex-col w-full h-screen overflow-hidden bg-black selection:bg-gray-500">
			<header className="flex items-center justify-end w-full h-12 text-sm text-white bg-black border-gray-700 border-y">

				<div className="flex items-center h-12">

					{/* Timestamp */}
					<p className="flex items-center justify-center h-12 px-4 font-mono tracking-tight border-l border-gray-700 select-none focus:outline-none focus:bg-gray-900">
						<span className="hidden mr-2 sm:inline-block">
							<CurrentDate />
						</span>
						<span>
							<CurrentTimestamp />
						</span>
					</p>
				</div>

			</header>

			<div className="flex flex-1 w-full border-l border-gray-700">
				<section className="flex flex-col flex-1 overflow-hidden">
					{children}
				</section>
			</div>
		</div>
	);
}
