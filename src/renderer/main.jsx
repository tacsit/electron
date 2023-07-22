import "./shared/app.css";
import React from "react";
import Map from "./pages/Map";
import SecondaryMap from "./pages/SecondaryMap";
import ReactDOM from "react-dom/client";

// if the url is the root then show the map
if (window.location.pathname === "/") {
	ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<Map />
		</React.StrictMode>
	);
}

// if the url is /secondary then show the secondary map
if (window.location.pathname === "/secondary") {
	ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<SecondaryMap />
		</React.StrictMode>
	);
}
