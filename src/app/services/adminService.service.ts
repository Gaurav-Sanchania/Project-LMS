import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, subscribeOn } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private httpClient: HttpClient) {
    }

    async getAllUsers(): Promise<{}[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{}[]>("https://localhost:7129/UserController/GetAllUsers")
            );
            return response;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    async getAllLeaveRequests(): Promise<{ id: number; startDate: string; endDate: string; reason: string; user_Name: string; user_Department: string; admin_Name: string; status: string; leave_Type: string; totalDays: number, createdAt: string; }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<any[]>("https://localhost:7129/LeaveController/GetAllLeaveRequest")
            );

            const filteredData = response.map(({ id, startDate, endDate, reason, user_Name, user_Department, admin_Name, status, leave_Type, totalDays,  createdAt }) => ({
                id, startDate, endDate, reason, user_Name, user_Department, admin_Name, status, leave_Type, totalDays,createdAt
            }));
            // console.log(response);
            return filteredData;
        } catch (error) {
            return [];
        }
    }

    addUser(userData: any) {
        try {
            this.httpClient.post("https://localhost:7129/UserController/AddUser", userData).subscribe((m) => {
            });
            return 'Successfull';
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    editUserDetails(userData: any) {
        console.log(userData);
        try {
            this.httpClient.post(`https://localhost:7129/UserController/UpdateUser`, userData).subscribe();
            return 'Successful';
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    async getDepartmentTypes(): Promise<{ id: number; name: string; }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ id: number; name: string; }[]>("https://localhost:7129/UserController/GetDepartmentTypes")
            );
            return response;
        } catch (error) {
            return [];
        }
    }

    async getUserTypes(): Promise<{ id: number; name: string; }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ id: number; name: string; }[]>("https://localhost:7129/UserController/GetUserTypes")
            );
            return response;
        } catch (error) {
            return [];
        }
    }

    approveLeave(id: number) {
        try {
            this.httpClient.post(`https://localhost:7129/LeaveController/ApproveLeave/${id}`, id).subscribe(() => { });
            return 'Successful';
        } catch (error) {
            return error;
        }
    }

    rejectLeave(id: number) {
        try {
            this.httpClient.post(`https://localhost:7129/LeaveController/RejectLeave/${id}`, id).subscribe(() => { });
            return 'Successful';
        } catch (error) {
            return error;
        }
    }

    deteleUserById(id: number) {
        try {
            this.httpClient.post(`https://localhost:7129/UserController/RemoveUser/${id}`, id).subscribe();
            return 'Successful';
        } catch (error) {
            return error;
        }
    }
}