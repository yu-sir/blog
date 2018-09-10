import fetch from '../config/fetch.js';

export const login = params => fetch({
    url: '/admin/login',
    type: 'POST',
    data: params
});

export const artList = params => fetch({
    url: '/article/artList',
    type: 'GET',
    data: params
});

export const getArticleInfo = params => fetch({
    url: '/artcle/getArticleInfo',
    type: 'GET',
    data: params
});

export const getTagsList = params => fetch({
    url: '/tags/getTagsList',
    type: 'GET',
    data: params
})