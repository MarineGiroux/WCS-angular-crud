import { Component, inject } from '@angular/core';
import { User } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  private _facadeUserService : UserFacadeService = inject(UserFacadeService);

  user : User = new User ("", "", "");

  onSubmit(): void {
    const userId = Math.floor(Math.random()* 1000).toString();
    this.user.id = userId;
    this._facadeUserService.post$(this.user);
  }
}
