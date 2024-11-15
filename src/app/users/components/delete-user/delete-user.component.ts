import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<User>();

  confirmDelete() {
    this.delete.emit(this.user);
  }
}