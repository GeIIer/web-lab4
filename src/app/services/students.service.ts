import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Student} from "../core/models/student";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class StudentService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private studentUrl = 'http://localhost:8080/api/students';

  public getStudentById(id: number) {
    return this.http.get<Student>(this.studentUrl + "/" + id);
  }

  public createStudent(
    firstname: string,
    lastname: string,
    birthdate: Date,
    number: number,
    groupId: number) {
    return this.http.post<Student>(this.studentUrl, {
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      number: number,
      groupId: groupId,
    }, httpOptions);
  }

  deleteStudent(id: number) {
    return this.http.delete(this.studentUrl + "/" + id);
  }

  putStudent(
    id: number,
    firstname: string,
    lastname: string,
    birthdate: Date,
    number: number,
    groupId: number) {
    return this.http.post<Student>(this.studentUrl, {
      id: id,
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      number: number,
      groupId: groupId,
    }, httpOptions);
  }
}
