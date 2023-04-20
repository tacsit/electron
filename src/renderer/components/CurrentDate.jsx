import { useState, useEffect } from "react";

export default function CurrentDate() {
	const [date, setDate] = useState(
		new Date().toGMTString().split(" ").slice(0, 4).join(" ")
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDate(new Date().toGMTString().split(" ").slice(0, 4).join(" "));
		}, 1000 * 60);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return <span>{date}</span>;
}
