import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListUserComponent } from "../../components/list-user/list-user.component";
import { CreateUserComponent } from "../../components/create-user/create-user.component";
import { UpdateUserComponent } from "../../components/update-user/update-user.component";
import { DeleteUserComponent } from "../../components/delete-user/delete-user.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, ListUserComponent, CreateUserComponent, UpdateUserComponent, DeleteUserComponent],
  templateUrl: './user-management-page.html',
  styleUrl: './user-management-page.css'
})
export class UserManagementPageComponent {

}
