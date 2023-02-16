/**
 * @swagger
 * /starbucks:
 *  get:
 *    summary: 커피 목록 전체 조회
 *    description: 커피 목록 전체 조회
 *    tags: [Starbucks]
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *         aplication/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "콜드블루"
 *               img:
 *                 type: string
 *                 example: "이미지 url"
 *
 */
