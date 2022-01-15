/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project sprint page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-15 02:02:01
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { Observable } from 'rxjs';
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { CrudCourseMaterialComponent } from 'src/app/component/crud-course-material/crud-course-material.component';

@Component({
	selector: "project-users",
	templateUrl: "./course-material.page.html",
	styleUrls: ["./course-material.page.scss"]
})
export class CourseMaterialPage extends BaseViewComponent implements OnInit, OnDestroy {

	readonly operationsEnum = OperationsEnum;

	/**
	 * @description Skill categories of home page
	 */
	 courseMaterials$!: Observable<CourseMaterialModel[]>;

	 /**
	  * Determines whether data has
	  */
	hasData$!: Observable<boolean>;
	
	// MyProjectPage constructor
	constructor(
		injector: Injector,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
	) {
		super(injector);
	}

	/**
	 * @description Descriptions search skill component
	 */
	 async ngOnInit() {
		this.loadData();
	}

	/**
	 * @description Loads data
	 */
	public loadData() {
		this.hasData$ = this.courseMaterialStateFacade.courseMaterialHasData$;
		this.courseMaterials$ = this.courseMaterialStateFacade.allCourseMaterial$;

		this.courseMaterials$.subscribe(data => console.log(data));
		// if no data available ... make a api request, else work with store data
		this.hasData$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				hasData => !hasData ? this.getSkillCategories() : null
			);

		// Track category crud operation status
		this.trackCategoryCrudOperationStatus();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Tracks skill crud operation status
	 */
	 trackCategoryCrudOperationStatus() {
		this.courseMaterialStateFacade
			.courseMaterialCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) => {

				// track operation status and  
				switch (operationsStatus) {
					case OperationsEnum.EDIT:
						this.openCrudCategory();
						break;
					case OperationsEnum.DELETE:
						this.openCrudCategory();
						break;
					default:
						break;
				}
			});
	}

	/**
	 * @description Opens skill crud corner
	 */
	async openCrudCategory() {
		const modal = await this.modalController.create({
			component: CrudCourseMaterialComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
		});

		// present modal
		await modal.present();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
	 
	/**
	 * @description Gets skill categories
	 */
	async getSkillCategories() {
		
		this.translateService
			.get('loading.category')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) => {
				await this.rootStateFacade.startLoading(data);
			});
		
		this.courseMaterialStateFacade.requestCourseMaterial();
	}

	/**
	 * Opens skill corner modal
	 */
	 async createNewCourseMaterial() {
		// build a empty object
		const courseMaterialModel: CourseMaterialModel = {
			courseMaterialId: '',
			courseMaterialName: '',
			courseMaterialDescription: '',
			operation: OperationsEnum.CREATE
		};

		this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, OperationsEnum.CREATE);

		//load crud modal
		this.openCrudCategory();
	 }
	
	 public onCourseMaterialAction(selectedCourseMaterialModel: CourseMaterialModel, operation: OperationsEnum) {
		// new user skill 
		const courseMaterialModel: CourseMaterialModel = {
			...selectedCourseMaterialModel,
			operation: operation
		};

		// act upon operation category
		if (operation === OperationsEnum.EDIT) {
			return selectedCourseMaterialModel ? this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, operation) : undefined;
		}
		else {
			return courseMaterialModel ? this.checkIfWantToDelete(courseMaterialModel) : undefined;
		}
	 }
	
	/**
	 * @description Checks if want to delete
	 * @param userSkillModel 
	 */
	 private checkIfWantToDelete(selectedCourseMaterialModel: CourseMaterialModel) {
		this.translateService
			.get([
				'actionAlert.confirm',
				'actionAlert.delete',
				'option.yes',
				'option.no',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data => {

				const alert = await this.alertController.create({
					header: `${data['actionAlert.confirm']}`,
					subHeader: data['actionAlert.delete'],
					cssClass: 'custom-alert',
					mode: 'md',
					buttons: [
						{
							cssClass: 'ok-button ',
							text:  data['option.yes'],
							handler: (_) => selectedCourseMaterialModel ? this.courseMaterialStateFacade.actUponCourseMaterial(selectedCourseMaterialModel, OperationsEnum.DELETE) : undefined
						},
						{
							cssClass: 'cancel-button',
							text:  data['option.no'],
							handler: () => {
							}
						}
					]
				});
				await alert.present();
			});

	}
}

