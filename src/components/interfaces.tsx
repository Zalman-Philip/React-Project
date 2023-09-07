interface TripInterface {
  id?: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
}

export default TripInterface;

export const TripTypeForm: TripInterface = {
  name: "",
  destination: "",
  startDate: "",
  endDate: "",
  description: "",
  price: 0,
  image: "",
  activities: [],
};

export interface UserInterface {
  id?: string;
  email: string;
  password: string;
  role?: "admin";
}

export const userTypeForm: UserInterface = {
  email: "",
  password: "",
};

// export type ResponseType = {
//   message: string;
//   responseObj: {
//     token: string;
//     user: {
//       email: string;
//       id: string;
//       password: string;
//     };
//   };
// };

// export const resObj : ResponseType = {
//   message: "",
//   responseObj: {
//     token: "",
//     user: {
//       email: "",
//       id: "",
//       password: "",
//     },
//   }
// }
