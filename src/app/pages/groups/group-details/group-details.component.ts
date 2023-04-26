import {Component, OnInit} from '@angular/core';
import {Group} from "../../../core/models/group";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../../core/models/student";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalStudentComponent} from "./modal-student/modal-student.component";
import {ModalGroupsComponent} from "../modal-groups/modal-groups.component";
import {GroupService} from "../../../services/groups.service";
import {StudentService} from "../../../services/students.service";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  group!: Group;
  errors = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private groupService: GroupService,
              private modalService: MdbModalService) {
  }

  modalRef: MdbModalRef<ModalStudentComponent> | null = null;
  modalClassRef: MdbModalRef<ModalGroupsComponent> | null = null;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.groupService.getGroupsById(id).subscribe({
      next: (group) => {
        this.group = group;
        console.log(this.group);
      },
      error: (err) => {
        this.errors = true;
      }
    });
  }

  goBack(): void {
    this.router.navigate(["/groups"]).then()
  }

  getStudents(): Student[] {
    return this.group.students.sort((a, b) => this.compareStudent(a, b));
  }

  studentEmpty(): boolean {
    return (this.group.students.length === 0)
  }

  openModalAddNew(groupId: number) {
    this.groupService.getAllGroups().subscribe({
      next: groups => {
        this.modalRef = this.modalService.open(ModalStudentComponent, {
          data: {
            title: "Добавить ученика",
            groups: groups,
          }
        });
        this.modalRef.onClose.subscribe(data => {
          if (data) {
            this.studentService.createStudent(data.firstname, data.lastname, data.birthdate, data.number, groupId).subscribe({
              next: student => {
                this.group.students.push(student);
                this.group.students = this.group.students.sort((a, b) => this.compareStudent(a, b));
              }
            });
          }
        });
      },
      error: err => {
        this.errors = true;
      }
    })
  }

  private compareStudent(a: Student, b: Student) {
    var textA = a.lastname.toUpperCase();
    var textB = b.lastname.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: data => {
        this.group.students = this.group.students.filter(obj => obj.id !== id);
      },
      error: err => {
        this.errors = true;
      }
    });
  }

  openModalChange(group: Group) {
    this.modalClassRef = this.modalService.open(ModalGroupsComponent, {
      data: {
        title: "Редактировать группу",
        name: group.name,
      }
    });
    this.modalClassRef.onClose.subscribe(data => {
      if (data) {
        this.groupService.putGroup(group.id, data.name, group.students).subscribe({
          next: group => {
            console.log(group);
            this.group = group;
          },
          error: err1 => {
            console.log(this.group);
            this.errors = true;
          }
        });
      }
    });
  }
}
