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
  student: Student;
  id: number;
  constructor(private router: Router, private studentService: StudentsService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>this.id=params['id']);
    this.studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
    })
  }
  goBack(): void {
    this.router.navigate(["/groups"]).then()
  }
}
