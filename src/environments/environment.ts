// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
	apiEndpoint: 'http://localhost:8000/api/',
	version: "15.104.134.12112",
	level: 'Local',
	firebaseConfig: {
		apiKey: "AIzaSyBEFrQ-gd8cxA2N00vKzDCV1_BGSQfGBHg",
		authDomain: "credibility-calculator.firebaseapp.com",
		projectId: "credibility-calculator",
		storageBucket: "credibility-calculator.appspot.com",
		messagingSenderId: "242580027220",
		appId: "1:242580027220:web:9e6577cec9b071d65ebac1",
		measurementId: "G-GXTFLTXDZ8"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
