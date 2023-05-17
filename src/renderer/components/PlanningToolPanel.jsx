import hotkeys from "hotkeys-js";
import MapContext from "../contexts/MapContext";
import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, CalculatorIcon } from "@heroicons/react/24/outline";

export default function PlanningToolPanel() {
	const map = useContext(MapContext);

	let cols = 12;

	return (
		<Disclosure>
			<Disclosure.Button className="flex items-center justify-center h-12 px-3.5 space-x-1.5 text-gray-400 border-l border-gray-700 cursor-pointer">
				<CalculatorIcon className="w-6 h-6 text-gray-400 stroke-current" />
				<ChevronUpIcon
					className={`w-4 h-4 text-gray-400 stroke-current ui-open:rotate-180`}
				/>
			</Disclosure.Button>
			<Disclosure.Panel className="absolute top-0 bottom-0 right-0 my-12 overflow-x-hidden overflow-y-auto text-gray-200 bg-black border-l border-gray-700 select-none w-[398px] scrollbar-thumb-gray-800 scrollbar-track-gray-900 scrollbar-thin">

				<div className="sticky top-0 grid grid-cols-4 bg-black border-b border-gray-700">
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">FL</div>
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">HDG</div>
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">KTAS</div>
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">KGS</div>
					<div className="p-1 text-gray-400 bg-gray-800 border-b border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-gray-400 bg-gray-800 border-b border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-gray-400 bg-gray-800 border-b border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-center text-gray-400 bg-black border-b border-r border-gray-700">
						<span className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none">
                            200
                        </span>
					</div>
                    <div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">TGT ELV</div>
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">W-DIR</div>
					<div className="py-1 text-center text-gray-400 border-b border-r border-gray-700">W-SPEED</div>
					<div className="py-1 text-center text-gray-400 border-b border-gray-700">HW/XW</div>
                    <div className="p-1 text-gray-400 bg-gray-800 border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-gray-400 bg-gray-800 border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-gray-400 bg-gray-800 border-r border-gray-700">
						<input
							type="text"
							className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none"
						/>
					</div>
					<div className="p-1 text-center text-gray-400 bg-black border-r border-gray-700">
						<span className="max-w-full p-0 text-center text-gray-300 bg-transparent rounded-none">
                            37/12
                        </span>
					</div>
				</div>

                <div className="h-[2000px] w-full bg-black"></div>
			</Disclosure.Panel>
		</Disclosure>
	);
}
