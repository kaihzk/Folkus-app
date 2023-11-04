module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('tasks', 'taskStatus', { transaction });

      await queryInterface.removeColumn('tasks', 'status', { transaction });

      await queryInterface.addColumn(
        'tasks',
        'taskStatus',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['To-Do', 'In-Progress', 'Finished'],
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('tasks', 'taskStatus', { transaction });

      await queryInterface.addColumn(
        'tasks',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['To-Do', 'In-Progress', 'Finished'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'taskStatus',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
