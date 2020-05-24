require('dotenv').config();
const db = require('./db.config.js');
const { Status } =  db;

db.sequelize.sync({force: true})
    .then(() => {
        Status.create({
            id: 1,
            name: "Принято"
        });

        Status.create({
            id: 2,
            name: "Отклонено"
        });

        Status.create({
            id: 3,
            name: "Ожидает"
        });

	    console.log('Drop and Resync with { force: true }');
    })
    .catch(error => {
        console.log(error);
    });

// const db = require('./app/config/db.config.js');
// const Role = db.role;
// const Category = db.category;


// function initial() {
// 	Role.create({
// 		id: 1,
// 		name: "USER"
// 	});

// 	Role.create({
// 		id: 2,
// 		name: "ADMIN"
// 	});
// }

// function initialCategory() {
// 	Category.create({
// 		id: 1,
// 		name: "Electronics"
// 	});

// 	Category.create({
// 		id: 2,
// 		name: "IT"
// 	});
// }

// db.sequelize.sync({force: true}).then(() => {
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS user_confirms_AFTER_DELETE;`);
// 	db.sequelize.query(`CREATE TRIGGER user_confirms_AFTER_DELETE AFTER DELETE ON user_confirms FOR EACH ROW
// 		BEGIN
// 			UPDATE users SET confirmed = 1 WHERE users.id = OLD.id_user;
// 		END`)
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS ratings_AFTER_INSERT;`);
// 	db.sequelize.query(`CREATE TRIGGER ratings_AFTER_INSERT AFTER INSERT ON ratings FOR EACH ROW
// 		BEGIN
// 			UPDATE guides Set
// 			rating = (select avg(rating) from ratings where guideId = NEW.guideId)
// 			where guides.id = new.guideId;
// 		END`);
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS likes_AFTER_INSERT;`);
// 	db.sequelize.query(`CREATE TRIGGER likes_AFTER_INSERT AFTER INSERT ON likes FOR EACH ROW
// 		BEGIN
// 			UPDATE comments	Set
// 			comments.like = (select count(*) from likes where commentId = new.commentId)
// 			where comments.id = new.commentId;
// 		END`);
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS likes_AFTER_DELETE;`);
// 	db.sequelize.query(`CREATE TRIGGER likes_AFTER_DELETE AFTER DELETE ON likes FOR EACH ROW
// 		BEGIN
// 			UPDATE comments	Set
// 			comments.like = (select count(*) from likes where commentId = old.commentId)
// 			where comments.id = old.commentId;
// 		END`);
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS users_BEFORE_DELETE;`);
// 	db.sequelize.query(`CREATE TRIGGER users_BEFORE_DELETE BEFORE DELETE ON users FOR EACH ROW
// 	BEGIN
// 		DELETE FROM comments
// 			where comments.userId = old.id;
// 		DELETE FROM guides
// 			where guides.userId = old.id;
// 	END`);
// 	db.sequelize.query(`DROP TRIGGER IF EXISTS guides_BEFORE_DELETE;`);
// 	db.sequelize.query(`CREATE TRIGGER guides_BEFORE_DELETE BEFORE DELETE ON guides FOR EACH ROW BEGIN
// 		DELETE FROM comments
// 			where comments.guideId = old.id;
// 		Delete From steps
// 			where steps.guideId = old.id;
// 	END`);
// 	console.log('Drop and Resync with { force: true }');
// 	initial();
// 	initialCategory();
// });
