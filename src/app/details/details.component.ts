import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import  emailjs  from '@emailjs/browser';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">  
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First name</label>
          <input id="first-name" type="text" formControlName="firstName" required>
          <div *ngIf="applyForm.controls.firstName.invalid && buttonClicked">
            <p class="error-message" *ngIf="applyForm.controls.firstName.errors?.['required']">First name is required</p>
          </div>

          <label for="last-name">Last name</label>
          <input id="last-name" type="text" formControlName="lastName" required>
          <div *ngIf="applyForm.controls.lastName.invalid && buttonClicked">
            <p class="error-message" *ngIf="applyForm.controls.lastName.errors?.['required']">Last name is required</p>
          </div>

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" required>
          <div *ngIf="applyForm.controls.email.invalid && buttonClicked">
            <p class="error-message" *ngIf="applyForm.controls.email.errors?.['required']">Email is required</p>
            <p class="error-message" *ngIf="applyForm.controls.email.errors?.['email']" >Invalid email format</p>
          </div>

          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  ///oprator '?' ensures that the app doesn't crash if housingLocation is null
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //   !!! Code for using JSON server instead of a static array !!!
  // constructor(){
  //   const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  //   this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
  //     this.housingLocation = housingLocation;
  //   });
  // }

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  buttonClicked = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // getting the element that was clicked
    const targetElement = event.target as HTMLElement;
    // checking if the clicked element do not match with button submit
    if(!targetElement.closest('button[type="submit"]')){
      // reseting to false
      this.buttonClicked = false;
    }
  }

  submitApplication() {
    // converting to true to show any errors 
    this.buttonClicked = true;
    
    if (this.applyForm.invalid) {
      return;
    }

    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );

    this.send();
  }

  async send(){
    emailjs.init('z6UXdOTTvvzEpF5KX');
    let response = await emailjs.send("service_4a7k20f","template_zkv8ksr",{
      house_name: this.housingLocation?.name,
      house_city: this.housingLocation?.city,
      first_name: this.applyForm.value.firstName,
      to_email: this.applyForm.value.email,
      });

    alert("We've sent a confirmation email with your booking details.");
    this.applyForm.reset();
  }
}
