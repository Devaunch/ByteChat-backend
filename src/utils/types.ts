export type ErrorType = {
  status: number;
  message: String;
};

export type CookieType = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};
