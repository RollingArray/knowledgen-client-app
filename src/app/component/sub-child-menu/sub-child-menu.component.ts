/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary SubChildMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-25 18:11:00
 */

import { Component, OnInit, Input, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "sub-child-menu",
	templateUrl: "./sub-child-menu.component.html",
	styleUrls: ["./sub-child-menu.component.scss"],
})
export class SubChildMenuComponent extends BaseViewComponent implements OnInit
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
	@Input() childArticleId;

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
	subChildMenu$!: Observable<SubChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	totalNumberOfSubChildMenu$!: Observable<number>;

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
		this.subChildMenu$ = this.courseMaterialMenuStateFacade.subChildMenuByChildId$(this.childArticleId);
		this.totalNumberOfSubChildMenu$ = this.courseMaterialMenuStateFacade.totalNumberOfSubChildMenu$;
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

	async addNewSubChild()
	{
		let totalNumberOfSubChildMenu = 0;
		this.subChildMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfSubChildMenu = data.length)
		
		this.translateService
			.get([
				'button.addSubChildMenu',
				'button.cancel',
				'button.add',
				'loading.wait'
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string[]) =>
			{
				const alert = await this.alertController.create({
					header: data['button.addSubChildMenu'],
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
								const subChildMenuModel: SubChildMenuModel = {
									childArticleId: this.childArticleId,
									subChildArticleOrder: totalNumberOfSubChildMenu + 1,
									courseMaterialId: this.courseMaterialId,
									articleTitle: data.articleTitle,
									operationType: OperationsEnum.CREATE
								}
		
								await this.rootStateFacade.startLoading(data['loading.wait']);
												
								this.courseMaterialMenuStateFacade.addNewSubChildMenu(subChildMenuModel);
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
