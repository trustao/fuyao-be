import Router from "@koa/router";

const router = new Router();


router.get('/', (ctx, next) => {
  // ctx.router available

  ctx.body = 'ok'
});


export default router
