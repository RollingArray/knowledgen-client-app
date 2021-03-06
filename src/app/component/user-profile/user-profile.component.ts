import { PlatformHelper } from "src/app/shared/helper/platform.helper";
import { Component, OnInit, OnDestroy, Input, Injector, ViewChild } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { UserModel } from "src/app/shared/model/user.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { UserService } from "src/app/shared/service/user.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { IonSlides, NavParams } from "@ionic/angular";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { BaseModel } from "src/app/shared/model/base.model";
import { takeUntil } from "rxjs/operators";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent extends BaseFormComponent
	implements OnInit, OnDestroy
{
	@Input() data: string;
	userModel: UserModel;
	modalData: ModalData;
	ifFormActive: boolean;
	isApp = true;
	/**
	 * @description Segment  of skill requirement page
	 */
	 private _segment!: number;

	/**
	 * @description Gets segment
	 */
	 public get segment(): number {
		return this._segment;
	 }
	
	 public set segment(value: number) {
		this._segment = value;
	}
	
	@ViewChild('slides', { static: false }) slides: IonSlides;
	
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private userService: UserService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		private localStorageService: LocalStorageService,
		private platformHelper: PlatformHelper,
		//private avatarService: AvatarService
	)
	{
		super(injector);
		this.ifFormActive = false;
		this.getActiveUser();
		this.buildFrom();
		this.isApp = this.platformHelper.isApp();
	}

	private getActiveUser()
	{
		this.localStorageService
			.getActiveUser()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: UserModel) =>
			{
				this.userModel = data;
			});
	}

	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;

		form.userFirstName = this.userModel.userFirstName;
		form.userLastName = this.userModel.userLastName;
		form.userEmail = this.userModel.userEmail;

		this.formGroup.disable();
	}
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userFirstName: [
				this.userModel.userFirstName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userLastName: [
				this.userModel.userLastName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userEmail: [
				this.userModel.userEmail,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userSkills: [
				this.userModel.userSkills,
				this.validators().compose([
					//
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	//get user email
	get userFirstName()
	{
		return this.formGroup.get("userFirstName");
	}

	get userLastName()
	{
		return this.formGroup.get("userLastName");
	}

	get userEmail()
	{
		return this.formGroup.get("userEmail");
	}

	get userSkills()
	{
		return this.formGroup.get("userSkills");
	}

	async edit()
	{
		this.formGroup.enable();
		this.ifFormActive = true;
	}

	// submit login
	async submit()
	{
		if (this.formGroup.invalid)
		{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else
		{
			await this.submitData();
		}
	}

	async submitData()
	{
		//start loader
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		//build pass post data
		const form = this.formGroup.value;
		this.userModel.userFirstName = form.userFirstName;
		this.userModel.userLastName = form.userLastName;
		this.userModel.userEmail = form.userEmail;
		this.userModel.userSkills = form.userSkills;
		this.userModel.operationType = OperationsEnum.EDIT

		//send api response
		this.userService
			.userProfileUpdate(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) =>
				{
					//stop loading
					await this.loadingService.dismiss();

					//check if success response case back
					if (baseModel.success)
					{
						await this.localStorageService
							.updateActiveUserDetails(this.userModel)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async () =>
							{
								//model response when modal close
								this.modalData = {
									cancelled: false,
									operationSubmitted: true,
								};

								//toast api response
								await this.presentToast(baseModel.message);

								// store active user
								this.dismissModal();

								this.formGroup.enable();
								this.ifFormActive = true;
							});
					}
				},
				(error) =>
				{
					this.loadingService.dismiss();
				}
			);
	}

	closeModal()
	{
		this.modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}

	dismissModal()
	{
		this.modalController.dismiss(this.modalData).then(() => { });
	}

	ngOnInit()
	{
		this._segment = 0;
	}

	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * @description Segments changed
	 * @param event 
	 */
	// tslint:disable:no-any
	segmentChanged(event: any) {
		//this._hasRequirementDetailsData = false;

		//this.slides.slideTo(ev.detail.value);
		switch (event.detail.value) {
			case '0':
				// this.myAppliedRequirements();
				// this._showAddSkillRequirement = false;
				break;
			case '1':
				// this.openRequirements();
				// this._showAddSkillRequirement = false;
				break;
			case '2':
				// this.myRequirements();
				// this._showAddSkillRequirement = true;
				break;
			default:
				break;
		}
		//this.slideTo();
	}

	onSlideChanged()
	{
		
	}
}
