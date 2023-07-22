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

		hotkeys("ctrl+e", (event, handler) => {
			event.preventDefault();
			if (this.modifyInteraction.getActive()) {
				this.modifyInteraction.setActive(false);
				this.app.emit("features:modify:disabled");
			} else {
				this.modifyInteraction.setActive(true);
				this.app.emit("features:modify:enabled");
			}
		});

		this.app.emit("features:initialized");
	}

	enableModifyInteraction() {
		this.modifyInteraction.setActive(true);
        this.snapInteraction.setActive(true);
	}

	disableModifyInteraction() {
		this.modifyInteraction.setActive(false);
        this.snapInteraction.setActive(false);
	}

	startDrawing(geometryType, options = {}) {
		let lookup = {
			point: "Point",
			line: "LineString",
			polyline: "LineString",
			polygon: "Polygon",
			circle: "Circle",
		};

		geometryType = lookup[geometryType];

		this.draw = new Draw({
			source: this.vectorSource,
			type: geometryType,
		});

		this.map.addInteraction(this.draw);
        this.snapInteraction.setActive(true);

		hotkeys("esc", (event, handler) => {
			event.preventDefault();
			this.draw.abortDrawing();
			this.draw.setActive(false);
			this.map.removeInteraction(this.draw);
            this.app.emit("features:drawend", event);
            this.snapInteraction.setActive(false);
		});

		this.draw.on("drawend", (event) => {
			this.draw.setActive(false);
			this.map.removeInteraction(this.draw);
            this.app.emit("features:drawend", event);
            this.snapInteraction.setActive(false);
		});
	}

    stopDrawing() {
        if (this.draw) {
            this.draw.abortDrawing();
            this.draw.setActive(false);
            this.map.removeInteraction(this.draw);
        }
    }
}

export default Manager;
