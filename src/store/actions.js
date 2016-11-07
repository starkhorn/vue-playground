import * as types from './types'

const floor = {
  'image': 'http://img.friv5games.com/2016/03/21/police-station-floor-plans-l-48401def008c3ef9.jpg',
  'desks': [{ 'id': '53076482', 'x': 244.5, 'y': 295, 'width': 28, 'height': 24 }, { 'id': '18284497', 'x': 245.5, 'y': 401, 'width': 24, 'height': 21 }, { 'id': '47276310', 'x': 263.5, 'y': 189, 'width': 119, 'height': 48 }, { 'id': '25569033', 'x': 531.5, 'y': 161, 'width': 50, 'height': 31 }, { 'id': '76003181', 'x': 531.5, 'y': 197, 'width': 47, 'height': 28 }, { 'id': '33670476', 'x': 640.5, 'y': 149, 'width': 31, 'height': 47 }, { 'id': '61102791', 'x': 676.5, 'y': 150, 'width': 31, 'height': 48 }, { 'id': '71125633', 'x': 643.5, 'y': 233, 'width': 56, 'height': 31 }]
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

  [types.CREATE_DESK]({ commit, state }, { desk }) {
    const newDesk = {
      ...desk,

      id: Math.random().toString().substring(2, 10)
    }

    commit(types.CREATE_DESK, {
      desk: newDesk
    })

    return newDesk
  },

  [types.UPDATE_DESK]({ commit, state }, { desk }) {
    commit(types.UPDATE_DESK, {
      desk
    })
  }
}
