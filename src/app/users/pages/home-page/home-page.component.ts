import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserListComponent } from "../../components/user-list/user-list.component";
import { CreateUserComponent } from "../../components/create-user/create-user.component";
import { UpdateUserComponent } from "../../components/update-user/update-user.component";
import { DeleteUserComponent } from "../../components/delete-user/delete-user.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, UserListComponent, CreateUserComponent, UpdateUserComponent, DeleteUserComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
