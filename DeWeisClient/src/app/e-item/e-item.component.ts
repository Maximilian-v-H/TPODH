import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Weatherpoint} from 'src/app/weatherpoint';
import {Router} from '@angular/router';

@Component({
    selector: 'app-e-item',
    templateUrl: './e-item.component.html',
    styleUrls: ['./e-item.component.css']
})
export class EItemComponent implements OnInit {

    @Input() public e: string;
    private response: Array<any> | any;
    points: Weatherpoint[] = new Array();
    place:any;
    np:any;
    placeinfo:any;
    constructor(private http: HttpClient, private router:Router) { }

    ngOnInit() {
    }

    fillPoints(obj:Object){
        for(var prop in obj){
            let p = new Weatherpoint(obj[prop]['Id'], obj[prop]['Latitude'], obj[prop]['Longitude']);
            this.points.push(p);

        }
    }

    navigate(lat:number, lng:number){
        console.log(lat);
        this.router.navigate([`/event/${this.e['Latitude']}/${this.e['Longitude']}`]);
    }

    getNearestPoint(lat:number, lng:number){
        let la = new Array();
        let ln = new Array();
        for(var prop in this.points){
            la.push(this.points[prop]['lat']);
            ln.push(this.points[prop]['lng']);
        }
        var closela = la.reduce(function(prev, curr) {
            return (Math.abs(curr - lat) < Math.abs(prev - lat) ? curr : prev);
        });
        var closeln = ln.reduce(function(prev, curr) {
            return (Math.abs(curr - lng) < Math.abs(prev - lng) ? curr : prev);
        });
        let enenene;
        for(var p in this.points){
            if(this.points[p]['lat'] == closela){
                for(var h in this.points){
                    if(this.points[h]['lng'] == closeln){
                        enenene = this.points[h]['id'];
                        break;
                    }else{
                        enenene = this.points[p]['id'];
                    }
                }
            }
        }
        return enenene;
    }

    something(lat:number, lng:number){
        if(this.points.length != 0){
            this.http.get("http://tourism.opendatahub.bz.it/api/Weather/Measuringpoint?elements=0"
                         ).subscribe(
                         data => {
                             console.log(data);
                             this.fillPoints(data);
                         })
        }
        this.np = this.getNearestPoint(lat, lng);
        this.http.get(`http://tourism.opendatahub.bz.it/api/Weather/Measuringpoint/${this.place}`
                     ).subscribe(
        data => {
            this.http.get(data['LocationInfo']['RegionInfo']['Self']
                         ).subscribe(
                         data => {
                             this.placeinfo = data;
                             console.log(data);
                         })
        })
    }
}
