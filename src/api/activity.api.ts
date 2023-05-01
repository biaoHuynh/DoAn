import { ActivityStatusType } from '@app/interfaces/interfaces';

export interface Activity {
  id: number;
  imageUrl: string;
  name: string;
  email: string;
  status: ActivityStatusType;
  date: number;
  topicContactId: string;
  unfriend: any;
  isExpert: boolean;
  expertInfo: any;
  contactInfo: any;
  addfriend: any;
  acpfriend: any;
  cancelacpfriend: any;
  subexpert: any;
  unsubexpert: any;
}

export interface UserActivity extends Omit<Activity, 'owner'> {
  usd_value: number;
}

export interface TrendingActivity {
  title: string;
  owner: string;
  image: string;
  avatar: string;
  usd_value: number;
}
