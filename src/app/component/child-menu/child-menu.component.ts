/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary ChildMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-20 00:48:40
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector, Input } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { SlideModel } from "src/app/shared/model/slide.model";
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';

@Component({
	selector: "child-menu",
	templateUrl: "./child-menu.component.html",
	styleUrls: ["./child-menu.component.scss"],
})
export class ChildMenuComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	 readonly operationsEnum = OperationsEnum;

	 /**
	   * -------------------------------------------------|
	   * @description										|
	   * @input & @output Instance variable								|
	   * -------------------------------------------------|
	   */
	 @Input() parentArticleId;
 
	 /**
	  * Input  of child menu component
	  */
	  @Input() courseMaterialId;
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * @private Instance variable								|
	  * -------------------------------------------------|
	  */
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * @public Instance variable								|
	  * -------------------------------------------------|
	  */
	 /**
	  * Description  of course material page
	  */
	 childMenu$!: Observable<ChildMenuModel[]>;
 
	 /**
	  * Total number of sub child menu$ of sub child menu component
	  */
	 totalNumberOfChildMenu$!: Observable<number>;
 
	 /**
	  * Determines whether data has
	  */
	 hasData$!: Observable<boolean>;
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * Getter & Setters									|
	  * -------------------------------------------------|
	  */
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * Life cycle hook									|
	  * -------------------------------------------------|
	  */
	 /**
	  * Creates an instance of course material page.
	  * @param injector 
	  * @param courseMaterialStateFacade 
	  * @param rootStateFacade 
	  * @param translateService 
	  */
	 constructor(
		 injector: Injector,
		 private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		 private translateService: TranslateService,
		 private rootStateFacade: RootStateFacade
	 )
	 {
		 super(injector);
	 }
 
	 /**
	  * on init
	  */
	 async ngOnInit()
	 {
		 this.childMenu$ = this.courseMaterialMenuStateFacade.childMenuByParentMenuId$(this.parentArticleId);
	 }
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * @Private methods									|
	  * -------------------------------------------------|
	  */
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * @Public methods									|
	  * -------------------------------------------------|
	  */
 
	 async addNewChild()
	 {
		 let totalNumberOfChildMenu = 0;
		 this.childMenu$
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(data => totalNumberOfChildMenu = data.length)
		 
		 this.translateService
			 .get([
				 'button.addChildMenu',
				 'button.cancel',
				 'button.add',
				 'loading.wait'
			 ])
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(async (data: string[]) =>
			 {
				 const alert = await this.alertController.create({
					 header: data['button.addChildMenu'],
					 inputs: [
						 {
							 name: 'articleTitle',
							 type: 'text'
						 },
					 ],
					 buttons: [
						 {
							 text: data['button.cancel'],
							 handler: () =>
							 {
								 console.log('Confirm Cancel');
							 }
						 }, {
							 text: data['button.add'],
							 handler: async (data) =>
							 {
								 const childMenuModel: ChildMenuModel = {
									 parentArticleId: this.parentArticleId,
									 childArticleOrder: totalNumberOfChildMenu + 1,
									 courseMaterialId: this.courseMaterialId,
									 articleTitle: data.articleTitle,
									 operationType: OperationsEnum.CREATE
								 }
		 
								 await this.rootStateFacade.startLoading(data['loading.wait']);
												 
								 this.courseMaterialMenuStateFacade.addNewChildMenu(childMenuModel);
								 console.log(childMenuModel);
							 }
						 }
					 ]
				 });
		 
				 await alert.present();
			 }
		 );
	 }
	
	 public navigateToCourseMaterialArticle(articleId: string)
	 {
		 this.router.navigate([
			 'go/course/material',
			 this.courseMaterialId,
			 'details',
			 'article',
			 articleId
		 ]);
	 }
}
