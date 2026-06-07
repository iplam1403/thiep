export interface IUser {
  _id: string;
  username: string;
}

export interface IEvent {
  _id: string;
  userId?: string;
  eventType: string;
  hostName: string;
  universityName: string;
  universitySubName: string;
  universityLogo: string;
  title: string;
  subtitle: string;
  timeLine1: string;
  timeLine2: string;
  timeLine3: string;
  locationLine1: string;
  locationLine2: string;
  footerMessage: string;
  templateId: string;
}

export interface IGuest {
  _id: string;
  eventId: IEvent;
  name: string;
}
