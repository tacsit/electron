import Map from "ol/Map";
import Tacsit from "../Tacsit";

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
		 * The target element
		 * @type {HTMLElement}
		 */
		this.target = app.target;

		/**
		 * The current brightness percentage
		 *
		 * @type {Number}
		 * @default 100
		 * @min 0
		 * @max 200
		 * @private
		 */
		this.brightness = 100;

		/**
		 * The current blur amount in pixels
		 *
		 * @type {Number}
		 * @default 0
		 * @min 0
		 * @max 100
		 * @private
		 */
		this.blur = 0;

		/**
		 * The current contrast percentage
		 *
		 * @type {Number}
		 * @default 100
		 * @min 0
		 * @max 200
		 * @private
		 */
		this.contrast = 100;

		/**
		 * The current grayscale percentage
		 *
		 * @type {Number}
		 * @default 0
		 * @min 0
		 * @max 100
		 * @private
		 */
		this.grayscale = 0;

		/**
		 * The current hue rotate amount in degrees
		 *
		 * @type {Number}
		 * @default 0
		 * @min 0
		 * @max 100
		 * @private
		 */
		this.hueRotate = 0;

		/**
		 * The current invert percentage
		 *
		 * @type {Number}
		 * @default 0
		 * @min 0
		 * @max 100
		 * @private
		 */
		this.invert = 0;

		/**
		 * The current saturation percentage
		 *
		 * @type {Number}
		 * @default 100
		 * @min 0
		 * @max 200
		 * @private
		 */
		this.saturation = 100;

		/**
		 * The current sepia percentage
		 *
		 * @type {Number}
		 * @default 0
		 * @min 0
		 * @max 100
		 * @private
		 */
		this.sepia = 0;
	}

	/**
	 * @private
	 * @return {void}
	 */
	__boot() {
		this.app.emit("filters:booting");

		this.app.emit("filters:booted");
	}

	/**
	 * @private
	 * @return {void}
	 */
	__init() {
		this.app.emit("filters:initializing");
        
		this.applyFilters();

		this.app.emit("filters:initialized");
	}

	applyFilters() {
		this.app.emit("filters:applying");

		this.target.style.clipPath = "inset(0 0 0 0)";
		this.target.style.filter = `brightness(${this.brightness}%) blur(${this.blur}px) contrast(${this.contrast}%) grayscale(${this.grayscale}%) hue-rotate(${this.hueRotate}deg) invert(${this.invert}%) saturate(${this.saturation}%) sepia(${this.sepia}%)`;

		this.app.emit("filters:applied");
	}

	resetFilters() {
		this.app.emit("filters:resetting");

		this.target.style.clipPath = "inset(0 0 0 0)";
		this.target.style.filter = `brightness(100%) blur(0px) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%) sepia(0%)`;

		this.app.emit("filters:reset");
	}

	/**
	 * Set the brightness percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setBrightness(value) {
		this.brightness = value;

		this.applyFilters();
	}

	/**
	 * Set the blur amount in pixels
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setBlur(value) {
		this.blur = value;

		this.applyFilters();
	}

	/**
	 * Set the contrast percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setContrast(value) {
		this.contrast = value;

		this.applyFilters();
	}

	/**
	 * Set the grayscale percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setGrayscale(value) {
		this.grayscale = value;

		this.applyFilters();
	}

	/**
	 * Set the hue rotate amount in degrees
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setHueRotate(value) {
		this.hueRotate = value;

		this.applyFilters();
	}

	/**
	 * Set the invert percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setInvert(value) {
		this.invert = value;

		this.applyFilters();
	}

	/**
	 * Set the saturation percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setSaturation(value) {
		this.saturation = value;

		this.applyFilters();
	}

	/**
	 * Set the sepia percentage
	 *
	 * @param {Number} value
	 * @return {void}
	 */
	setSepia(value) {
		this.sepia = value;

		this.applyFilters();
	}
}

export default Manager;
