/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Api urls
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:34:14 
 * Last modified  : 2022-01-07 19:26:15
 */

import { environment } from "../../../environments/environment";

export class ApiUrls {
	public static readonly API_ENDPOINT: string = environment.apiEndpoint;
	public static readonly API_VERSION: string = "v1";
	public static readonly API_BASE_PATH: string = ApiUrls.API_ENDPOINT + ApiUrls.API_VERSION;

	// urls
	public static readonly SIGN_IN: string = ApiUrls.API_BASE_PATH + "/user/sign/in";
	public static readonly SIGN_UP: string = ApiUrls.API_BASE_PATH + "/user/sign/up";
	public static readonly USER_ACTIVATE: string = ApiUrls.API_BASE_PATH + "/user/activate";
	public static readonly USER_ACTIVATE_CODE_RESEND: string = ApiUrls.API_BASE_PATH + "/user/activate/code/resend";
	
	public static readonly USER_DETAILS: string = ApiUrls.API_BASE_PATH + "/user/details/";
	public static readonly USER_PROFILE_UPDATE: string = ApiUrls.API_BASE_PATH + "/user/profile/update/";
		
	public static readonly PH: string = "https://www.producthunt.com/posts/c2-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-c2-2";
	public static readonly YOUTUBE: string = "https://youtu.be/H89ltgkk6T0";
	public static readonly GITHUB: string = "https://github.com/RollingArray/C2-storyline";
	public static readonly RA: string = 'https://rollingarray.co.in/';
	public static readonly HELP_BASE: string = 'https://c2.doc.rollingarray.co.in/';
	public static readonly HELP_BASE_ARTICLE: string = 'https://c2.doc.rollingarray.co.in/#/go/articles/';
	public static readonly HELP: string = ApiUrls.HELP_BASE;
	public static readonly HELP_PP: string = ApiUrls.HELP_BASE_ARTICLE + "privacy-policy";
	public static readonly HELP_T_C: string = ApiUrls.HELP_BASE_ARTICLE + "terms-conditions";
	public static readonly HELP_AUTH: string = ApiUrls.HELP_BASE_ARTICLE + "authentication-&-authorization";
	public static readonly HELP_SIGN_UP: string = ApiUrls.HELP_BASE_ARTICLE + "sign-up";
	public static readonly HELP_SIGN_IN: string = ApiUrls.HELP_BASE_ARTICLE + "sign-in";
	public static readonly HELP_PROFILE: string = ApiUrls.HELP_BASE_ARTICLE + "my-profile";
	public static readonly HELP_MY_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "my-projects";
	public static readonly HELP_NEW_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "create-new-project";
	public static readonly HELP_EDIT_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "edit-existing-project-details";

	public static readonly HELP_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "projects";
	public static readonly HELP_MEMBERS: string = ApiUrls.HELP_BASE_ARTICLE + "project-team";
	public static readonly HELP_SPRINT: string = ApiUrls.HELP_BASE_ARTICLE + "sprint";
	public static readonly HELP_GOAL: string = ApiUrls.HELP_BASE_ARTICLE + "goal";
	public static readonly HELP_ACTIVITY: string = ApiUrls.HELP_BASE_ARTICLE + "activity";
	public static readonly HELP_MEASUREMENT: string = ApiUrls.HELP_BASE_ARTICLE + "measurement-criteria";
	public static readonly HELP_CHARACTER: string = ApiUrls.HELP_BASE_ARTICLE + "measurement-criteria-characteristics";
	public static readonly HELP_REVIEWER: string = ApiUrls.HELP_BASE_ARTICLE + "reviewer";
	public static readonly HELP_FEEDBACK: string = ApiUrls.HELP_BASE_ARTICLE + "feedback-classification-&-calculating-performance";
	public static readonly HELP_WEIGHTED_PERFORMANCE: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-weighted-performances";
	public static readonly HELP_ACTIVITY_PERFORMANCE: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-activity-performance";
	public static readonly HELP_CREDIBILITY: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-credibility";
	public static readonly HELP_OPPORTUNITY: string = ApiUrls.HELP_BASE_ARTICLE + "define-equal-opportunities";

}
