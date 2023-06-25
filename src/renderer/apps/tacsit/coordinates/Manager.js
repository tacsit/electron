import Map from "ol/Map";
import Tacsit from "../Tacsit";
import { toStringHDMS, createStringXY } from "ol/coordinate.js";
import MousePosition from "ol/control/MousePosition.js";

export class Manager {
	constructor(app, map) {
		/**
		 * The main app object
		 * @type {Tacsit}
		 */
		this.app = app;

		/**
		 * The map object
		 * @type {Map}
		 */
		this.map = map;

		/**
		 * The control object
		 *
		 * @type {MousePosition}
		 * @private
		 */
		this.control = null;

		this.defaultConfig = {
			className: "tacsit-mouse-position",
			target: "tacsit-mouse-position",
		};
	}

	/**
	 * @private
	 * @return {void}
	 */
	__boot() {
		this.app.emit("coordinates:booting");

		this.control = new MousePosition({
			coordinateFormat: toStringHDMS,
            className: this.defaultConfig.className,
			target: document.getElementById(this.defaultConfig.target),
            placeholder: 'Place cursor on map.'
		});

		this.app.emit("coordinates:booted");
	}

	/**
	 * @private
	 * @return {void}
	 */
	__init() {
		this.app.emit("coordinates:initializing");

        this.map.getControls().getArray().forEach((control) => {
            if (control instanceof MousePosition) {
                this.map.removeControl(control);
            }
        });

        this.map.addControl(this.control);

		this.app.emit("coordinates:initialized");
	}

	config(config) {
		this.defaultConfig = Object.assign(this.defaultConfig, config);
	}
}

export default Manager;
