import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profileForm!: FormGroup;
  profilePhotoPreview!: SafeResourceUrl;
  dateModalOpen: boolean = false;
  handlerMessage: string = '';
  roleMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      jobTitle: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    const profiles = JSON.parse(structuredClone(sessionStorage.getItem('profiles'))) || [];
    profiles.push(this.profileForm.value);
    sessionStorage.setItem('profiles', JSON.stringify(profiles));
    this.profileForm.reset();
    this.profilePhotoPreview = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePhotoPreview = this.sanitizer.bypassSecurityTrustResourceUrl(<string> e.target!.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
    
}
