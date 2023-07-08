import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  //  !!! Code for using JSON server instead of a static array !!!
  // url = 'http://localhost:3000/locations';

  // async getAllHousingLocations(): Promise<HousingLocation[]> {
  //   const data = await fetch(this.url);
  //   return await data.json() ?? [];
  // }

  // async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
  //   const data = await fetch(`${this.url}/${id}`);
  //   return await data.json() ?? {};
  // }

  protected housingLocationList: HousingLocation[] = [
    {
      "id": 0,
      "name": "Acme Fresh Start Housing",
      "city": "Chicago",
      "state": "IL",
      "photo": "/assets/andre-francois-mckenzie-08uIUe2a9XY-unsplash.jpg",
      "availableUnits": 4,
      "wifi": true,
      "laundry": true
      },
      {
      "id": 1,
      "name": "A113 Transitional Housing",
      "city": "Santa Monica",
      "state": "CA",
      "photo": "/assets/dillon-kydd-XGvwt544g8k-unsplash.jpg",
      "availableUnits": 0,
      "wifi": false,
      "laundry": true
      },
      {
      "id": 2,
      "name": "Warm Beds Housing Support",
      "city": "Juneau",
      "state": "AK",
      "photo": "/assets/fomstock-4ojhpgKpS68-unsplash.jpg",
      "availableUnits": 1,
      "wifi": false,
      "laundry": false
      },
      {
      "id": 3,
      "name": "Homesteady Housing",
      "city": "Chicago",
      "state": "IL",
      "photo": "/assets/john-fornander-tVzyDSV84w8-unsplash.jpg",
      "availableUnits": 1,
      "wifi": true,
      "laundry": false
      },
      {
      "id": 4,
      "name": "Happy Homes Group",
      "city": "Gary",
      "state": "IN",
      "photo": "/assets/johnson-johnson-U6Q6zVDgmSs-unsplash.jpg",
      "availableUnits": 1,
      "wifi": true,
      "laundry": false
      },
      {
      "id": 5,
      "name": "Hopeful Apartment Group",
      "city": "Oakland",
      "state": "CA",
      "photo": "/assets/nicolas-gonzalez-QjuJaMH1rEc-unsplash.jpg",
      "availableUnits": 2,
      "wifi": true,
      "laundry": true
      },
      {
      "id": 6,
      "name": "Seriously Safe Towns",
      "city": "Oakland",
      "state": "CA",
      "photo": "/assets/rendy-novantino-btfixf2BbS0-unsplash.jpg",
      "availableUnits": 5,
      "wifi": true,
      "laundry": true
      },
      {
      "id": 7,
      "name": "Hopeful Housing Solutions",
      "city": "Oakland",
      "state": "CA",
      "photo": "/assets/todd-kent-178j8tJrNlc-unsplash.jpg",
      "availableUnits": 2,
      "wifi": true,
      "laundry": true
      },
      {
      "id": 8,
      "name": "Seriously Safe Towns",
      "city": "Oakland",
      "state": "CA",
      "photo": "/assets/zac-gudakov-wwqZ8CM21gg-unsplash.jpg",
      "availableUnits": 10,
      "wifi": false,
      "laundry": false
      },
      {
      "id": 9,
      "name": "Capital Safe Towns",
      "city": "Portland",
      "state": "OR",
      "photo": "/assets/zero-take-WvHrrR1C5Po-unsplash.jpg",
      "availableUnits": 6,
      "wifi": true,
      "laundry": true
      }
  ];

  getAllHousingLocations(): HousingLocation[]{
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  constructor() { }

  submitApplication(firstName: string, lastNmae: string, email: string){
    console.log('Homes application received: firstName: $(firstName}, lastName: ${lastName}, email: ${email}.');
  }
}
