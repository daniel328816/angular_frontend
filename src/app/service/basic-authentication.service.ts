import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}
  authenticate(username, password) {
    // console.log("before " + this.isUserLoggedIn());
    if (username == "asdf" && password == "123456") {
      sessionStorage.setItem("authenticateUser", username);
      // console.log("after " + this.isUserLoggedIn);
      return true;
    }
    return false;
  }

  executeAuthenticationService(username, password) {
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http
      .get<AuthenticationBean>(`http://localhost:8080/basicauth`, { headers })
      .pipe(
        map(data => {
          sessionStorage.setItem("authenticateUser", username);
          return data;
        })
      );
  }

  createBasicAuthenticationHttpHeader() {}
  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser");
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("authenticateUser");
  }
}
export class AuthenticationBean {
  constructor(public message: string) {}
}
