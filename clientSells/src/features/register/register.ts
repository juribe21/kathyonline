import { Component, inject, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterCreds } from '../../types/user';
import { AccountService } from '../../core/services/account-service';
import { TextInput } from '../../shared/text-input/text-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // NOTA: al hacer el registro:
  // *** Si es un cliente, debe indicarse el tipo de usuario Cliente ***
  protected creds = {} as RegisterCreds;
  private accountService = inject(AccountService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['jorge@test.com', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    // check if both password inputs change and perform validation
    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });

    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', Validators.required], se tomara el correo del paso 1
      telefono: ['', Validators.required],
      gender: ['hombre', Validators.required],
      dateOfBirth: ['', Validators.required],
      description: ['', Validators.required],
      /* Se pondran valores default - Cliente podra actualizar
      city: ['', Validators.required],
      country: ['', Validators.required],
      */
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    };
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update((prevStep) => prevStep + 1);
    }
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    const valor = today.toISOString().split('T')[0];

    return valor;
  }

  prevStep() {
    this.currentStep.update((prevStep) => prevStep - 1);
  }

  register() {
    if (this.profileForm.valid && this.credentialsForm.valid) {
      const formData = { ...this.profileForm.value, ...this.credentialsForm.value };
      this.accountService.register(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/clients');
          this.cancel();
        },
        error: (error) => {
          console.log(error);
          this.validationErrors.set(error);
        },
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
