import { AnyAction } from '@reduxjs/toolkit';

export interface Mention {
  id: number;
  description: string;
  userName: string;
  userIcon: string;
  place: string;
  href: string;
  status: number;
  typePost: string;
  param: string;
}

export type Notification = Mention;

export const notifications = [
  {
    id: 2,
    description: 'header.notifications.loginAttempt',
  },
  {
    id: 1,
    description: 'header.notifications.successPayment',
  },
  {
    id: 3,
    description: 'header.notifications.serverError',
  },
  {
    id: 4,
    description: 'header.notifications.mention',
    userName: 'Steve Manson',
    userIcon:
      'https://res.cloudinary.com/lapkinthegod/image/upload/v1629187274/young-male-doctor-white-uniform_x7dcrs.jpg',
    place: 'medical-dashboard.latestScreenings.title',
    href: `/#latest-screenings`,
  },
];
