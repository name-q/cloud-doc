'use strict';
module.exports = (app) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { home } = controller

    get('/', home.index)
}