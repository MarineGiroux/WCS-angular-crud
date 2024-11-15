import { Component, inject } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserApiService } from '../../services/user-api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UpdateUserComponent,
    DeleteUserComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private _userApiService = inject(UserApiService);

  users$: Observable<User[]> = this._userApiService.users$;
  editingUser: User | null = null;

  enableEdit(user: User) {
    this.editingUser = user;
  }

  cancelEdit() {
    this.editingUser = null;
  }

  updateUser(user: User) {
    this._userApiService.update(user);
    this.editingUser = null;
  }

  deleteUser(user: User) {
    this._userApiService.delete(user);
  }

  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
