export class NoEndpointsException extends Error {
  constructor(message?: string) {
    super(message);
    // see: typescriptlang.org/.doc/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = NoEndpointsException.name; // stack traces display correctly now
  }
}
