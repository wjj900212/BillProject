import db from 'utils/localstorage'

export default {
  namespaced: true,
  state: {
    token: db.get('USER_TOKEN'),
    expireTime: db.get('EXPIRE_TIME'),
    user: db.get('USER'),
    permissions: db.get('PERMISSIONS'),
    roles: db.get('ROLES'),
    cityCode: db.get('CITY_CODE'),
    cityType: db.get('CITY_TYPE'),
    cityName: db.get('CITY_NAME')
  },
  mutations: {
    setToken (state, val) {
      db.save('USER_TOKEN', val)
      state.token = val
    },
    setExpireTime (state, val) {
      db.save('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser (state, val) {
      db.save('USER', val)
      state.user = val
    },
    setPermissions (state, val) {
      db.save('PERMISSIONS', val)
      state.permissions = val
    },
    setRoles (state, val) {
      db.save('ROLES', val)
      state.roles = val
    },
    setCityCode (state, val) {
      db.save('CITY_CODE', val)
      state.cityCode = val
    },
    setCityType (state, val) {
      db.save('CITY_TYPE', val)
      state.cityType = val
    },
    setCityName (state, val) {
      db.save('CITY_NAME', val)
      state.cityName = val
    }
  }
}
