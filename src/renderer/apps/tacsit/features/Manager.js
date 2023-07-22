import Map from "ol/Map";
import hotkeys from "hotkeys-js";
import Tacsit from "./../Tacsit";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Draw, Modify, Snap } from "ol/interaction";

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
         * The VectorSource
         * @type {VectorSource}
         */
        this.vectorSource = null;

        /**
         * The VectorLayer
         * @type {VectorLayer}
         */
        this.VectorLayer = null;

        /**
         * The Modify interaction
         * @type {Modify}
         */ 
        this.modifyInteraction = null;

        /**
         * The Snap interaction
         * @type {Snap}
         */
        this.snapInteraction = null;
	}

	__boot() {
		this.app.emit("features:booting");

        this.vectorSource = new VectorSource();

        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: {
                "stroke-width": 2,
            },
        });

        this.modifyInteraction = new Modify({
            source: this.vectorSource,
        });

        this.modifyInteraction.setActive(false);

        this.snapInteraction = new Snap({
            source: this.vectorSource,
        });

		this.app.emit("features:booted");
	}

	/**
	 * @return {void}
	 */
	__init() {
		this.app.emit("features:initializing");

		this.map.addLayer(this.vectorLayer);
		this.map.addInteraction(this.modifyInteraction);
        this.map.addInteraction(this.snapInteraction);

		let draw = new Draw({
			source: this.vectorSource,
			type: "Polygon",
		});

		this.map.addInteraction(draw);

		hotkeys("esc", (event, handler) => {
			event.preventDefault();
            draw.abortDrawing();
            draw.setActive(false);
            this.map.removeInteraction(draw);
		});

        hotkeys("ctrl+e", (event, handler) => {
            event.preventDefault();
            if(this.modifyInteraction.getActive()) {
                this.modifyInteraction.setActive(false);
            } else {
                this.modifyInteraction.setActive(true);
            }
        });

        draw.on("drawend", (event) => {
            draw.setActive(false);
            this.map.removeInteraction(draw);
        });

        // when a point is double clicked, remove the point from the drawing
        this.map.on("dblclick", (event) => {
            // get the feature that was clicked
            let feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
                return feature;
            });

            // find the nearest point to the clicked point
            let closestPoint = feature.getGeometry().getClosestPoint(event.coordinate);

            // remove the point from the feature
            feature.getGeometry().removePoint(closestPoint);

            // if the feature has less than 3 points, remove it from the map
            if(feature.getGeometry().getCoordinates()[0].length < 3) {
                this.vectorSource.removeFeature(feature);
            }

            // re-render the map
            this.map.render();
        });

		this.app.emit("features:initialized");
	}
}

export default Manager;
