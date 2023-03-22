import { NotifierOptions } from 'angular-notifier';

export type NotificationType =
  | 'default'
  | 'warning'
  | 'info'
  | 'success'
  | 'error';

export type EventName = 'logout' | 'notification' | 'switchAccount';

export type userType = 'CDAL_USER' | 'DO_USER' | 'INSTITUTION_USER';

export enum userTypeEnum {
  CDAL_USER = 1,
  DO_USER = 2,
  INSTITUTION_USER = 3,
}

export type LoginType = 'fip' | 'fiu';

export type SelectOption = {
  name: string;
  value: string;
};

export const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
