import {Component, OnInit} from '@angular/core';
import {Group} from "../../../core/models/group";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../../../services/groups.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: Group;
  id: number;

  constructor(private router: Router, private groupsService: GroupsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.id=params['id']);
    this.groupsService.getGroupsById(this.id).subscribe(data => {
      this.group = data;
    })
  }

  goBack(): void {
    this.router.navigate(["/groups"]).then()
  }

}
