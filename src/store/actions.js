import * as types from './types'

const floor = {
  image: 'http://img.friv5games.com/2016/03/21/police-station-floor-plans-l-48401def008c3ef9.jpg',
  desks: [{ 'width': 16, 'height': 25, 'x': 330, 'y': 76, 'id': '76715776' }, { 'width': 13, 'height': 23, 'x': 347, 'y': 78, 'id': '41502543' }, { 'width': 34, 'height': 15, 'x': 327, 'y': 121, 'id': '54701481' }, { 'width': 17, 'height': 25, 'x': 467, 'y': 72, 'id': '70191960' }, { 'width': 16, 'height': 26, 'x': 488, 'y': 71, 'id': '72034771' }, { 'width': 15, 'height': 26, 'x': 469, 'y': 99, 'id': '98909403' }, { 'width': 18, 'height': 25, 'x': 486, 'y': 98, 'id': '31285833' }, { 'width': 16, 'height': 29, 'x': 467, 'y': 151, 'id': '40336869' }, { 'width': 15, 'height': 30, 'x': 487, 'y': 152, 'id': '93465707' }, { 'width': 21, 'height': 20, 'x': 464, 'y': 183, 'id': '92481760' }, { 'width': 12, 'height': 19, 'x': 488, 'y': 181, 'id': '23038438' }]
}

export default {
  [types.FETCH_FLOOR]({ commit, state }) {
    return new Promise((resolve, reject) => {
      // simulate asynchrony
      setTimeout(() => {
        commit(types.UPDATE_FLOOR, { floor })
      }, 500)
    })
  },

  [types.CREATE_DESK]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const desk = payload.desk
      desk.id = Math.random().toString().substring(2, 10)

      commit(types.CREATE_DESK, payload)
      resolve(desk)
    })
  }
}
