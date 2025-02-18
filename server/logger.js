// Let's demonstrate middleware
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const date = new Date().getFullYear()

  console.log(method, url, date) // logging
  //   res.send('Testing Middleware!')
  console.log('I am the logger middleware')
  next()
}

module.exports = logger
