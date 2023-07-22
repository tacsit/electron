import Map from "ol/Map";
import { useGeographic } from "ol/proj";
import ViewManager from "./view/Manager";
import LayersManager from "./layers/Manager";
import FiltersManager from "./filters/Manager";
import BasemapManager from "./basemaps/Manager";
import FeaturesManager from "./features/Manager";
import CoordinatesManager from "./coordinates/Manager";
import KeybindingsManager from "./keybindings/Manager";
import { defaults as defaultInteractions } from "ol/interaction.js";

class Tacsit {
	constructor(target, controls = [], layers = [], interactions = []) {
		/**
		 * Has the map been booted
		 *
		 * @type {Boolean}
		 */
		this.isBooted = false;

		/**
		 * Has the map been initialized
		 *
		 * @type {Boolean}
		 */
		this.isInitialized = false;

		/**
		 * Has the map been mounted
		 *
		 * @type {Boolean}
		 */
		this.isMounted = false;

		/**
		 * The target element to render the map into
		 * We expect the argument to be a valid HTMLElement or a valid selector
		 * Which we will use to query the DOM for the target element
		 * If the target is not a valid HTMLElement or a valid selector, we throw an error
		 *
		 * @type {HTMLElement}
		 */
		this.target = null;

		// check if target is a valid HTMLElement
		if (target instanceof HTMLElement) {
			this.target = target;
		} else {
			// check if target is a valid selector
			if (typeof target === "string") {
				this.target = document.querySelector(target);
			} else {
				// if target is not a valid selector, throw an error
				throw new Error(`Invalid target: ${target}`);
			}
		}

		/**
		 * The openlayers map object
		 *
		 * @type {Map}
		 */
		this.map = null;

		/**
		 * The managers
		 *
		 * @type {Object}
		 * @private
		 */
		this.managers = null;

		/**
		 * The view manager
		 *
		 * @type {ViewManager}
		 */
		this.view = null;

		/**
		 * The basemap manager
		 *
		 * @type {BasemapManager}
		 */
		this.basemaps = null;

		/**
		 * The layers manager
		 *
		 * @type {LayersManager}
		 */
		this.layers = null;

		/**
		 * The keybindings manager
		 *
		 * @type {KeybindingsManager}
		 */
		this.keybindings = null;

		/**
		 * The filters manager
		 *
		 * @type {FiltersManager}
		 */
		this.filters = null;

        /**
         * The coordinates manager
         * 
         * @type {CoordinatesManager}
         */
        this.coordinates = null;

		this.__boot(controls, layers, interactions);
	}

	/**
	 * Boot the map
	 *
	 * @fires map:booted
	 * @fires managers:booting
	 * @fires managers:booted
	 * @param {Array} controls
	 * @param {Array} layers
	 * @param {Object} interactions
	 * @returns {void}
	 * @private
	 */
	__boot(controls, layers, interactions) {
		useGeographic();

		// create the map
		this.map = new Map({
			controls: [...controls],
			layers: [...layers],
			interactions: defaultInteractions({
				doubleClickZoom: false,
				...interactions,
			}),
			maxTilesLoading: 32,
		});

		this.emit("map:booted", this.map);

		// // create the managers
		this.managers = {
			view: new ViewManager(this, this.map),
			filters: new FiltersManager(this, this.map),
			basemaps: new BasemapManager(this, this.map),
			layers: new LayersManager(this, this.map),
			keybindings: new KeybindingsManager(this, this.map),
			coordinates: new CoordinatesManager(this, this.map),
            features: new FeaturesManager(this, this.map),
		};

		this.emit("managers:booting");

		for (let manager in this.managers) {
			// create a reference to the manager on the Tacsit object using the manager name
			this[manager] = this.managers[manager];

			// boot the manager
			this.managers[manager].__boot();
		}

		this.emit("managers:booted");

		this.isBooted = true;
	}

	/**
	 * Initialize the map
	 *
	 * @fires map:initializing
	 * @fires map:initialized
	 * @returns {void}
	 * @private
	 */
	__init() {
		this.emit("map:initializing", this.map);

		// spin through the managers and initialize them
		for (let manager in this.managers) {
			this.managers[manager].__init();
		}

		this.emit("map:initialized", this.map);
	}

	/**
	 * Emit an event
	 *
	 * @param {String} event
	 * @param {Object} data
	 * @returns {void}
	 */
	emit(event, data = {}) {
		this.map.dispatchEvent({
			type: event,
			data: data,
		});

		// console.log(`Event emitted: ${event}`);
	}

	getCurrentCenter() {
		return this.view.view.getCenter();
	}

	getCurrentZoom() {
		return this.view.view.getZoom();
	}

	/**
	 * Check if the map is mounted
	 *
	 * @returns {Boolean}
	 */
	isCurrentlyMounted() {
		return this.isMounted;
	}

	/**
	 * Mount the map to the DOM
	 *
	 * @fires map:mounting
	 * @fires map:mounted
	 * @returns {void}
	 */
	mount() {
		this.__init();

		this.emit("map:mounting");

		this.map.setTarget(this.target);

		this.isMounted = true;

		this.emit("map:mounted");
	}

	/**
	 * Add an event listener to the map
	 *
	 * @param {String} event
	 * @param {Function} callback
	 * @returns {void}
	 */
	on(event, callback) {
		this.map.on(event, callback);
	}

	/**
	 * Add an event listener to the map that will only fire once
	 *
	 * @param {String} event
	 * @param {Function} callback
	 * @returns {void}
	 */
	once(event, callback) {
		this.map.once(event, callback);
	}

	/**
	 * Remove the map from the DOM
	 *
	 * @fires map:unmounting
	 * @fires map:unmounted
	 * @returns {void}
	 */
	unmount() {
		this.emit("map:unmounting");

		this.map.setTarget(undefined);

		this.isMounted = false;

		this.emit("map:unmounted");
	}
}

export default Tacsit;

/**
 * Create a new Tacsit instance
 *
 * @param {HTMLElement|String} target
 * @param {Array} controls
 * @param {Array} layers
 * @param {Array} interactions
 * @returns {Tacsit}
 */
export function createTacsit(
	target,
	controls = [],
	layers = [],
	interactions = []
) {
	return new Tacsit(target, controls, layers, interactions);
}
