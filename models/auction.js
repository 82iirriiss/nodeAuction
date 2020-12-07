const Sequelize = require('sequelize');

module.exports = class Auction extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            bid: { // 입찰가
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            msg: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Auction',
            tableName:'auctions',
            chatset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db){
        db.Auction.belongsTo(db.User);
        db.Auction.belongsTo(db.Good);
    }
};

//nodeauction 데이터베이스를 생성하기 위해 config/config.json을 데이터베이스에 맞게 수정 (sequelize init 시 자동 생성됨. 수정하면 됨)  