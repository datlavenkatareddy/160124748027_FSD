import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name = '';
  email = '';
  subject = '';
  message = '';

  submit() {
    alert('Contact form submitted successfully!');
  }
}