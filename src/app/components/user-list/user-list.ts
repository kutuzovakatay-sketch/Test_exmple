import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../model/user.model';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users,
      this.cdr.detectChanges();
    });
  }

  deleteUser(id: number): void {
    if (confirm('Удалить пользователя?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
