const { SUCCESS, ERROR } = require("../helpers/constants")

const response = (success=true, info='', data=null) => {
  if (success) {
    return {
      type: SUCCESS,
      info: (info.length === 0 || typeof info !== 'string') ? 'No description' : info,
      data: data
    }
  } else {
    return {
      type: ERROR,
      info: (info.length === 0 || typeof info !== 'string') ? 'No description' : info,
      data: (data) ? data : undefined
    }
  }
}

module.exports = response;