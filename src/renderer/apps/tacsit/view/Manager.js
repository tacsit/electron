import Map from "ol/Map";
import View from "ol/View";

export class Manager {
	constructor(app, map) {
		/**
		 * The main app object
		 */
		this.app = app;

		/**
		 * The map object
		 * @type {Map}
		 */
		this.map = map;

		/**
		 * The view object
		 * @type {View}
		 */
		this.view = null;

		/**
		 * The user configuation
		 * @type {Object}
		 */
		this.defaultConfig = {
			center: [0, 0],
			zoom: 2,
			home: {
				center: [0, 0],
				zoom: 2,
			},
		};
	}

	__boot() {
		this.app.emit("view:booting");

		//

		this.app.emit("view:booted");
	}

	/**
	 * Animate the view to a new center and zoom level
	 *
	 * @param {Array} center
	 * @param {Number} zoom
	 * @param {Number} duration
	 */
	animate(center, zoom, rotation = 0, duration = 1000) {
		this.app.emit("view:animating", this.view);

		this.map.getView().animate({
			zoom: zoom,
			center: center,
			duration: duration,
            rotation: rotation,
		});

		this.app.emit("view:animated", this.view);
	}

	/**
	 * Set the view configuration
	 *
	 * @param {Object} config
	 * @return {void}
	 */
	config(config) {
		this.defaultConfig = Object.assign(this.defaultConfig, config);
	}

	/**
	 * Initialize the view
	 * Set the view to the map
	 *
	 * @return {void}
	 */
	__init() {
		this.app.emit("view:initializing", this.view);

		this.view = new View(this.defaultConfig);

		this.map.setView(this.view);

		this.app.emit("view:initialized", this.view);
	}

	/**
	 * Animate the view to the home position,
	 * which is the center of the map and zoom level 2
	 *
	 * @return {void}
	 */
	home() {
		if (
			this.defaultConfig.home &&
			this.defaultConfig.home.center &&
			this.defaultConfig.home.zoom
		) {
			this.animate(
				this.defaultConfig.home.center,
				this.defaultConfig.home.zoom,
			);
		}

		this.animate([0, 0], 2);
	}
}

export default Manager;
