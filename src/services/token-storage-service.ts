export class TokenStorage {
  private static readonly SESSION_STORAGE_TOKEN = "token";
  private static readonly SESSION_STORAGE_REFRESH_TOKEN = "refresh_token";

  public static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public static getAuthentication() {
    return { 
      "X-Access-Token": this.getToken(),
      "Content-Type": "application/json"
    };
  }


  public static storeToken(token: string): void {
    sessionStorage.setItem(TokenStorage.SESSION_STORAGE_TOKEN, token);
  }

  public static storeRefreshToken(refreshToken: string): void {
    sessionStorage.setItem(
      TokenStorage.SESSION_STORAGE_REFRESH_TOKEN,
      refreshToken
    );
  }

  public static clear(): void {
    sessionStorage.removeItem(TokenStorage.SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(TokenStorage.SESSION_STORAGE_REFRESH_TOKEN);
  }

  public static getRefreshToken(): string | null {
    return sessionStorage.getItem(TokenStorage.SESSION_STORAGE_REFRESH_TOKEN);
  }

  public static getToken(): string | null {
    return sessionStorage.getItem(TokenStorage.SESSION_STORAGE_TOKEN);
  }
}
