declare namespace Express {
  interface Request {
    session?: {
      authorization?: string;
    };
    user: {
      id: string;
    };
  }
  interface Session {
    authorization?: string;
  }
}
