import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListUserComponent } from "../../components/list-user/list-user.component";
import { CreateUserComponent } from "../../components/create-user/create-user.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, ListUserComponent, CreateUserComponent],
  templateUrl: './user-management-page.html',
  styleUrl: './user-management-page.css'
})
export class UserManagementPageComponent {

}
