import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Student} from "../core/models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private http:HttpClient) {}

  private studentsUrl = 'http://localhost:8080/api/students';

  public getStudentById(id:number) {
    return this.http.get<Student>(this.studentsUrl + "/" + id);
  }

}
