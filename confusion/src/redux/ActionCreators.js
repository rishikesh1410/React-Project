import * as ActionTypes from './ActionTypes';
import fetch from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});
// MiddleWare and Thunk
export const postFeedback = (values) => (dispatch) => {
    var newFeedback = {
        firstname: values.firstname,
        lastname: values.lastname,
        telnum: values.telnum,
        email: values.email,
        agree: values.agree,
        contactType: values.contactType,
        message: values.message
    }
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl+'feedback',{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = Error(error.message);
            throw errmess;
    })
    .then(response => response.json())
    .then(feedback => dispatch(addFeedback(feedback)))
    .catch(error => {
        console.log("Error posting feedback\n" + error.message);
        alert("Your feedback hasn't sent");
    });
}

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment
});
// MiddleWare and Thunk
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    var newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment:comment
    }
    newComment.date = new Date().toISOString();
    return fetch(baseUrl+'comments',{
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = Error(error.message);
            throw errmess;
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
        console.log("Error posting comment\n" + error.message);
        alert("Your comment hasn't posted");
    });
}
// MiddleWare and Thunk
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = Error('Error '+ response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// MiddleWare and Thunk
export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl+'comments')
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = Error('Error '+ response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// MiddleWare and Thunk
export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = Error('Error '+ response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error => dispatch(promosFailed(error.message)));

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// MiddleWare and Thunk
export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = Error('Error '+ response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});