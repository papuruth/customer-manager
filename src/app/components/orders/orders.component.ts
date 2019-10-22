import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let ol: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  customerData: any;
  customerDetailsView = false;
  customerOrdersView = true;
  lat: number;
  lon: number;
  map: any;

  constructor(private router: Router) {
    this.customerData = this.router.getCurrentNavigation().extras.state.dataCustomer[0];
    this.lat = this.customerData.location ? Number(this.customerData.location.lat) : 28.5086695;
    this.lon = this.customerData.location ? Number(this.customerData.location.lon) : 77.0922279;
  }

  ngOnInit() {
    // Marker Config
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([this.lon, this.lat])),
      name: 'UV'
    });

    // specific style for that one point
    iconFeature.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png',
      })
    }));

    const iconLayerSource = new ol.source.Vector({
      features: [iconFeature]
    });

    const iconLayer = new ol.layer.Vector({
      source: iconLayerSource
    });

    // Map init
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        iconLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.lon, this.lat]),
        zoom: 15
      })
    });
    document.getElementById('map').style.display = 'none';
  }

  viewChanger(event: any) {
    const id = event.target.id;
    if (id === 'customerDetailsView') {
      document.getElementById('map').style.display = 'block';
      document.getElementById(id).style.color = '#000';
      document.getElementById('customerOrdersView').style.color = '';
      this.customerOrdersView = false;
      this.customerDetailsView = true;
    } else {
      document.getElementById('map').style.display = 'none';
      document.getElementById('customerDetailsView').style.color = '';
      document.getElementById(id).style.color = '#000';
      this.customerDetailsView = false;
      this.customerOrdersView = true;
    }
  }
}
