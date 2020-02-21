import {Component, OnInit, Input} from '@angular/core';
import {LatLng, latLng, LeafletEvent, TileLayer, tileLayer, Map} from "leaflet";
import {HttpClient} from '@angular/common/http';
import {Weather} from '../weather';
import {Globals} from 'src/app/globals';
import {Weatherpoint} from 'src/app/weatherpoint';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    options: { center: LatLng; layers: TileLayer[]; zoom: number };
    coordinates: LatLng;
    weather: Weather = null;
    weat: any = null;
    bounds = [[46.22165245637913, 10.373840332031252],[47.1075227853425, 12.62054443359375]];
    globals:Globals;
    showSlide:boolean = false;


    skiyes:boolean = false;
    weathpoint;
    images: string[] = new Array();
    points: Weatherpoint[] = new Array();

    southtyrol:Object;
    constructor(private http: HttpClient, globals:Globals) {
        this.globals = globals;
    }

    ngOnInit() {
        this.http.post("http://tourism.opendatahub.bz.it/token", "password");

        /*this.http.get<Weather>("http://tourism.opendatahub.bz.it/api/Weather?language=en").subscribe(data => {
          this.weather = data;
          console.log(data);
          });*/
        this.options = {
            layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
            ],
            zoom: 5,
            center: latLng( 46.498295, 11.354758)
        };

        console.log(this.options.center)

        this.http.get("http://tourism.opendatahub.bz.it/api/Weather/Measuringpoint?elements=0"
                     ).subscribe(
                     data => {
                         console.log(data);
                         this.fillPoints(data);
                     })
    }

    toggleSki(id:number){
        if(this.globals.ski == id){
            this.skiyes = this.skiyes == true ? false : true;
        }else{
            this.http.get(this.weathpoint['SkiAreas'][id]['Self']
                         ).subscribe(
                            data => {
                                this.globals.skiplace = data;
                            })
            this.globals.ski = id;
        }
    }

    fillPoints(obj:Object){
        // obj.forEach(function(value) {
        //     let p = new Weatherpoint(value['id'], value['Latitude'], value['Longitude']);
        //     this.points.push(p);
        // })
        for(var prop in obj){
            let p = new Weatherpoint(obj[prop]['Id'], obj[prop]['Latitude'], obj[prop]['Longitude']);
            this.points.push(p);

        }
    }

    getNearestPoint(lat:number, lng:number){
        //var skinName = skins.find(x=>x.Id == "1").Name;
        let la = new Array();
        let ln = new Array();
        for(var prop in this.points){
            la.push(this.points[prop]['lat']);
            ln.push(this.points[prop]['lng']);
        }
        console.log(la);
        var closela = la.reduce(function(prev, curr) {
            return (Math.abs(curr - lat) < Math.abs(prev - lat) ? curr : prev);
        });
        console.log(closela);

        var closeln = ln.reduce(function(prev, curr) {
            return (Math.abs(curr - lng) < Math.abs(prev - lng) ? curr : prev);
        });
        console.log(closeln);
        // let f = this.points.find(x=>x.lat == closela)['id'];
        // let d = this.points.find(x=>x.lng == closeln)['id'];
        // if(d == f){
        //     return d;
        // }else{
        //     return f;
        // }
        let enenene;
        for(var p in this.points){
            if(this.points[p]['lat'] == closela){
                for(var h in this.points){
                    if(this.points[h]['lng'] == closeln){
                        enenene = this.points[h]['id'];
                        console.log(enenene);
                        break;
                    }else{
                        enenene = this.points[p]['id'];
                    }
                }
            }
        }
        return enenene;
    }

    onMapReady(map: Map){

    }

    newCoordinates($event: LeafletEvent) {
        this.coordinates = $event['latlng'];
        console.log($event['latlng']);
        this.http.get("https://mobility.api.opendatahub.bz.it/v2/api/flat/MeteoStation?limit=5&offset=0&where=sactive.eq.true,scoordinate.bbc.(" + $event['latlng'].lat + "," + $event['latlng'].lng + ",12,46.795)&shownull=false&distinct=true").subscribe(data => {
                      console.log(data),
        this.weat = data
    })
    this.globals.lat = $event['latlng'].lat;
    this.globals.lng = $event['latlng'].lng;
    this.globals.weathid = this.getNearestPoint($event['latlng'].lat, $event['latlng'].lng);
    console.log(this.globals.weathid);

    this.http.get(`http://tourism.opendatahub.bz.it/api/Weather/Measuringpoint/${this.globals.weathid}`
                 ).subscribe(
    data => {
        this.http.get(data['LocationInfo']['RegionInfo']['Self']
                     ).subscribe(
                     data => {
                         this.weathpoint = data;
                         console.log(data);
                     })
    })
}

clear(){
    this.globals.weathid = null;
    this.globals.ski = null;
    this.globals.skiplace = null;
    this.skiyes = false;
}

getDate(s:string){
    return s.substring(0, 10);
}

getImages(obj:Object){
    this.images = new Array();
    this.images.push(obj['Conditions'][0]['WeatherImgurl']);
    this.images.push(obj['Conditions'][1]['WeatherImgurl']);
    // this.images.push(obj['Forecast'][0]['WeatherImgurl']);
    // this.images.push(obj['Forecast'][1]['WeatherImgurl']);
    // this.images.push(obj['Forecast'][2]['WeatherImgurl']);
    // this.images.push(obj['Forecast'][3]['WeatherImgurl']);
    console.log(this.images);
}

getSouthTyrol(){
    console.log("pressed");
    this.showSlide = this.showSlide == true ? false : true;
    this.http.get("http://tourism.opendatahub.bz.it/api/Weather?language=en"
                 ).subscribe(
                 data => {
                     this.southtyrol = data; 
                     this.globals.south = data; 
                     console.log(data)
                     this.getImages(data);
                 })
}
}
