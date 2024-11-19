import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { FormsModule } from '@angular/forms';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  private _facadeUserService: UserFacadeService = inject(UserFacadeService);
  @Input({ required: true }) user!: User;
  @Output() updateComplete = new EventEmitter<void>();

  onSubmit(): void {
    this._facadeUserService.update$(this.user);
    this.updateComplete.emit();
  }
}
