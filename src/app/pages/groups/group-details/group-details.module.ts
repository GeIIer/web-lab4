import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupDetailsComponent} from "./group-details.component";
import {RouterModule} from "@angular/router";
import { ModalStudentComponent } from './modal-student/modal-student.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GroupService} from "../../../services/groups.service";
import {StudentService} from "../../../services/students.service";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";


@NgModule({
  declarations: [
    GroupDetailsComponent,
    ModalStudentComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: GroupDetailsComponent,
            },
        ]),
        FormsModule,
        MdbModalModule,
        MdbFormsModule,
        MdbRippleModule,
        ReactiveFormsModule
    ],
  providers: [
    GroupService,
    StudentService,
  ]
})
export class GroupDetailsModule { }
