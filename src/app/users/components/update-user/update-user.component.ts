import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  editedUser!: User;

  ngOnInit() {
    this.editedUser = { ...this.user };
  }

  saveChanges() {
    this.update.emit(this.editedUser);
  }

  cancelEdit() {
    this.cancel.emit();
  }
}
