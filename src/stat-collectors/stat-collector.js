/**
 * Statistics collector
 * @abstract
 */
class StatCollector {
  /**
   * Constructor
   * @param {string} name - Name of the collector and statistics key when exporting
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
   * Collect statistics of an entity. That entity can be the directory itself or one of its children
   * @abstract
   * @param {string} path - Path to the entity
   * @param {fs.Stats} stat - fs.Stats of the entity
   * @return {Promise<*>} Result
   */
  async collect(path, stat) {}
}

module.exports = StatCollector
