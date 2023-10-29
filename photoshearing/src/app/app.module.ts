import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthenticationModule } from './authentication/authentication.module';
import { PagesModule } from './pages/pages.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './authentication/auth-service.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatSlideToggleModule,
    AuthenticationModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [AuthServiceService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
