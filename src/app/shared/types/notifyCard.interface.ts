import {NotificationTypes} from "../services/dialog.service";

export interface NotificationInterface {
  text: string;
  title: string;
  type: NotificationTypes;
}
