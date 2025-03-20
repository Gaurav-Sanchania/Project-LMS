import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
// import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private httpClient: HttpClient,
    ) {}
    
    async fetchUsersCredentials() {
        let listOfUsers: object[] = [];
        try {
            listOfUsers = await firstValueFrom(
                this.httpClient.get<object[]>("https://localhost:7129/UserController/GetLoginCredential")
            );
            // console.log("Fetched Users:", listOfUsers);
            return listOfUsers;
        } catch (error) {
            // console.error("Error fetching users:", error);
            return [];
        }
    }

    async loginValidation(loginCredentials: any) {
        const email = loginCredentials.email;
        const password = loginCredentials.password;

        const userList = await this.fetchUsersCredentials();
        
        const validUser = userList.find(user => 
            (user as any).email === email && (user as any).password === password
        );
        // console.log(validUser);

        if (validUser) {
            const userType = (validUser as any).userType;
            // console.log(userType);

            localStorage.setItem('user', JSON.stringify(validUser));

            return userType;
        } else {
            return '';
        }
    }

    getUserType(): string {
        let userString = localStorage.getItem('user');
        let userType: string = '';
        // console.log(userString);

        if(userString) {
            const user = JSON.parse(userString);
            
            userType = user.userType;
            // console.log(userType);
        }
        return userType;
    }

    getUserId(): number {
        let userString = localStorage.getItem('user');
        let id: number = 0;

        if(userString) {
            const user = JSON.parse(userString);
            id = user.id;
        }
        return id;
    }
}