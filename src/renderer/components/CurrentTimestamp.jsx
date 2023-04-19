import { useState } from "react";

export default function CurrentTimestamp() {
	
    const [timestamp, setTimestamp] = useState(
		new Date().toGMTString().split(" ")[4]
	);

	setInterval(function () {
		setTimestamp(new Date().toGMTString().split(" ")[4]);
	}, 1000);

	return <span>{timestamp}</span>;
}
