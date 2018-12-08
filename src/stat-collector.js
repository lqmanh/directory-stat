module.exports = class StatCollector {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  async collect(path, stat) {
    // need overriding
  }
}
