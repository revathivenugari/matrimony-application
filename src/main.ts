import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { appRoutes } from './app/app.routes'; // Adjust the import according to your routes file

// Enable production mode if needed
enableProdMode();

// Bootstrap the Angular application with HTTP client and routing
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(), // Provide HttpClient here
  ]
});
