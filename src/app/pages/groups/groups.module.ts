import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalGroupsComponent } from './modal-groups/modal-groups.component';
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {GroupService} from "../../services/groups.service";

@NgModule({
  declarations: [
    GroupsComponent,
    ModalGroupsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GroupsComponent,
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
  ]
})
export class GroupsModule { }
