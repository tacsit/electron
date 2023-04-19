import { Menu } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserDropdown() {
	return (
		<Menu>
			<Menu.Button>
				<div className="flex items-center justify-center h-12 px-2 space-x-1 font-mono border-l border-gray-700 select-none sm:px-4 sm:space-x-2">
					<UserCircleIcon className="w-6 h-6 text-gray-500 stroke-current sm:hidden" />
					<p className="truncate max-w-[135px] hidden sm:block">
						Wyatt Castaneda
					</p>
					<span>
						<ChevronDownIcon className="w-4 h-4 text-gray-500 stroke-current ui-open:rotate-180" />
					</span>
				</div>
			</Menu.Button>
			<Menu.Items className="absolute left-0 -bottom bg-black py-1.5 border border-t-0 border-gray-700 w-56 z-50 focus:outline-none">
				<Menu.Item className="block px-4 py-1.5">
					{({ active }) => (
						<button
							className={`${active && "bg-gray-900 ring"} w-full text-left`}
						>
							Logout
						</button>
					)}
				</Menu.Item>
			</Menu.Items>
		</Menu>
	);
}
