module.exports = (app) => {
    const classController = require('../controller/class.controller.js');
    const studentController = require('../controller/student.controller.js');
    const userController = require('../controller/users.controller');
    const validation = require('../controller/validation.controller.js');
    app.post('/class', validation.validateToken, classController.create);
    app.post('/student',  studentController.create);
    app.post('/class/:classId', classController.update);
    app.post('/student/:studentId',studentController.update);
    app.post('/addattendance/:studentId',studentController.addAttendance);
    app.post('/signup', userController.signup);
    app.post('/login',userController.login)
    app.get('/class', classController.findAll);
    app.get('/class/:classId', classController.findOne);
    app.get('/student/:classId', studentController.findAll);
    app.get('/get-total-attendance/:classId', studentController.getTotalAttendanceForClass)
    app.post('/totalAttendance', studentController.submitTodaysAtendance);
}