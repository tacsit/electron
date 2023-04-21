import Map from 'ol/Map';
import Tacsit from './../Tacsit';
import TileDebugLayer from './Debug';
import PoliticalBoundaries from './PoliticalBoundries';

class Manager {
    constructor(app, map) {
        /**
		 * The main app object
         * @type {Tacsit}
		 */
		this.app = app;

        /**
         * The map instance
         * @type {Map}
         */
        this.map = map;

        /**
         * The available layers
         * 
         * @type {Object}
         */
        this.layers = {
            political: {
                class: PoliticalBoundaries,
                label: PoliticalBoundaries.getLabel(),
            },
            debug: {
                class: TileDebugLayer,
                label: TileDebugLayer.getLabel(),
            },
        };

        /**
         * The currently active layers
         * The key is the layer name and the value is the layer object
         * 
         * @type {Object}
         */
        this.activeLayers = {};

        this.defaultConfig = {
            //
        }
    }

    __boot() {
        this.app.emit("layers:booting");

        // todo ... 

        this.app.emit("layers:booted");
    }

    config(config) {
        this.defaultConfig = Object.assign(this.defaultConfig, config);
    }

    __init() {
        this.app.emit("layers:initializing");

        // check if there are any layers to activate by default
        if (this.defaultConfig.default) {
            for (let layer of this.defaultConfig.default) {
                this.activate(layer);
            }
        } 
        
        this.app.emit("layers:initialized");
    }

    activate(layer) {

        // check if the layers exists in the available layers
        if (!this.layers[layer]) {
            return;
        }

        // check if the layer is already active
        if (this.activeLayers[layer]) {
            return;
        }

        this.app.emit("layers:activating", layer);

        let layerObj = this.layers[layer].class.getTileLayer();
        
        this.map.addLayer(layerObj);
        
        this.activeLayers[layer] = layerObj;

        this.app.emit("layers:activated", layer);
    }

    deactivate(layer) {

        // check if the layer exists in the active layers
        if (!this.activeLayers[layer]) {
            return;
        }

        this.app.emit("layers:deactivating", layer);

        this.map.removeLayer(this.activeLayers[layer]);

        // remove the layer from the active layers
        delete this.activeLayers[layer];

        this.app.emit("layers:deactivated", layer);
    }

    toggle(layer) {

        // check if the layer exists
        if (!this.layers[layer]) {
            return;
        }
        
        // check if the layer is active
        if (this.activeLayers[layer]) {
            this.deactivate(layer);
        } else {
            this.activate(layer);
        }
    }

    /**
     * Get the available layers
     * 
     * @returns {Object} The available layers
     */
    getLayerHandlersAndLabels() {
        let layers = {};

        for (let layer in this.layers) {
            layers[layer] = this.layers[layer].label;
        }

        return layers;
    }

    /**
     * Get the active layers
     * 
     * @returns {Array} The active layers
     */
    getActiveLayers() {
        return Object.keys(this.activeLayers);
    }    
}

export default Manager;