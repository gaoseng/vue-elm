import {
	getUser
} from '../service/getData'
import {
	GET_USERINFO
} from './mutation_type'

export default {
    increment (context){
        context.commit('increment');
    },
    add({commit}){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                commit('increment');
                resolve();
            },1000)
        })
    },
    async getUserInfo({commit}){
        // console.log(123)
        let res = await getUser();
        // console.log(321);
        // console.log(res);
		commit(GET_USERINFO, res.data)
    }
}
