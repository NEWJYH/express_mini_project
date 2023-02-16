/**
 * @swagger
 * /tokens/phone:
 *  post:
 *    summary: 토큰 발급
 *    description: 휴대폰 토큰 발급
 *    tags: [Token]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              myphone:
 *                type: string
 *                example: "01012341234"
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *          text:
 *            schema:
 *              type: string
 *              example: "01012341234으로 인증 문자가 전송되었습니다."
 */

/**
 * @swagger
 * /tokens/phone:
 *  patch:
 *    summary: 토큰 인증
 *    description: 휴대폰 토큰 인증
 *    tags: [Token]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              myphone:
 *                type: string
 *                example: "01012341234"
 *              mytoken:
 *                type: string
 *                example: "015245"
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *          text:
 *            schema:
 *              type: boolean
 *              example: true
 *      422:
 *        description: 실패
 *        content:
 *          text:
 *            schema:
 *              type: boolean
 *              example: false
 */
