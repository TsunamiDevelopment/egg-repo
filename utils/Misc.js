
function hash256(path) {
	return new Promise((resolve, reject) => {
		const hash = require('crypto').createHash('sha256');
		const rs = require('fs').createReadStream(path);
		rs.on('error', reject);
		rs.on('data', data => hash.update(data));
		rs.on('end', () => resolve(hash.digest('hex')));
	});
}

module.exports = { hash256 }