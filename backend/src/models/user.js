class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static get id() {
    return this.id;
  }

  static get name() {
    return this.name;
  }

  static get email() {
    return this.email;
  }
}

export default User;
