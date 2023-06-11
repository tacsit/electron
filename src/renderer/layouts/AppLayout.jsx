import {
	CameraIcon,
	ChatBubbleLeftEllipsisIcon,
	GlobeAltIcon,
	MapIcon,
} from "@heroicons/react/24/outline";
import CurrentDate from "../components/CurrentDate";
import UserDropdown from "../components/UserDropdown";
import CurrentTimestamp from "../components/CurrentTimestamp";
import ApplicationHealthIndicator from "../components/ApplicationHealthIndicator";

export default function AppLayout({ children }) {
	return (
		<div className="flex flex-col w-full h-screen overflow-hidden bg-black selection:bg-gray-500">
			{/* App Main Header, will contain 1) main app status icon, 2) user profile dropdown, 3) time */}
			<header className="flex items-center justify-between w-full h-12 text-sm text-white bg-black border-gray-700 border-y">
				{/* App Main Status Indicator */}
				<div className="flex items-center justify-center w-12 h-12 min-w-[3rem] flex-shrink-0 border-gray-700 select-none border-x focus:outline-none focus:bg-gray-900">
					<ApplicationHealthIndicator />
				</div>

				<div className="flex items-center h-12">
					{/* App Main User Dropdown */}
					<div className="relative">
						{/* <UserDropdown /> */}
					</div>

					{/* App Main Timestamp */}
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
				<nav className="flex flex-col items-center justify-between w-12 text-white border-r border-gray-700">
					<div className="w-full">
						<a href="/"
							className="flex items-center justify-center w-full h-12 text-gray-400 border-b border-gray-700 hover:bg-gray-900"
							title="2D Map View"
						>
							<MapIcon className="w-5 h-5 stroke-current" />
						</a>
						<button
							className="flex items-center justify-center w-full h-12 text-gray-400 border-b border-gray-700 hover:bg-gray-900"
							title="3D Map View"
						>
							<GlobeAltIcon className="w-5 h-5 stroke-current" />
						</button>
						<button
							className="flex items-center justify-center w-full h-12 text-gray-400 border-b border-gray-700 hover:bg-gray-900"
							title="Open chat"
						>
							<ChatBubbleLeftEllipsisIcon className="w-5 h-5 stroke-current" />
						</button>
					</div>

					<button className="flex items-center justify-center w-full h-12 text-gray-400 border-gray-700 border-y hover:bg-gray-900">
						<CameraIcon className="w-5 h-5 stroke-current" />
					</button>
				</nav>

				<section className="flex flex-col flex-1 overflow-hidden">
					{children}
				</section>
			</div>
		</div>
	);
}
