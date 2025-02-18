function authenticate(req, res, next) {
  // We are just trying to mimic the authorization in which we actually check the JSON web token & if the token exists we communicate with the database to get the user

  const { user } = req.query

  if (user === 'adi') {
    req.user = { name: 'Adi', id: 3 }
    next()
  } else {
    res.status(401).send('<h1>Unauthorized</h1>')
  }
}

module.exports = authenticate
