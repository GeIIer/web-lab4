import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsComponent} from './groups.component';
import { GroupComponent } from './group/group.component';
import {GroupsRoutingModule} from "./groups-routing.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    GroupsComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GroupsRoutingModule,
  ],
  exports: [GroupsComponent, GroupComponent],
})
export class GroupsModule {
}
