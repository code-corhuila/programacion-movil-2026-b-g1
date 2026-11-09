export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly program: string;
}

export interface Subject {
  readonly id: number;
  readonly name: string;
  readonly credits: number;
  readonly teacher: string;
  /** Current average, 0.0–5.0. */
  readonly average: number;
}

export interface LoginResponse {
  readonly token: string;
  readonly expiresIn: number;
  readonly user: User;
}
