import type { MultisiteContextStep } from "./types";

export class MultisiteError extends Error {
	step: MultisiteContextStep;

	constructor(message: string, step: MultisiteContextStep) {
		super(message);
		this.name = "MultisiteError";
		this.step = step;
	}
}

export const createErrorHandler =
	(step: MultisiteContextStep) => (message: string) =>
		new MultisiteError(message, step);
