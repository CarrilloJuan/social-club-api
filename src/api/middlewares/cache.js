import cache from '../../db/cache-db';
import config from '../../config';

export default function cacheMiddleware(duration) {
  return (req, res, next) => {
    if (config.env === 'development') return next();
    let key = '__express__' + req.originalUrl || req.url;
    let cacheContent = cache.get(key);
    if (cacheContent) {
      res.send(JSON.parse(cacheContent));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
}
