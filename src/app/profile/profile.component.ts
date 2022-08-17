import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  fileToUpload: File | null = null;
  // lat
  // lng

  constructor(private token: TokenStorageService, private http: HttpClient) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('handle file input: ', this.fileToUpload)
  }

  uploadImage(fileToUpload) {
    console.log('image file: ', fileToUpload)
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    this.http.post(endpoint, formData).subscribe((res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  // getOppositeOrientation() {
  //   console.log('screen orientation: ', screen.orientation)
  //   const { type } = screen.orientation;
  //   return type.startsWith("landscape") ? "portrait" : "landscape";
  // }
  // updateDetails(lockButton) {
  //   const buttonOrientation = this.getOppositeOrientation();
  //   lockButton.textContent = `Lock to ${buttonOrientation}`;
  // }
  // fullScreenCheck() {
  //   console.log('haha')
  //   if (document.fullscreenElement) return;
  //   return document.documentElement.requestFullscreen();
  // }
  // async rotate() {
  //   const lockButton = document.getElementById('button')
  //   console.log(lockButton)
  //   try {
  //     await this.fullScreenCheck();
  //   }
  //   catch (err) {
  //     console.error(err)
  //   }
  //   const newOrientation = this.getOppositeOrientation();
  //   console.log('newOrientation: ', newOrientation)
  //   await screen.orientation.lock(newOrientation);
  //   this.updateDetails(lockButton);
  // }
  // show() {
  //   const { type, angle } = screen.orientation;
  //   console.log(`Orientation type is ${type} & angle is ${angle}.`);
  // }


  // x = screen.orientation.addEventListener("change", () => {
  //   this.show();
  //   this.updateDetails(document.getElementById("button"));
  // });



  // w = window.addEventListener("load", () => {
  //   this.show();
  //   this.updateDetails(document.getElementById("button"));
  // });

}
