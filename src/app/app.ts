import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfile } from './components/user-profile/user-profile';
import { UserList } from './components/user-list/user-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserList, UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
