import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name = '';
  rollNo = '';
  email = '';
  phone = '';
  department = '';
  message = '';

  submit() {
    alert('Student form submitted successfully!');
  }
}