import { createAction, props } from '@ngrx/store';

export const getNotification = createAction(
    `[Notification] get notification`,
    props<{
        entityId : number,
        userType : number
    }>()
)

export const getNotificationSuccess = createAction(
    `[Notification] get notification success`,
    props<{payload : any}>()
)
