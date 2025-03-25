import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { LoginService } from "./loginService.service";

@Injectable({
    providedIn: 'root'
})

export class CommomnService {
    private userId: number;
    private today: string;
    constructor(
        private httpClient: HttpClient,
        private loginService: LoginService,
    ) {
        this.userId = loginService.getUserId();
        this.today = new Date().toISOString().split('T')[0];
        // console.log(this.today);
    }

    async getLeaveBalance(): Promise<{ leaveBalance: number; leaveType: string }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ userName: string; leaveType: string; leaveBalance: number; leaveTypeId: number }[]>(
                    `https://localhost:7129/UserController/GetUserLeaveBalance/${this.userId}`
                )
            );
            const filteredData = response.map(({ leaveBalance, leaveType }) => ({ leaveBalance, leaveType })); 
            // console.log("Filtered Leave Balance Data:", filteredData);
            return filteredData;
        } catch (error) {
            // console.error("Error fetching leave balance:", error);
            return [];
        }
    }

    async getCountOnPresent(): Promise<{ presentNumber: number }> {
        // console.log(this.today);
        try {
            const count = await firstValueFrom(
                this.httpClient.get<{ presentNumber: number }>(`https://localhost:7129/UserController/PieChartCountPresent/${this.today}`));
            // console.log(count);
            return count;
        } catch (error) {
            // console.error("Error fetching count on leave:", error);
            return { presentNumber: 0 };
        }
    }

    async getCountOnDate(inputDate: Date): Promise<{ presentNumber: number }> {
        // console.log(inputDate.toISOString().split('T')[0]);
        try {
            const count = await firstValueFrom(
                this.httpClient.get<{ presentNumber: number }>(`https://localhost:7129/UserController/PieChartCountPresent/${inputDate.toISOString().split('T')[0]}`));
            // console.log(count);
            return count;
        } catch (error) {
            // console.error("Error fetching count on leave:", error);
            return { presentNumber: 0 };
        }
    }

    async getCountOnLeave(): Promise<{ leaveNumber: number }> {
        try {
            const count = await firstValueFrom(
                this.httpClient.get<{ leaveNumber: number }>(`https://localhost:7129/UserController/PieChartCountOnLeave/${this.today}`));
            // console.log(count);
            return count;
        } catch (error) {
            // console.error("Error fetching count on leave:", error);
            return { leaveNumber: 0 };
        }
    }

    async getCountOnLeaveDate(inputDate: Date): Promise<{ leaveNumber: number }> {
        try {
            const count = await firstValueFrom(
                this.httpClient.get<{ leaveNumber: number }>(`https://localhost:7129/UserController/PieChartCountOnLeave/${inputDate.toISOString().split('T')[0]}`));
            // console.log(count);
            return count;
        } catch (error) {
            // console.error("Error fetching count on leave:", error);
            return { leaveNumber: 0 };
        }
    }

    async getEmployeeOnLeave(): Promise<{ name: string; department: string }[]> {
        try {
            const users = await firstValueFrom(
                this.httpClient.get<{ name: string; department: string }[]>(`https://localhost:7129/UserController/GetUsersOnLeave/${this.today}`)
            );
            // console.log(users);
            return users;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    async getEmployeeOnLeaveDate(inputDate: Date): Promise<{ name: string; department: string }[]> {
        try {
            const users = await firstValueFrom(
                this.httpClient.get<{ name: string; department: string }[]>(`https://localhost:7129/UserController/GetUsersOnLeave/${inputDate.toISOString().split('T')[0]}`)
            );
            // console.log(users);
            return users;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    async getLeavesForUser(): Promise<{ id: number; startDate: string; endDate: string; leaveType: string; status: string;
     }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ id: number; startDate: string; endDate: string; leaveType: string; status: string;
                    }[]>(`https://localhost:7129/LeaveController/GetLeaveRequestsForUser/${this.userId}`));
            // console.log(response);
            return response;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    async getLeaveById(id: number): Promise<{ id:number; startDate: Date; totalDays: number; admin_Name: string; reason: string;
        leave_Type: string; cc: string; bcc: string; }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ id:number; startDate: Date; totalDays: number; admin_Name: string; reason: string;
                    leave_Type: string; cc: string; bcc: string;
                 }[]>(`https://localhost:7129/LeaveController/GetLeaveById/${id}`)
            );
            return response;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    async getLeaveTypes(): Promise<{ id: number; name: string; maxLeave: number }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ id: number; name: string; maxLeave: number }[]>("https://localhost:7129/LeaveController/GetLeaveTypes")
            );
            return response;
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    requestsLeave(leave: any) {
        try {
            this.httpClient.post("https://localhost:7129/LeaveController/AddLeaveRequest", leave).subscribe();
            return 'Successful';
        } catch (error) {
            return error;
        }
    }

    // Needs Working
    draftLeaveRequest(leave: any) {
        try {
            this.httpClient.post("asdsf", leave).subscribe();
            return 'Successful';
        } catch (error) {
            return error;
        }
    }

    async getAllHolidays(): Promise<{ event: string; dateOfEvent: Date }[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<{ event: string; dateOfEvent: Date }[]>("https://localhost:7129/LeaveController/GetAllHolidays")
            );
            return response; 
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}