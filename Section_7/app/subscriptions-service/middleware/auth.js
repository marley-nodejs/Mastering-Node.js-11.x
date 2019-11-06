const passport = require('passport');
const JwtStrtegy = require('passport-jwt').Strategy;
const ExtractStrategy = require('passport-jwt').ExtractJwt;

module.exports = function AuthMiddleware(app) {
  const authStrategy = new JwtStrtegy(
    {
      secretOrKey: process.env.AUTH_SECRET,
      algorithms: ['HS256'],
      issuer: process.env.TOKEN_ISSUER,
      ignoreExpiration: false,
      jwtFromRequest: ExtractStrategy.fromAuthHeaderWithScheme('Bearer') // Authorization: Bearer <TOKEN>
    },
    async (payload, done) => {
      id = parseInt(payload.sub);
      if (id) {
        done(null, id);
      } else {
        done(null, false);
      }
    }
  );

  passport.use(authStrategy);
  app.use(passport.initialize());
};
