import { Component, OnInit } from '@angular/core';
import { Group } from "../../../core/models/group";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupsService } from "../../../services/groups.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group!: Group;
  errors = false;

  constructor(private router: Router, private groupsService: GroupsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("id"))
    this.groupsService.getGroupsById(id).subscribe (
      result => {
        this.group = result;
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

  getError(): void {
    this.router.navigate(["/groups"]).then()
  }

  studentEmpty(): boolean {
    return (this.group.students.length === 0)
  }

}
