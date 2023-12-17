import axios from 'axios'

export const fetchWithToken = async ({
  options = {},
  callbackIfSuccess = () => {},
  callbackIfFail = () => {},
}) => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    const response = await axios(options)
    if (response.status === 200) {
      callbackIfSuccess(response)
    }
  } catch (error) {
    console.error('Fetch API error', error)
    if (error.response.status === 401) {
      try {
        const refreshResponse = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh`,
          method: 'POST',
          data: {
            accessToken,
            refreshToken,
          },
        })
        if (refreshResponse.status === 200) {
          localStorage.setItem('accessToken', refreshResponse.data.accessToken)
          const requestAgain = await axios({
            ...options,
            headers: {
              authorization: refreshResponse.data.accessToken,
            },
          })
          if (requestAgain.status === 200) {
            callbackIfSuccess(requestAgain)
          }
        }
      } catch (error) {
        console.error('Refresh token error', error)
        if (error.response.status === 401 || error.response.status === 400) {
          callbackIfFail()
        }
      }
    }
  }
}
