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
]


@NgModule({
  declarations: [
    ...components,
    StatusTabComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ...components

  ]
})
export class SharedModule { }
