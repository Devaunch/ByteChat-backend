import { UserType } from "src/model/User";
export type ErrorType = {
  status: number;
  message: String;
};

export type CookieType = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};

export type mongoUserDoc<docType> = docType & {_doc:UserType}

