import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import profilesData from '../../../assets/profile.json';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

  ],
})
export class ProfileViewComponent implements OnInit {
  profile: any;
  profileId: number | null = null;
  startX: number | null = null;
  currentIndex: number = 0;
  swipeAnimation: string = '';

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);

    if (!isNaN(this.profileId)) {
      // Find the profile based on the ID
      this.currentIndex = profilesData.findIndex((p) => p.id === this.profileId);
      if (this.currentIndex !== -1) {
        this.profile = profilesData[this.currentIndex];
      } else {
        console.error(`Profile with ID ${this.profileId} not found.`);
      }
    } else {
      console.error('Profile ID is invalid or null.');
    }
  }

  // Touch  event 
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }


  onTouchEnd(event: TouchEvent): void {
    if (this.startX === null) return;

    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - this.startX;

    if (deltaX > 50) {
      this.swipeRight();
    } else if (deltaX < -50) {
      this.swipeLeft();
    }

    this.startX = null;
  }

  // alerts for actions intrested,shortlisted.rejected
  swipeRight(): void {
    this.snackBar.open('Interested', 'close', {
      duration: 100,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.applySwipeAnimation('right-swipe');
  }


  swipeLeft(): void {
    this.snackBar.open('Not Interested', 'close', {
      duration: 100,
      panelClass: ['snackbar-danger'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.applySwipeAnimation('left-swipe');
  }


  shortlist(): void {
    this.snackBar.open('Shortlisted', 'close', {
      duration: 100,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.applySwipeAnimation('right-swipe');
  }


  applySwipeAnimation(direction: string): void {
    this.swipeAnimation = direction;


    setTimeout(() => {
      this.navigateToNextProfile();
      this.swipeAnimation = '';
    }, 300);
  }


  navigateToNextProfile(): void {
    this.currentIndex = (this.currentIndex + 1) % profilesData.length;
    this.profile = profilesData[this.currentIndex];
    this.router.navigate(['/profile', this.profile.id]);
  }
}
