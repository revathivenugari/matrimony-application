
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import profilesData from '../../../assets/profile.json';

@Component({
  standalone: true,
  selector: 'app-profile-swipe',
  templateUrl: './profile-swipe.component.html',
  styleUrls: ['./profile-swipe.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule,
    HttpClientModule
  ]
})
export class ProfileSwipeComponent implements OnInit {
  profiles: any[] = profilesData; // Profiles from the JSON file
  currentProfileIndex: number = 0;
  touchStartX = 0;

  currentIndex: number = 0;

  totalProfiles: number = this.profiles.length; // Total number of profiles


  constructor(private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    console.log('Profiles loaded:', this.profiles);
  }

  // To Handle "Yes" button click
  swipeRight() {
    this.openSnackBar('Interested', 'snack-bar-interested');
    this.nextProfile();
  }

  swipeLeft() {
    this.openSnackBar('Not Interested', 'snack-bar-rejected');
    this.nextProfile();
  }

  shortlist() {
    this.openSnackBar('Shortlisted', 'snack-bar-shortlisted');
    this.nextProfile();
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 100,
      panelClass: [panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


  nextProfile() {

    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profiles.length;
    console.log(this.currentProfileIndex)
  }


  viewProfile(profile: any) {
    this.router.navigate(['/profile', profile.id]);
  }


  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = this.touchStartX - touchEndX;
    if (deltaX > 100) {
      this.swipeLeft();
    } else if (deltaX < -100) {
      this.swipeRight();
    }
  }
  next() {
    if (this.totalProfiles === 0) {
      return;
    }

    if (this.currentIndex < this.totalProfiles - 1) {
      this.currentIndex++;
    }
    console.log(this.currentIndex, this.totalProfiles, this.currentProfileIndex);
  }


  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalProfiles - 1;
    }
  }

  isNextDisabled(): boolean {

    return this.totalProfiles === 0 || this.currentIndex === 2;

  }

  isPreviousDisabled(): boolean {
    return this.currentIndex <= 0 && this.totalProfiles > 0;
  }

  loadProfiles(data: any[]) {
    this.profiles = data;
    this.totalProfiles = data.length;
    this.currentIndex = this.totalProfiles > 0 ? 0 : -1;
  }


  like(profile: any) {
    console.log('Liked profile:', profile);
  }

}