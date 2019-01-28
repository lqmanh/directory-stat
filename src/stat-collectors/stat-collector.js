/**
 * Statistics collector
 * @abstract
 */
class StatCollector {
  /**
   * Constructor
   * @param {string} name - Name of the collector and property key when exporting staticstics
   */
  constructor(name) {
    /**
     * @private
     * @type {string}
     */
    this.name = name
  }

  /**
   * Get the name of the collector
   * @return {string} Name of the collector
   */
  getName() {
    return this.name
  }

  /**
   * Collect statistics of an entity like the directory itself or its children
   * @abstract
   * @param {string} path - Path to the entity
   * @param {fs.Stats} stat - Basic statistics of the entity
   */
  async collect(path, stat) {
    // need overriding
  }
}

module.exports = StatCollector
