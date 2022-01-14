/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project sprint page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2021-12-27 18:05:48
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';


@Component({
	selector: "project-users",
	templateUrl: "./project-sprint.page.html",
	styleUrls: ["./project-sprint.page.scss"]
})
export class ProjectSprintPage extends BaseViewComponent implements OnInit, OnDestroy {

	// MyProjectPage constructor
	constructor(
		injector: Injector,
	) {
		super(injector);
	}
}

