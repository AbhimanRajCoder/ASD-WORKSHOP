const cache = {};

function clearCache() {
  for (const key in cache) {
    delete cache[key];
  }
}

function cacheMiddleware(req, res, next) {
  if (req.method === "GET") {
    const key = req.originalUrl || req.url;

    if (cache[key]) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cache[key].data);
    }

    res.setHeader("X-Cache", "MISS");

    const originalJson = res.json.bind(res);
    res.json = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache[key] = {
          data: body,
          timestamp: Date.now()
        };
      }
      return originalJson(body);
    };

    return next();
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    let invalidated = false;
    const invalidate = () => {
      if (!invalidated && res.statusCode >= 200 && res.statusCode < 300) {
        clearCache();
        invalidated = true;
      }
    };

    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    res.json = function (body) {
      invalidate();
      return originalJson(body);
    };

    res.send = function (body) {
      invalidate();
      return originalSend(body);
    };
  }

  next();
}

module.exports = {
  cacheMiddleware,
  clearCache,
  cache
};
