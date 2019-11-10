module.exports = (app) => {
    const classController = require('../controller/class.controller.js');
    const studentController = require('../controller/student.controller.js');
    app.post('/class', classController.create);
    app.post('/student', studentController.create);
    app.post('/class/:classId', classController.update);
    app.post('/student/:studentId',studentController.update);
    app.post('/addattendance/:studentId',studentController.addAttendance);
    app.get('/class', classController.findAll);
    app.get('/class/:classId', classController.findOne);
    app.get('/student/:classId', studentController.findAll);
}