const ClassSchema = require('../models/class.model.js');

exports.create = (req,res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message:"Name shouldnot be empty"
        });
    }
    const classScema = new ClassSchema({
        name: req.body.name,
        strength: 0,
        totalAttendance: 0,
        userId: req.session.userId,
        trackAttendance: []
    });
    console.log(req.session.userId)

    classScema.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            {
                message: "Server Error" || err
            }
        );
    })
}

exports.findAll = (req,res) => {
 ClassSchema.find({userId: req.session.userId}).then(classes => {
     res.send(classes);
 }).catch(err => {
     res.status(500).send({
         message: "Server Error"||err
     })
 })   
}

// Update a Class identified by the classId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    // Find note and update it with the request body
    ClassSchema.findByIdAndUpdate(req.params.classId, {
        name: req.body.name,
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.classId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.classId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.classId
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    ClassSchema.findById(req.params.classId)
    .then(classs => {
        if(!classs) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.classId
            });            
        }
        res.send(classs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.classId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.classId
        });
    });
};

exports.addStrength = (classId) => {
    // Validate Request

    ClassSchema.findById(classId)
    .then(cls => {
        // Find Class and update strength it with the request body
    ClassSchema.findByIdAndUpdate(classId, {
        strength: cls.strength + 1,
    }, {new: true})
    })
};


exports.subStrength = (classId) => {
    // Validate Request

    ClassSchema.findById(classId)
    .then(cls => {
        // Find Class and update strength it with the request body
    ClassSchema.findByIdAndUpdate(classId, {
        strength: cls.strength - 1,
    }, {new: true})
    })
};

exports.isClassAvailable = async (classId,res) => {
    await ClassSchema.findById(classId).then(cls => {
        console.log(classId,cls);
        if(!cls)  {
            res(false);
        }
        res(true);
    }).catch(err => {
        res(false)
    });
}