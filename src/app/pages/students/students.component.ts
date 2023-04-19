import {Component, OnInit} from '@angular/core';
import {Student} from "../../core/models/student";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  student!: Student;
  errors = false;
  constructor(private router: Router, private studentService: StudentsService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("id"))
    this.studentService.getStudentById(id).subscribe(
      result => {
        this.student = result;
      },
      error => {
        this.errors = true;
      },
      () => {

      }
    );
  }

  goBack(): void {
    this.router.navigate(["/groups"]).then()
  }
}
