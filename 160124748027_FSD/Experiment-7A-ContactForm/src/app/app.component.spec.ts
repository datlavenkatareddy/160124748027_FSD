import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  activeForm = 'contact';

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  student = {
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    department: '',
    message: ''
  };

  submitContact() {
    alert('Contact form submitted successfully!');
  }

  submitStudent() {
    alert('Student form submitted successfully!');
  }
}