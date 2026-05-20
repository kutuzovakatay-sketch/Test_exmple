import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit{
  userForm: FormGroup;
  isEditMode = false;
  userId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {

    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: ['', Validators.required],       
      education: ['', Validators.required],        
      age: ['', Validators.required],    
      registrationDate: [{ value: '', disabled: true }] 
    });
  }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'new') {
      this.isEditMode = true;
      this.userId = idParam;
      this.loadUserData(this.userId);
    } else {

      const today = new Date().toISOString().split('T')[0];
      this.userForm.patchValue({ registrationDate: today });
    }
  }

  loadUserData(id: string): void {
    this.userService.getUser(id).subscribe({
      next: (user) => {

        this.userForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          registrationDate: user.registrationDate,
          dateBirth: user.dateBirth,
          age: user.age,
          education: user.education
        });
      },
      error: (err) => console.error('Ошибка загрузки пользователя', err)
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    const userData: User = this.userForm.getRawValue();

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error('Ошибка обновления', err)
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error('Ошибка создания', err)
      });
    }
  }


  get f() { return this.userForm.controls; }
}
