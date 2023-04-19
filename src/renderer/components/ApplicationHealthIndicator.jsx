import { useState } from "react";

export default function ApplicationHealthIndicator() {
	const [health, setHealth] = useState(true);

	let classes = "w-2.5 h-2.5 rotate-45 bg-green-500 border animate-pulse-slow cursor-pointer";

	if (health) {
		classes += " bg-green-500";
	} else {
		classes += " bg-red-500";
	}

	return <span className={classes} title={health ? 'All services healthy' : '1 or more services unhealthly'}></span>;
}
