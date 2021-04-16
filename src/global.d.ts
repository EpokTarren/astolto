declare interface Colours {
	default: number;
	error: number;
}

declare let colours: Colours;

declare namespace NodeJS {
	interface Global {
		colours: Colours;
	}
}
