const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/studentsdb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const studentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "No name provided"] },
    id: { type: String, required: [true, "No ID number provided"] },
    img: { type: String, required: true }
  }
);

const studentModel = mongoose.model('students', studentSchema);

exports.getAll = function(sort, next) {
  studentModel.find({}).sort(sort).exec(function(err, result) {
    if (err) throw err;
    var studentObjects = [];

    result.forEach(function(doc) {
      studentObjects.push(doc.toObject());
    });

    next(studentObjects);
  });
};

exports.create = function (obj, next) 
{
  var student = new studentModel(obj);

  student.save(function (err, student){
    next(err, student);
  });
};

exports.query = function(pattern, sort, next) {
  studentModel.find({ name: { $regex: pattern } }).sort(sort).exec( function(err, students){
      next(students);
  });
};

exports.updateOne = function(query, update, obj, next) {
  studentModel.findOneAndUpdate(query, update, obj, function(err, user) {
    next(err, user);
  });
};
