/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project sprint page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2021-11-25 15:12:36
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ProjectSprintPage } from "./project-sprint.page";

const routes: Routes = [
  {
    path: '',
    component: ProjectSprintPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    CustomFieldsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectSprintPage]
})
export class ProjectSprintPageModule {}
