import {combineReducers} from 'redux';

import * as UserActions from '../actions/UserActions';
import {getIds, reduceUser} from './utils';

function ids(state = {}, action) {
    let selection_key = action.selection || 'default';
    let new_state = {};
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
            new_state[selection_key] = getIds(action.items);
            return {...state, ...new_state};
        case UserActions.LIST_MORE_USERS_SUCCESS:
            new_state[selection_key] = [
                ...state[selection_key],
                ...getIds(action.items),
            ];
            return {...state, ...new_state};
        case UserActions.LIST_USERS_START:
            if (action.prev_selection && state[action.prev_selection]) {
                new_state[selection_key] = state[action.prev_selection];
                return {...state, ...new_state};
            }
            return state;
        case UserActions.LIST_USERS_FAILED:
            return state;
        default:
            return state;
    }
}

function users(state = {}, action) {
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
        case UserActions.LIST_MORE_USERS_SUCCESS:
            let all_users = {};
            action.items.forEach(user => {
                all_users[user.id] = reduceUser(null, user);
            });
            return {...state, ...all_users};
        case UserActions.RETRIEVE_USER_SUCCESS:
        case UserActions.UPDATE_USER_SUCCESS:
            let new_user = {};
            new_user[action.user.id] = reduceUser(null, action.user);
            return {...state, ...new_user};
        default:
            return state;
    }
}

function usernameToId(state = {}, action) {
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
        case UserActions.LIST_MORE_USERS_SUCCESS:
            let all_users = {};
            action.items.forEach(user => {
                all_users[user.username] = user.id;
            });
            return {...state, ...all_users};
        case UserActions.RETRIEVE_USER_SUCCESS:
        case UserActions.UPDATE_USER_SUCCESS:
            let new_user = {};
            new_user[action.user.username] = action.user.id;
            return {...state, ...new_user};
        default:
            return state;
    }
}

function isInviting(state = false, action) {
    switch (action.type) {
        case UserActions.CREATE_USER_START:
        case UserActions.INVITE_START:
            return true;
        case UserActions.CREATE_USER_SUCCESS:
        case UserActions.CREATE_USER_FAILED:
        case UserActions.INVITE_SUCCESS:
        case UserActions.INVITE_FAILED:
            return false;
        default:
            return state;
    }
}

function hasInvited(state = false, action) {
    switch (action.type) {
        case UserActions.CREATE_USER_SUCCESS:
        case UserActions.INVITE_SUCCESS:
            return true;
        case UserActions.CREATE_USER_START:
        case UserActions.CREATE_USER_FAILED:
        case UserActions.INVITE_START:
        case UserActions.INVITE_FAILED:
            return false;
        default:
            return state;
    }
}

function isRetrieving(state = {}, action) {
    let targetKey = action.id || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.RETRIEVE_USER_START:
            newState[targetKey] = true;
            return {...state, ...newState};
        case UserActions.RETRIEVE_USER_SUCCESS:
        case UserActions.RETRIEVE_USER_FAILED:
            newState[targetKey] = false;
            return {...state, ...newState};
        default:
            return state;
    }
}

function isFetching(state = {}, action) {
    let selectionKey = action.selection || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.LIST_USERS_START:
            newState[selectionKey] = true;
            return {...state, ...newState};
        case UserActions.LIST_USERS_SUCCESS:
        case UserActions.LIST_USERS_FAILED:
            newState[selectionKey] = false;
            return {...state, ...newState};
        default:
            return state;
    }
}

function isFetchingMore(state = {}, action) {
    let selectionKey = action.selection || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.LIST_MORE_USERS_START:
            newState[selectionKey] = true;
            return {...state, ...newState};
        case UserActions.LIST_MORE_USERS_SUCCESS:
        case UserActions.LIST_MORE_USERS_FAILED:
            newState[selectionKey] = false;
            return {...state, ...newState};
        default:
            return state;
    }
}

function next(state = {}, action) {
    let selectionKey = action.selection || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
        case UserActions.LIST_MORE_USERS_SUCCESS:
            newState[selectionKey] = action.next;
            return {...state, ...newState};
        default:
            return state;
    }
}

function previous(state = {}, action) {
    let selectionKey = action.selection || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
        case UserActions.LIST_MORE_USERS_SUCCESS:
            newState[selectionKey] = action.previous;
            return {...state, ...newState};
        default:
            return state;
    }
}

function count(state = {}, action) {
    let selectionKey = action.selection || 'default';
    let newState = {};
    switch (action.type) {
        case UserActions.LIST_USERS_SUCCESS:
            newState[selectionKey] = action.count;
            return {...state, ...newState};
        case UserActions.LIST_USERS_START:
        case UserActions.LIST_USERS_FAILED:
            newState[selectionKey] = 0;
            return {...state, ...newState};
        default:
            return state;
    }
}

function errors(state = {}, action) {
    switch (action.type) {
        case UserActions.CREATE_USER_FAILED:
        case UserActions.INVITE_FAILED:
            return {...state, invite: action.error};
        case UserActions.CREATE_USER_START:
        case UserActions.CREATE_USER_SUCCESS:
        case UserActions.INVITE_START:
        case UserActions.INVITE_SUCCESS:
            return {...state, invite: null};
        case UserActions.REQUEST_USER_FAILED:
            return {...state, request: action.error};
        case UserActions.REQUEST_USER_START:
        case UserActions.REQUEST_USER_SUCCESS:
            return {...state, request: null};
        default:
            return state;
    }
}

function isRequesting(state = false, action) {
    switch (action.type) {
        case UserActions.REQUEST_USER_START:
            return true;
        case UserActions.REQUEST_USER_SUCCESS:
        case UserActions.REQUEST_USER_FAILED:
            return false;
        default:
            return state;
    }
}

function hasRequested(state = false, action) {
    switch (action.type) {
        case UserActions.REQUEST_USER_SUCCESS:
            return true;
        case UserActions.REQUEST_USER_START:
        case UserActions.REQUEST_USER_FAILED:
            return false;
        default:
            return state;
    }
}

const User = combineReducers({
    ids,
    users,
    usernameToId,
    isInviting,
    hasInvited,
    isRetrieving,
    isFetching,
    isFetchingMore,
    isRequesting,
    hasRequested,
    next,
    previous,
    count,
    errors,
});

export default User;
