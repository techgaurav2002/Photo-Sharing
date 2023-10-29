import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AlbumsComponent } from 'src/app/pages/albums/albums.component';
import { UpdateUserComponent } from 'src/app/pages/update-user/update-user.component'; 
import { ImageListComponent } from 'src/app/pages/image-list/image-list.component';
import { SheardAlbumComponent } from 'src/app/pages/sheard-album/sheard-album.component';
import { SheardHistoyComponent } from 'src/app/pages/sheard-histoy/sheard-histoy.component';
import { AddImageComponent } from 'src/app/pages/add-image/add-image.component';
import { ImagepreviewComponent } from 'src/app/pages/imagepreview/imagepreview.component';

export const AdminLayoutRoutes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'albums',component:AlbumsComponent},
  {path:'sheardAlbum',component:SheardAlbumComponent},
  {path:'sharedHistory',component:SheardHistoyComponent},
  {path:'update',component:UpdateUserComponent},
  {path:'images',component:ImageListComponent},
  {path:'addImage',component:AddImageComponent},
  {path:'preview',component:ImagepreviewComponent}
];