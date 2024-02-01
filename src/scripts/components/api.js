const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
    headers: {
        authorization: 'd9f51b19-9a8e-4f34-b290-a0dcbdf65c0c',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const makeRequest = (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: config.headers,
        body: body ? JSON.stringify(body) : undefined
    };
    return fetch(`${config.baseUrl}/${url}`, options).then(handleResponse);
};

export const getProfileRequest = () => makeRequest('users/me');

export const getInitialCardsRequest = () => makeRequest('cards');

export const editProfileRequest = (name, about) =>
    makeRequest('users/me', 'PATCH', { name, about });

export const createNewCardRequest = (name, link) =>
    makeRequest('cards', 'POST', { name, link });

export const deleteCardRequest = (cardId) =>
    makeRequest(`cards/${cardId}`, 'DELETE');

export const cardLikeRequest = (cardId, method) =>
    makeRequest(`cards/likes/${cardId}`, method);

export const setNewAvatarRequest = (avatar) =>
    makeRequest('users/me/avatar', 'PATCH', { avatar: avatar })