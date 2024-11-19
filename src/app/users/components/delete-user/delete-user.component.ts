import { Component, inject, Input } from '@angular/core';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  private _userFacadeService : UserFacadeService = inject(UserFacadeService);
  @Input({required : true}) userID!: string;

  deleteUser(): void{
    this._userFacadeService.delete$(this.userID)
  }
}