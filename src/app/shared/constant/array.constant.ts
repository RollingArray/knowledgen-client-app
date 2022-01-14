/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Global array key
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:15:29 
 * Last modified  : 2021-12-27 18:03:55
 */


import { StringKey } from 'src/app/shared/constant/string.constant';
import { UserTypeEnum } from '../enum/user-type.enum';
import { RouteModel } from '../model/route.model';
import { SlideModel } from '../model/slide.model';
import { ApiUrls } from './api-urls.constant';

export class ArrayKey {
	/**
	 * App primary route pages of array key
	 */
	public static readonly APP_PRIMARY_ROUTE_PAGES: RouteModel[] = [
		{
			title: StringKey.MY_SPACE,
			children: [
				{
					title: StringKey.MY_ACTIVITY,
					url: ['my','activity'],
					icon: StringKey.ICON_TEACHER,
					allowAccess: [UserTypeEnum.Student]
				},
				{
					title: StringKey.MY_REVIEW,
					url: ['my','review'],
					icon: StringKey.ICON_TEACHER,
					allowAccess: [UserTypeEnum.Teacher]
				},
			]
		},
	];


	/**
	 * Intro slide array of array key
	 */
	public static readonly INTRO_SLIDE_ARRAY: SlideModel[] = [
		{
			title: StringKey.INTRO_SLIDE_0_TITLE,
			info: StringKey.INTRO_SLIDE_0_INFO,
			imageName: "inclusion",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.YOUTUBE
		},
		{
			title: StringKey.INTRO_SLIDE_1_TITLE,
			info: StringKey.INTRO_SLIDE_1_INFO,
			imageName: "no_project",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_PROJECT
		},
		{
			title: StringKey.INTRO_SLIDE_2_TITLE,
			info: StringKey.INTRO_SLIDE_2_INFO,
			imageName: "no_member",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_MEMBERS
		},
		{
			title: StringKey.INTRO_SLIDE_3_TITLE,
			info: StringKey.INTRO_SLIDE_3_INFO,
			imageName: "no_sprint",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_SPRINT
		},
		{
			title: StringKey.INTRO_SLIDE_4_TITLE,
			info: StringKey.INTRO_SLIDE_4_INFO,
			imageName: "no_goal",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_GOAL
		},
		{
			title: StringKey.INTRO_SLIDE_5_TITLE,
			info: StringKey.INTRO_SLIDE_5_INFO,
			imageName: "no_activity",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_ACTIVITY
		},
		{
			title: StringKey.INTRO_SLIDE_6_TITLE,
			info: StringKey.INTRO_SLIDE_6_INFO,
			imageName: "no_reviewer",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_REVIEWER
		},
		{
			title: StringKey.INTRO_SLIDE_7_TITLE,
			info: StringKey.INTRO_SLIDE_7_INFO,
			imageName: "no_diversity",
			buttonText: StringKey.SKIP_INTRO,
			helpUrl: ApiUrls.HELP_CREDIBILITY
		},
		{
			title: StringKey.INTRO_SLIDE_8_TITLE,
			info: StringKey.INTRO_SLIDE_8_INFO,
			imageName: "no_credibility",
			buttonText: StringKey.GOT_IT_CONTINUE,
			helpUrl: ApiUrls.HELP_OPPORTUNITY
		},
	];
}