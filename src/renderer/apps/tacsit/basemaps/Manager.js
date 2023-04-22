import Map from "ol/Map";
import Tacsit from './../Tacsit';
import SatelliteProvider from "./Satellite";
import StamenTonerProvider from "./StamenToner";
import TopographicProvider from "./Topographic";
import StamenTerrainProvider from "./StamenTerrain";
import OpenStreetMapProvider from "./OpenStreetMap";

class Manager {
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
		 * The currently active basemap
		 * @type {Object}
		 */
		this.currentBasemap = null;

		/**
		 * The currently selected basemap that is not active
		 * but will be activated
		 */
		this.currentlySelectedBasemap = null;

		/**
		 * The available basemaps
		 *
		 * @type {Object}
		 */
		this.basemaps = {
            
			osm: {
				class: OpenStreetMapProvider,
				label: OpenStreetMapProvider.getLabel(),
			},
            satellite: {
                class: SatelliteProvider,
                label: SatelliteProvider.getLabel(),
            },
            terrain: {
                class: StamenTerrainProvider,
                label: StamenTerrainProvider.getLabel(),
            },
            topographic: {
                class: TopographicProvider,
                label: TopographicProvider.getLabel(),
            },            
            toner: {
                class: StamenTonerProvider,
                label: StamenTonerProvider.getLabel(),
            },
            default: {
                class: OpenStreetMapProvider,
                label: OpenStreetMapProvider.getLabel(),
            }
		};

        this.defaultConfig = {
            default: 'default',
        };
	}

	__boot() {
		this.app.emit("basemaps:booting");

		// want to find all basemaps in the basemaps folder, that way we can add new basemaps without having to change the code
		// and we can also remove basemaps without having to change the code
		// and the developer can add their own basemaps without having to change the code
		// this is a feature that is not currently supported by Tacsit

		this.app.emit("basemaps:booted");
	}

    config(config) {
        this.defaultConfig = Object.assign(this.defaultConfig, config);
    }

	__init() {
		this.app.emit("basemaps:initializing");

		this.switchToBasemap(this.defaultConfig.default);

		this.app.emit("basemaps:initialized");
	}

    /**
     * Switches the basemap to the one specified
     * @param {String} basemap The name of the basemap to switch to
     * @returns {void}
     * @fires basemaps:switching
     * @fires basemaps:switched
     */
    switchToBasemap(basemap) {
        this.app.emit("basemaps:switching", basemap);

        if (!this.basemaps[basemap]) {
            this.currentlySelectedBasemap = 'default';
        } else {
            this.currentlySelectedBasemap = basemap;
        }        

        this.map.removeLayer(this.currentBasemap);

        this.currentBasemap = this.basemaps[this.currentlySelectedBasemap].class.getTileLayer();

        this.map.getLayers().insertAt(0, this.currentBasemap);

        this.app.emit("basemaps:switched", basemap);
    }    

    /**
     * @returns {Object} An object with the basemap name as the key and the basemap label as the value
     */
    getBasemapsHandlersAndLabels() {
        let basemaps = {};

        for (let basemap in this.basemaps) {
            basemaps[basemap] = this.basemaps[basemap].label;
        }

        return basemaps;
    }
}

export default Manager;
