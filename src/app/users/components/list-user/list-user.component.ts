import { Component, inject } from '@angular/core';
import { User } from '../../models/user.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UserFacadeService } from '../../services/user-facade.service';
import { ClonePipe } from '../../../core/clone.pipe';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [AsyncPipe, ClonePipe, UpdateUserComponent, DeleteUserComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent {
  private _facadeUserService: UserFacadeService = inject(UserFacadeService);

  users$: Observable<User[]> = this._facadeUserService.getAll$();

  editingUserId: string | null = null;

  enableEdit(userId: string) {
    this.editingUserId = userId;
  }

  cancelEdit() {
    this.editingUserId = null;
  }
}
