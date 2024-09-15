// leaflet-heat.d.ts
import * as L from 'leaflet';
import React from "react";

declare module 'leaflet' {
  interface HeatLayerOptions extends L.LayerOptions {
    radius?: number;
    blur?: number;
    max?: number;
    gradient?: { [key: number]: string };
    minOpacity?: number;
    maxZoom?: number;
  }

  class HeatLayer extends L.Layer {
    constructor(latlngs: L.LatLngTuple[], options?: HeatLayerOptions);
    setLatLngs(latlngs: L.LatLngTuple[]): this;
    addLatLng(latlng: L.LatLngTuple): this;
  }

  function heatLayer(latlngs: L.LatLngTuple[], options?: HeatLayerOptions): HeatLayer;
}
