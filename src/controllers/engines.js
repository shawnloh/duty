const Promise = require('bluebird');
const BlockoutDateEngine = require('../engines/blockoutdates');
const StatusEngine = require('../engines/status');


module.exports.purgeAll = async (req, res, next) => {
  try {
    await Promise.all(
        BlockoutDateEngine.purge(),
        StatusEngine.purge(),
    );
    res.status(200).json({message: 'Successfully purge all'});
  } catch (error) {
    next(error);
  }
};
