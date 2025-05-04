export type ISellerStatus = "active" | "inactive" | "pending";
export type IPaymentStatus = "pending" | "fulfilled";
export type Role = "admin" | "seller" | "courier" | "client";
export type ICategoryType = "root" | "child";
export interface ICategory {
  _id: string;
  name: string;
  parentId?: string;
  path: string[];
  level: number;
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  shopName: string;
  description: string;
  brand: string;
  slug: string;
  media: IMedia[];
  price: number;
  stock: number;
  rating: number;
  discount: number;
  outOfStock: boolean;
}

export interface IUser {
  _id: string;
  media: IMedia;
  name: string;
  email: string;
  description: string;
  roles: Role[];
  method: "standard" | "google";
  password: string;
  googleId: string;
  addresses: IAddress[];
  status: ISellerStatus;
  payment: IPaymentStatus;
  refreshToken: string;
  passwordResetToken: string;
  passwordResetTokenExpiration: Date;
}
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export interface AuthResponse {
  user: {
    userId: string;
    name: string;
    avatar: string;
    roles: Role[];
    accessToken: string;
  };
}

export interface ICounter {
  prev: number;
  curPage: number;
  next: number;
  pagesLen: number;
}

export interface IQueryParams {
  searchValue: string;
  curPage: number;
  perPage: number;
}

export interface ISellerChat {
  _id: string;
  recentMessage: string;
  seller: {
    _id: string;
    avatar: string;
    businessName: string;
  };
}
export interface IAddress {
  _id?: string;
  type: "home" | "work" | "other";
  city: string;
  area: string;
  phone: string;
  pinCode: string;
  province: string;
}
export interface IMedia {
  url: string;
  public_id: string;
  type: "image" | "video";
}
export interface ISeller {
  _id: string;
  name: string;
  media: IMedia;
  email: string;
  password: string;
  addresses: IAddress[];
  roles: number[];
  method: string;
  sellerStatus: "active" | "inactive";
  payment: "pending" | "fulfilled";
  refreshToken: string;
  passwordResetToken: string;
  passwordResetTokenExpiration: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  chatId: Object;
  senderId: Object;
  receiverId: Object;
  message: string;
  isDelivered: boolean;
  isRead: boolean;
}
