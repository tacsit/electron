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

        this.target = null;

		/**
		 * The control object
		 *
		 * @type {MousePosition}
		 * @private
		 */
		this.control = null;

		this.defaultConfig = {
			className: "class-tacsit-mouse-position",
			target: "tacsit-mouse-position",
		};
	}

	/**
	 * @private
	 * @return {void}
	 */
	__boot() {
		this.app.emit("coordinates:booting");

        this.target = document.getElementById(this.defaultConfig.target);

        this.control = new MousePosition({
			coordinateFormat: toStringHDMS,
            className: '',
			target: this.target,
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

        this.map.removeControl(this.control)

        // check if the target already has a child element, if so, remove it, 
        // otherwise the control will render the placeholder text twice, when 
        // in development mode due to react's useEffect hook.
        if (this.target.firstChild) {
            this.target.removeChild(this.target.firstChild);
        }

        this.map.addControl(this.control);

		this.app.emit("coordinates:initialized");
	}

	config(config) {
		this.defaultConfig = Object.assign(this.defaultConfig, config);
	}
}

export default Manager;
