class User {
  constructor(id, name, email, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
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

  static get type() {
    return this.type;
  }
}

export default User;
