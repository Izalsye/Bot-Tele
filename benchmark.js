const autocannon = require('autocannon');

/**
 * Run HTTP benchmark using Autocannon
 * @param {string} url - target URL
 * @param {object} options - optional: {connections, duration, method}
 * @returns {Promise<object>} - hasil benchmark summary
 */
async function runBenchmark(url, options = {}) {
  const defaultOptions = {
    connections: 10,  // default koneksi paralel
    duration: 5,      // default 5 detik
    method: 'GET',
  };

  const opts = { ...defaultOptions, ...options, url };

  return new Promise((resolve, reject) => {
    const instance = autocannon(opts, (err, results) => {
      if (err) return reject(err);
      resolve({
        avgLatency: results.latency.avg.toFixed(2) + ' ms',
        maxLatency: results.latency.max.toFixed(2) + ' ms',
        reqPerSec: results.requests.mean.toFixed(0),
        totalRequests: results.requests.total,
        totalBytes: (results.bytes.total / (1024*1024)).toFixed(2) + ' MB'
      });
    });

    // optional: live logs
    autocannon.track(instance, {renderProgressBar: false});
  });
}

module.exports = { runBenchmark };
