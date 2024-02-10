import { NgModule, Component } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VerifyOtpComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,ToastrModule,ProgressSpinnerModule,MessageModule,ToastModule,FormsModule

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

