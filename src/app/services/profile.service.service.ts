// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // Import HttpClient
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root', // Provided in root, no need to add in providers array
// })
// export class ProfileService {
//   private apiUrl ='assets/profiles.json'; // Replace with your actual URL

//   constructor(private http: HttpClient) {} // Inject HttpClient

//   getProfiles(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = '../profiles.json'; // URL to JSON file

  constructor(private http: HttpClient) { }

  // Fetch the profiles from the JSON file
  getProfiles(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }
}


