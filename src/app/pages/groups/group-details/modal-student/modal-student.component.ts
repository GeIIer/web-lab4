import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {Group} from "../../../../core/models/group";

@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss']
})
export class ModalStudentComponent {
  title!: string;
  firstname!: string;
  lastname!: string;
  birthdate!: Date;
  number!: number;

  selectedGroup!: Group;
  change: boolean = false;
  groups!: Group[];

  constructor(public modalRef: MdbModalRef<ModalStudentComponent>) {
  }

  close() {
    this.modalRef.close();
  }

  save() {
    if (this.change) {
      let newStudent = {
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        number: this.number,
        groupId: this.selectedGroup.id
      }
      this.modalRef.close(newStudent);
    }
    else {
      let newStudent = {
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        number: this.number,
      }
      this.modalRef.close(newStudent);
    }
  }

  checkNull() {
    return this.firstname != null
      && this.lastname != null
      && this.birthdate != null
      && this.number != null;
  }
}
