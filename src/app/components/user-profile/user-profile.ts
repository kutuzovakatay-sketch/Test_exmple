import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})

export class UserProfile implements OnInit, OnDestroy{
  user: User | null = null;
  private paramSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('UserProfile ngOnInit вызван');
    // Подписываемся на изменения параметров маршрута
    this.paramSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('paramMap получил id:', id);

      if (id) {
        this.loadUser(+id);
      }
    });
  }

  loadUser(id: number): void {
    console.log('loadUser вызван с id:', id);
    this.user = null; // очищаем предыдущие данные, чтобы показать "Загрузка..."
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.user = user,
        this.cdr.detectChanges(),
      console.log('Полный объект пользователя:', user);},
        
      
      error: (err) => console.error('Ошибка загрузки пользователя', err)
    });
  }

  ngOnDestroy(): void {
    // Отписываемся, чтобы избежать утечек памяти
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}

