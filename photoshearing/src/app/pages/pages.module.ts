import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAlbumPopupComponent } from './add-album-popup/add-album-popup.component';

import { FormsModule } from '@angular/forms';
import { ImageListComponent } from './image-list/image-list.component';
import { SettingComponent } from './setting/setting.component';
import { SheardAlbumComponent } from './sheard-album/sheard-album.component';
import { SheardPopupComponent } from './sheard-popup/sheard-popup.component';
import { SheardHistoyComponent } from './sheard-histoy/sheard-histoy.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ImagepreviewComponent } from './imagepreview/imagepreview.component';




@NgModule({
  declarations: [
    DashboardComponent,
    AlbumsComponent,
    UpdateUserComponent,
    AddAlbumPopupComponent,
    ImageListComponent,
    SettingComponent,
    SheardAlbumComponent,
    SheardPopupComponent,
    SheardHistoyComponent,
    AddImageComponent,
    ImagepreviewComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
