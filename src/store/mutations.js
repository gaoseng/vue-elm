
import {RECORD_USERINFO,GET_USERINFO} from './mutation_type'
import {setStore} from './../config/mUtils'
export default {
    increment (state){
        state.acount++;
    },
    [RECORD_USERINFO](state,info){
        state.userInfo = info;
        state.login = true;
        setStore('user_id',info.id);

    },
    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
        // console.log(info);
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
    }
    

}