import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesServiceService {

  constructor(private http:HttpClient) { }

  userUrl:string = 'http://localhost:3000/user';
  getOneUser(id:number,httpOptions:any){
    return this.http.get(`${this.userUrl}/${id}`,httpOptions)
  }
  updateUser(id:number,data:any){
    return this.http.patch(`${this.userUrl}/${id}`,data)
  }

  albumUrl:string = 'http://localhost:3000/album'
  getAlbumById(id:number){
    return this.http.get(`${this.albumUrl}/${id}`)
  }

  getAllAlbums(userId: string, page: number, search: string, sortBy: string): Observable<any> {
    const queryParams = `?userId=${userId}&page=${page}&search=${search}&sortBy=${sortBy}`;
    return this.http.get(`${this.albumUrl}${queryParams}`);
}
  addAlbum(data:any){
    return this.http.post(this.albumUrl,data);
  }
  deleteAlbumById(id:number){
    return this.http.delete(`${this.albumUrl}/${id}`);
  }
  imageUrl:string = 'http://localhost:3000/images'
   
  
  getAllImagesByAlbumId(id: number, page: number, search: string, sortBy: string): Observable<any> {
    const queryParams = `?page=${page}&search=${search}&sortBy=${sortBy}`;
    return this.http.get(`${this.imageUrl}/${id}${queryParams}`);
}

deleteImageById(id:number){
  return this.http.delete(`${this.imageUrl}/${id}`);
}
previewImageDetailUrl:string = 'http://localhost:3000/images/previewImage'
getAllImagesByAlbumIdPreview(id: number): Observable<any> {
  return this.http.get(`${this.previewImageDetailUrl}/${id}`);
}
  singleImageUrl:string = 'http://localhost:3000/images/singleImage'
  getImageById(id:number){
    return this.http.get(`${this.singleImageUrl}/${id}`)
  }

  settingUrl:string = 'http://localhost:3000/setting';

  getSetting(id:number){
    return this.http.get(`${this.settingUrl}/${id}`)
  }

  updateSetting(id:number,data:any){
    return this.http.patch(`${this.settingUrl}/${id}`,data)
  }

  sheardUrl:string = 'http://localhost:3000/sheard';

  // getSheardAlbum(email:any){
  //   const urlWithParams = `${this.sheardUrl}?email=${email}`;
  //   return this.http.get(urlWithParams);
  // }
  getSheardAlbum(email: any, page: number, search: string, sortBy: string): Observable<any> {
    const queryParams = `?email=${email}&page=${page}&search=${search}&sortBy=${sortBy}`;
    return this.http.get(`${this.sheardUrl}${queryParams}`);
}

  // getHistory(userId:any){
  //   const urlWithParams = `${this.sheardUrl}?userId=${userId}`;
  //   return this.http.get(urlWithParams);
  // }
  getHistory(userId: any, page: number, search: string, sortBy: string): Observable<any> {
    const queryParams = `?userId=${userId}&page=${page}&search=${search}&sortBy=${sortBy}`;
    return this.http.get(`${this.sheardUrl}${queryParams}`);
}
  sharingAlbum(data:any){
    return this.http.post(this.sheardUrl,data);
  }
  getCountShardAlbum(id:number){
    return this.http.get(`${this.sheardUrl}/${id}`)
  }
  
  uploadImages(data:any){
   return this.http.post(this.imageUrl,data)
  }
}
