import { useState } from "react";

export default function CurrentDate() {
	const [date, setDate] = useState(
		new Date().toGMTString().split(" ").slice(0, 4).join(" ")
	);

	setInterval(function () {
		setDate(new Date().toGMTString().split(" ").slice(0, 4).join(" "));
	}, 1000 * 60);

	return <span>{date}</span>;
}
