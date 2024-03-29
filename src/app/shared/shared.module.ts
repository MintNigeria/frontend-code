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
import { RequestEmptyStateComponent } from './request-empty-state/request-empty-state.component';
import { TrustedURLPipe } from '../core/pipe/trustedURLPipe.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';
import { AlertComponent } from './components/alert/alert.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { NigeriaPhoneNumberPipe } from '../core/pipe/nigeria-phone-number.pipe';
import { ActionConfirmationModalComponent } from './components/action-confirmation-modal/action-confirmation-modal.component';
import { SingleSessionModalComponent } from './components/single-session-modal/single-session-modal.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { BreakAtFirstCommaPipe } from '../core/pipe/breakAtFirstComma.pipe';

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
  CheckMarkComponent,
  DateRangeComponent,
  LogoutModalComponent,
  ModalComponent,
  CollapseComponent,
  TextareaComponent,
  HelpDeskComponent,
  AlertComponent,
  MobileNavComponent,
  FilePreviewComponent,
  ActionConfirmationModalComponent,
  InputNumberComponent,

  
  FilesizePipe,
  TrustedURLPipe,
  NigeriaPhoneNumberPipe,
  BreakAtFirstCommaPipe,
  CommaDelimiterPipe,
  SingleSessionModalComponent,

]


@NgModule({
  declarations: [
    ...components,
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
