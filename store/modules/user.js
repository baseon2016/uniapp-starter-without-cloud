
const user = {
	namespaced:true,
  state: {
		userInfo: {},
		hasLogin: false,
		appToken: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_USERINFO(state, provider) {
    	state.hasLogin = true;
    	state.userInfo = provider.user;
    	state.userInfo.dept = provider.dept;
			state.roles = provider.roles;
			state.permissions = provider.permissions;
			state.appToken = provider.token;
    },
    LOGOUT(state) {
    	state.appToken = '';
    	state.hasLogin = false;
    	state.userInfo = {};
    	state.roles = [];
    	state.permissions = [];
    	
    },
    
   
  },

  actions: {}
}

export default user
