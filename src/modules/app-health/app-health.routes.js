/**
 *
 */
module.exports = ({ router, AppHealthController, makeExpressCallback }) => {
  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Check the health status of the application
   *     responses:
   *       200:
   *         description: Health status of the application
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 database:
   *                   type: object
   *                   properties:
   *                     status:
   *                       type: string
   *                       example: "up"
   *                 app:
   *                   type: object
   *                   properties:
   *                     status:
   *                       type: string
   *                       example: "up"
   */
  router.get('/', makeExpressCallback(AppHealthController.getAppHealth));

  return router;
};
