/**
 * @swagger
 * /users:
 *  get:
 *    summary: 회원 전체 조회
 *    description: 전체 회원 조회
 *    tags: [User]
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *          applictaion/json:
 *            schema:
 *              type: array
 *              items:
 *                properties:
 *                  name:
 *                    type: string
 *                    example: "홍길동"
 *                  email:
 *                    type: string
 *                    example: "홍길동@홍길동.홍길동"
 *                  personal:
 *                    type: string
 *                    example: "700000-1******"
 *                  prefer:
 *                    type: string
 *                    example: "https://www.naver.com"
 *                  pwd:
 *                    type: string
 *                    example: "123456789"
 *                  phone:
 *                    type: string
 *                    example: "01000000000"
 *                  og:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                        example: "네이버"
 *                      description:
 *                        type: string
 *                        example: "네이버어쩌고저쩌고"
 *                      image:
 *                        type: string
 *                        example: "이미지주소 URL"
 *
 */

/**
 * @swagger
 * /users:
 *  post:
 *    summary: 회원 등록
 *    description: 회원 등록
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "홍길동"
 *              email:
 *                type: string
 *                example: "홍길동@홍길동.홍길동"
 *              personal:
 *                type: string
 *                example: "700000-1******"
 *              prefer:
 *                type: string
 *                example: "https://www.naver.com"
 *              pwd:
 *                type: string
 *                example: "123456789"
 *              phone:
 *                type: string
 *                example: "01000000000"
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *          text:
 *            schema:
 *              type: string
 *              example: "63edcc99c33ad2a5764968fb"
 *
 *      422:
 *        description: 에러
 *        content:
 *          text:
 *            schema:
 *              type: string
 *              example: "핸드폰 번호가 인증되지 않았습니다."
 */
