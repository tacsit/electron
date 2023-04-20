import { useState, useEffect } from "react";

export default function CurrentTimestamp() {
	const [timestamp, setTimestamp] = useState(
		new Date().toGMTString().split(" ")[4]
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimestamp(new Date().toGMTString().split(" ")[4]);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return <span>{timestamp}</span>;
}
