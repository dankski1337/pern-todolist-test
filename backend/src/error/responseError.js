class responseError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export { responseError };
