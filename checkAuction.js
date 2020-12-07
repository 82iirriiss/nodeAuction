const { Op } = require('Sequelize');

const { Good, Auction, User, Sequelize, sequelize } = require('./models');

module.exports = async () => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday - 1);// 어제 시간
        const targets = await Good.findAll({
            where: {
                SoldId: null,
                createdAt: {[Op.lt]: yesterday },
            },
        });
        targets.forEach(async (target ) => {
            const success = await Auction.findOne({
                where: {GoodId: target.id},
                order: [['bid', 'DESC']]
            });
            
            await Good.update( {SoldId: success.UserId}, {where: {id: target.id}});
            await User.update({
                money: sequelize.literal(`money - ${success.bid}`),
            }, {where: {id: success.UserId}});
        });

    } catch (error) {
        console.error(error);
    }
}