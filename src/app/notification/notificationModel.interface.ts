/* Data interface to send a notification */

export interface NotificationModel {
    severity: string;
    summary?: string;
    detail: string;
}