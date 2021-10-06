import { IUser, IAuth, IAuthSettings, AdditionalUserInfo, ActionCodeInfo, ActionCodeInfoOperation, UserCredential, UserProfileChangeRequest, IUserMetadata, IUserInfo, IActionCodeSettings, IAuthCredential, IOAuthCredential, IAuthTokenResult } from './common';
import { Firebase, FirebaseApp } from '@nativescript/firebase-core';

export { AdditionalUserInfo, ActionCodeInfo, ActionCodeInfoOperation, UserCredential, UserProfileChangeRequest };

export declare class UserMetadata implements IUserMetadata {
	readonly native;
	readonly ios;
	readonly android;

	readonly creationDate: Date;
	readonly lastSignInDate: Date;
}

export declare class UserInfo implements IUserInfo {
	readonly native;
	readonly ios;
	readonly android;

	readonly uid: string;
	readonly displayName: string;
	readonly email: string;
	readonly phoneNumber: string;
	readonly photoURL: string;
	readonly providerId: string;
}

export declare class User implements IUser {
	readonly uid: string;
	readonly displayName: string;
	readonly anonymous: boolean;
	readonly emailVerified: boolean;
	readonly email: string;
	readonly phoneNumber: string;
	readonly provideId: string;
	readonly photoURL: string;
	readonly metadata: UserMetadata;
	readonly providerData: UserInfo[];

	delete(): Promise<void>;
	getIdToken(forceRefresh?: undefined | false | true): Promise<string>;
	getIdTokenResult(forceRefresh?: undefined | false | true): Promise<IAuthTokenResult>;
	linkWithCredential(credential: IAuthCredential): Promise<UserCredential>;
	reauthenticateWithCredential(credential: IAuthCredential): Promise<UserCredential>;
	reload(): Promise<void>;
	sendEmailVerification(actionCodeSettings?: IActionCodeSettings): Promise<void>;
	unlink(providerId: string): Promise<IUser>;
	updateEmail(email: string): Promise<void>;
	updatePassword(password: string): Promise<void>;
	updatePhoneNumber(credential: IAuthCredential): Promise<void>;
	updateProfile(updates: UserProfileChangeRequest): Promise<void>;
	verifyBeforeUpdateEmail(email: string, actionCodeSettings?: IActionCodeSettings): Promise<void>;
}

export declare class AuthSettings implements IAuthSettings {
	readonly native;
	readonly ios;
	readonly android;

	appVerificationDisabledForTesting: boolean;
}

export declare class ActionCodeSettings implements IActionCodeSettings {
	readonly native;
	readonly ios;
	readonly android;

	url: string;
	androidInstallIfNotAvailable: boolean;
	androidMinimumVersion: string;
	androidPackageName: string;
	dynamicLinkDomain: string;
	handleCodeInApp: boolean;
	iOSBundleId: string;
}

export declare class AuthCredential implements IAuthCredential {
	readonly native;
	readonly ios;
	readonly android;
	signInMethod: string;

	readonly provider: string;
}

export declare class EmailAuthProvider {
	static credential(email: string, password: string): AuthCredential;

	static credentialWithLink(email: string, link: string): AuthCredential;
}

export declare class PhoneAuthProvider {
	readonly native;
	readonly ios;
	readonly android;

	static provider(auth?: Auth): PhoneAuthProvider;

	credential(verificationId: string, verificationCode: string): AuthCredential;

	verifyPhoneNumber(phoneNumber: string): Promise<string>;
}

export declare class AppleAuthProvider {
	static credential(idToken: string, nonce: string): AuthCredential;
}

export declare class FacebookAuthProvider {
	static credential(accessToken: string): AuthCredential;
}

export declare class GithubAuthProvider {
	static credential(token: string): AuthCredential;
}

export declare class GoogleAuthProvider {
	static credential(idToken: string, accessToken: string): AuthCredential;
}

export declare class OAuthCredential extends AuthCredential implements IOAuthCredential {
	readonly native;
	readonly ios;
	readonly android;

	signInMethod: string;

	readonly idToken: string;
	readonly accessToken: string;
	readonly secret: string;
}

export declare class OAuthProvider {
	constructor(providerId: string);

	credential(optionsOrIdToken: OAuthCredentialOptions | string | null, accessToken?: string): OAuthCredential;
}

export declare class TwitterAuthProvider {
	static credential(token: string, secret: string): AuthCredential;
}

export declare class PhoneAuthCredential extends AuthCredential implements IPhoneAuthCredential {
	readonly native;
	readonly ios;
	readonly android;
}

export declare class AuthTokenResult implements IAuthTokenResult {
	readonly authDate: Date;
	readonly claims: Record<string, any>;
	readonly expirationDate: Date;
	readonly issuedAtDate: Date;
	readonly signInProvider: string;
	readonly token: string;
}

export declare class Auth implements IAuth {
	readonly app: FirebaseApp;
	readonly currentUser: IUser;
	readonly languageCode: string;
	readonly settings: IAuthSettings;
	readonly tenantId: string;

	useEmulator(host: string, port: number);

	applyActionCode(code: string): Promise<void>;

	checkActionCode(code: string): Promise<ActionCodeInfo>;

	confirmPasswordReset(code: string, newPassword: string): Promise<void>;

	createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;

	fetchSignInMethodsForEmail(email: string): Promise<string[]>;

	isSignInWithEmailLink(emailLink: string): boolean;

	addAuthStateChangeListener(listener: (user: IUser) => void);

	removeAuthStateChangeListener(listener: (user: IUser) => void);

	addIdTokenChangeListener(listener: (user: IUser) => void);

	removeIdTokenChangListener(listener: (user: IUser) => void);

	sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings): Promise<void>;

	sendSignInLinkToEmail(email: string, actionCodeSettings?: ActionCodeSettings): Promise<void>;

	signInAnonymously(): Promise<UserCredential>;

	signInWithCredential(credential: IAuthCredential): Promise<UserCredential>;

	signInWithCustomToken(customToken: string): Promise<UserCredential>;

	signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;

	signInWithEmailLink(email: string, emailLink: string): Promise<UserCredential>;

	signOut(): boolean;

	useUserAccessGroup(userAccessGroup: string): Promise<void>;

	verifyPasswordResetCode(code: string): Promise<string>;
}

declare module '@nativescript/firebase-core' {
	export interface Firebase extends FirebaseAuth {}
}

export interface FirebaseAuth {
	static auth(app?: FirebaseApp): Auth;
}