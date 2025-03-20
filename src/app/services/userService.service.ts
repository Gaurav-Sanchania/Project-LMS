import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private httpClient: HttpClient) {}

    deleteLeaveById(id: number) {
        try {
            this.httpClient.post(`https://localhost:7129/LeaveController/DeleteLeaveRequest/${id}`, id).subscribe();
            return 'Successful';
        } catch (error) {
            // console.log(error);
            return error;
        }
    }
}