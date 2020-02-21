export class Event {
    lat:number;
    lng:number;
    nameinput: string;
    constructor(public TotalResults: number = 0,
                public TotalPages: number = 0,
                public CurrentPage: number = 0,
                public Seed: any = null,
                public Items: any = null) { 
                }

                filterItemsByName(){
                    if(this.nameinput == null || this.nameinput == "")
                        return this.Items;
                    else
                        return this.Items.filter(
                            i => i['Shortname'].toString().toLowerCase().search(this.nameinput.toLowerCase()) >= 0
                        );
                }

                getCoordinates(obj:Object){
                    this.lat = obj['Latitude'];
                    this.lng = obj['Longitude'];
                }
                setName(n:string){
                    this.nameinput = n;
                }
                static convert(obj:Object): Event{
                    return new Event(obj['TotalResults'], obj['TotalPages'], obj['CurrentPage'], obj['Seed'], obj['Items']);
                }
}
