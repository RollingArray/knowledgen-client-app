/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary ParentMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-20 01:14:17
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { SlideModel } from "src/app/shared/model/slide.model";
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';

@Component({
	selector: "parent-menu",
	templateUrl: "./parent-menu.component.html",
	styleUrls: ["./parent-menu.component.scss"],
})
export class ParentMenuComponent extends BaseViewComponent implements OnInit
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
	parentMenuMenu$!: Observable<ParentMenuModel[]>;

	private _courseMaterialId: string;

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

	get courseMaterialId()
	{
		return this._courseMaterialId;
	}
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
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.translateService
			.get('loading.holdTight')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				this.errorMessage = data;
			});
		this.loadData();

		this.parentMenuMenu$.subscribe(data =>
			{
				console.log("a" , data);
				this.router.navigate([
					'go/course/material',
					this.courseMaterialId,
					'details',
					'article',
					data[0].parentArticleId
				]);
			})
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets course material material
	 */
	async getCourseMaterialMenu()
	{

		const courseMaterialModel: CourseMaterialModel = {
			courseMaterialId: this._courseMaterialId
		};

		this.translateService
			.get('loading.wait')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		this.courseMaterialMenuStateFacade.requestCourseMaterial(courseMaterialModel);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Loads data
	 */
	public loadData()
	{
		this._courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');
		this.getCourseMaterialMenu();
		this.parentMenuMenu$ = this.courseMaterialMenuStateFacade.menuByCourseMaterialId$(this._courseMaterialId);
		
		
	}

	async addNewParentMenu()
	{
		let totalNumberOfMenu = 0;
		this.parentMenuMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfMenu = data.length)

		this.translateService
			.get([
				'button.addMenu',
				'button.cancel',
				'button.add',
				'loading.wait'
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string[]) =>
			{
				const alert = await this.alertController.create({
					header: data['button.addMenu'],
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
								const parentMenuModel: ParentMenuModel = {
									parentArticleOrder: totalNumberOfMenu + 1,
									courseMaterialId: this.courseMaterialId,
									articleTitle: data.articleTitle,
									operationType: OperationsEnum.CREATE
								}

								await this.rootStateFacade.startLoading(data['loading.wait']);

								this.courseMaterialMenuStateFacade.addNewParentMenu(parentMenuModel);
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
