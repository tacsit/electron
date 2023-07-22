import { Dialog } from "@headlessui/react";
import MapContext from "../contexts/MapContext";
import { useContext, useState } from "react";
import { CicsDb2Connection } from "@carbon/icons-react";

export default function DatasourcesSelector() {
	const map = useContext(MapContext);

	const [isOpen, setIsOpen] = useState(true);

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center h-12 w-full text-gray-400 border-b border-gray-700 cursor-pointer"
				title="Add datasources to map"
			>
				<CicsDb2Connection className="w-5 h-5 text-gray-400 stroke-current" />
			</button>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Panel className="absolute top-0 bottom-0 my-12 text-gray-200 bg-black border-l border-gray-700 select-none right-12 w-80">
					<div className="px-4 py-3 text-gray-500 border-b border-gray-700">
						<Dialog.Title className="flex items-center justify-between text-sm">
							<p className="mr-4 font-bold uppercase ">
								Datasources
							</p>
							<div>
								<input
									type="search"
									className="rounded bg-gray-900 border border-gray-700 px-2 py-1.5 w-full focus:outline-none"
									placeholder="Search ..."
								/>
							</div>
						</Dialog.Title>
					</div>

					{/* {layers ? (
						<ul className="text-sm text-gray-500 divide-y divide-gray-700">
							{Object.entries(layers).map(([key, value]) => (
								<li key={key}>
									<button
										onClick={() => handleLayerChange(key)}
										className="flex items-center justify-between w-full h-12 px-4 py-2 text-lg cursor-pointer select-none"
									>
										<span>{value}</span>
										{activeLayers.indexOf(key) >= 0 && (
											<CheckIcon
												title="Currently selected"
												className="w-4 h-4 text-gray-400 stroke-current"
											/>
										)}
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className="px-4 py-2 text-base text-gray-500">
							No layers available.
						</div>
					)} */}
				</Dialog.Panel>
			</Dialog>
		</div>
	);
}
