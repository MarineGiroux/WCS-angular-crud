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
  private _facadeUserService: UserFacadeService = inject(UserFacadeService); // Injection de la façade.

  users$: Observable<User[]> = this._facadeUserService.getAll$(); // Observable des utilisateurs.

  editingUserId: string | null = null; // Gère l'état d'édition.

  // Active le mode édition pour un utilisateur spécifique.
  enableEdit(userId: string) {
    this.editingUserId = userId;
  }

  // Annule le mode édition.
  cancelEdit() {
    this.editingUserId = null;
  }
}