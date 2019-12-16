
// module.exports.viewAll = async (req, res) => {
//   try {
//     const ranks = await rankTable.findAll();
//     res.json(ranks);
//   } catch (err) {
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// };

// module.exports.create = async (req, res) => {
//   if (!req.body.group || req.body.group.trim() == '') {
//     return res.status(400).json({
//       message: 'Group is required to create new ranks',
//     });
//   }
//   const newRank = {
//     group: req.body.group,
//     ranks: req.body.ranks ? req.body.ranks : [],
//   };

//   try {
//     const createdRank = await rankTable.create(newRank);
//     res.status(200).json(createdRank);
//   } catch (err) {
//     console.log(err);
//     if (err.errmsg && err.errmsg.indexOf('duplicate key') != -1) {
//       return res.status(400).json({message: 'Duplicated Group'});
//     }
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// };

// module.exports.update = async (req, res) => {
//   if (!req.params.rankId) {
//     return res.status(400).json({message: 'Invalid Id'});
//   }
//   if (Object.keys(req.body).length == 0) {
//     return res.status(400).json({message: 'Empty request is not allowed'});
//   }

//   const rankToUpdate = {};
//   if (req.body.group) {
//     if (req.body.group.trim() == '') {
//       return res.status(400).json({
//         message: 'Cannot set an empty name to group',
//       });
//     }
//     rankToUpdate['group'] = req.body.group;
//   }

//   if (req.body.ranks) {
//     rankToUpdate['ranks'] = req.body.ranks;
//   }

//   try {
//     const updatedRank = await rankTable.update(req.params.rankId, rankToUpdate);
//     res.status(200).json(updatedRank);
//   } catch (error) {
//     console.log(error);
//     if (error.errmsg && error.errmsg.indexOf('duplicate key') != -1) {
//       return res.status(400).json({message: 'Duplicated Group'});
//     }
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// };

// module.exports.delete = async (req, res) => {
//   if (!req.params.rankId) {
//     return res.status(400).json({message: 'Invalid Id'});
//   }
//   try {
//     const deletedRank = await rankTable.delete(req.params.rankId);
//     if (!deletedRank) {
//       return res.status(400).json({message: 'Invalid Id'});
//     }
//     res.status(200).json(deletedRank);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// };
