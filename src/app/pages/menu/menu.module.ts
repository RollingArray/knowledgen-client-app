/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46 
 * Last modified  : 2021-11-23 20:12:29
 */

import { UserProfileModule } from './../../component/user-profile/user-profile.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { LearnMoreModule } from 'src/app/component/learn-more/learn-more.module';

const routes: Routes = [
	{
		path: "my/space",
		component: MenuPage,
		children: [
			{
				path: 'my/space',
				loadChildren: () => import('../project-sprint/project-sprint.module').then(m => m.ProjectSprintPageModule)
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UserProfileModule,
		NoDataModule,
		LearnMoreModule,
		RouterModule.forChild(routes)
	],
	declarations: [MenuPage]
})
export class MenuPageModule { }
