import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map! : L.Map;
  constructor() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.797068, 110.370529], 13); // Set peta di Yogyakarta

    // OSM Base map
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Satellite Base map
    const satellite = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Terrain Base map
    const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
    });

    osm.addTo(this.map); // Default basemap

    // Menambahkan layer control untuk memilih basemap
    L.control.layers({
      "OpenStreetMap": osm,
      "Satellite": satellite,
      "Terrain": terrain
    }).addTo(this.map);

    // Menambahkan beberapa marker museum di Yogyakarta
    const markers: { coords: [number, number], popup: string }[] = [
      { coords: [-7.8056, 110.3649], popup: "<b>Museum Keraton Yogyakarta</b><br>Keraton Kesultanan Yogyakarta." },
      { coords: [-7.8017, 110.3642], popup: "<b>Museum Sonobudoyo</b><br>Museum sejarah dan budaya." },
      { coords: [-7.7939, 110.3695], popup: "<b>Museum Batik Yogyakarta</b><br>Museum khusus untuk seni batik." },
      { coords: [-7.7837, 110.3893], popup: "<b>Museum Affandi</b><br>Museum seni pelukis terkenal, Affandi." },
      { coords: [-7.8226, 110.3939], popup: "<b>Museum De Mata Trick Eye</b><br>Museum seni 3D interaktif." }
    ];

    // Loop untuk menambahkan beberapa marker ke peta
    markers.forEach(markerData => {
      const marker = L.marker(markerData.coords).addTo(this.map); // Tidak perlu konversi
      marker.bindPopup(markerData.popup);
    });
  }
}
