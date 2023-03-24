import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { PasswordComponent } from './components/password/password.component';
import { ButtonComponent } from './components/button/button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilesizePipe } from '../core/pipe/filesize.pipe';
import { StatusTabComponent } from './components/status-tab/status-tab.component';
import { ModalComponent } from './components/modal/modal.component';
import { CommaDelimiterPipe } from '../core/pipe/commaDelimiter.pipe';
import { CheckMarkComponent } from './components/check-mark/check-mark.component';
import { DateRangeComponent } from './date-range/date-range.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';

const components: any[] = [
  InputComponent,
  PasswordComponent,
  ButtonComponent,
  SidebarComponent,
  HeaderComponent,
  SearchComponent,
  FilesizePipe,
  StatusTabComponent,
  ModalComponent,
  FilesizePipe,
  CommaDelimiterPipe,
  CheckMarkComponent,
  DateRangeComponent,
  LogoutModalComponent

]


@NgModule({
  declarations: [
    ...components,
    StatusTabComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
        MatDialogModule,

    RouterModule
  ],
  exports: [
    ...components

  ]
})
export class SharedModule { }
