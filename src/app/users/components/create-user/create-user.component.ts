import { Component, inject } from '@angular/core';
import { User, UserList } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  private userApiService = inject(UserApiService);

  user: User = {
    id: '',
    username: '',
    email: '',
  };

  createUser(user: User) {
    user.id = this.generateUUID();
    this.userApiService.create(user);

    this.user = {
      id: '',
      username: '',
      email: '',
    };
  }

  private generateUUID(): string {
    return crypto.randomUUID(); 
  }
}
