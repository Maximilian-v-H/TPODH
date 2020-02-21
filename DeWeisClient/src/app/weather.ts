export class AccessTokenDto {
  expireDate: number;
  //The limit of validity of the token.
  token: string;
  //The token to be used in API calls needing authentication.
}

export class JwtTokenDto {
  accessToken: AccessTokenDto[];
  refreshToken: string;
}

export class SlimRecordDto {
  created_on: number;
  period: number;
  timestamp: number;
  value: {}
}

export class StationDto {
  coordinateReferenceSystem: string;
  elevation: number;
  id: string;
  //The unique ID associated to the station.
  latitude: number;
  //The latitude where this station is located.
  longitude: number;
  //The longitude where this station is located.
  name: string;
  //The name of the station
  origin: string;
  parentStation: string;
  stationType: string;
  //The type of station
}

export class Weather {
weather: object = {
  "Id": 0,
  "date": "2020-01-22T15:22:57.743Z",
  "evolutiontitle": "string",
  "evolution": "string",
  "Conditions": [
    {
      "date": "2020-01-22T15:22:57.743Z",
      "Title": "string",
      "WeatherCondition": "string",
      "WeatherImgurl": "string",
      "Temperatures": "string",
      "Weatherdesc": "string"
    }
  ],
  "Forecast": [
    {
      "date": "2020-01-22T15:22:57.743Z",
      "TempMaxmax": 0,
      "TempMaxmin": 0,
      "TempMinmax": 0,
      "TempMinmin": 0,
      "Weatherdesc": "string",
      "Weathercode": "string",
      "WeatherImgurl": "string",
      "Reliability": "string"
    }
  ],
  "Mountain": [
    {
      "date": "2020-01-22T15:22:57.743Z",
      "Title": "string",
      "Conditions": "string",
      "Weatherdesc": "string",
      "Zerolimit": "string",
      "MountainImgurl": "string",
      "Reliability": "string",
      "Sunrise": "string",
      "Sunset": "string",
      "Moonrise": "string",
      "Moonset": "string",
      "Northcode": "string",
      "Northdesc": "string",
      "Northimgurl": "string",
      "Southcode": "string",
      "Southdesc": "string",
      "Southimgurl": "string",
      "Temp1000": 0,
      "Temp2000": 0,
      "Temp3000": 0,
      "Temp4000": 0,
      "Windcode": "string",
      "Winddesc": "string",
      "WindImgurl": "string"
    }
  ],
  "Stationdata": [
    {
      "date": "2020-01-22T15:22:57.743Z",
      "Id": 0,
      "CityName": "string",
      "WeatherCode": "string",
      "WeatherDesc": "string",
      "WeatherImgUrl": "string",
      "MinTemp": 0,
      "Maxtemp": 0
    }
  ]
}
}
