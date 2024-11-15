const asyncHandler = require("express-async-handler");
const attenn = require("../models/attendanceModel");
const UserData = require("../models/userDetailsModel");
const AttendanceHistory = require("../models/attendanceHistory");
const individualClassAttendance = require("../models/individualClassAttendance");

const setAttendance = asyncHandler(async (req, res) => {
  const filter = {
    Section: req.query.section,
    Department: req.query.department,
    Regulation: req.query.regulation
  };
  
  const { rollNumbers, type } = req.body;
  const rollNumbersList = await UserData.find(filter, { RollNo: 1, _id: 0 });

  let presentRollNumbers, absentRollNumbers;

  if (type === 'Absentees') {
    absentRollNumbers = rollNumbers;
    presentRollNumbers = rollNumbersList
      .filter(item => !absentRollNumbers.includes(item.RollNo))
      .map(item => item.RollNo);
  } else {
    presentRollNumbers = rollNumbers;
    absentRollNumbers = rollNumbersList
      .filter(item => !presentRollNumbers.includes(item.RollNo))
      .map(item => item.RollNo);
  }



  const currentTime = new Date();
    const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const updateObject = hours < 13 || (hours === 13 && minutes < 20)
    ? { $set: { 'CurrentDay.MorningAttended': 1 } }
    : { $set: { 'CurrentDay.AfternoonAttended': 1 } };

  for (const student of presentRollNumbers) {    
    await attenn.findOneAndUpdate({ RollNo: student }, updateObject);
  }

  for (const student of absentRollNumbers) {
    await attenn.findOneAndUpdate(
      { RollNo: student },
      { $inc: { 'SemesterData.ClassesAttendedForSem': -1, 'MonthlyData.ClassesAttendedForMonth': -1 } }
    );
  }

  AttendanceHistoryManuplation(req, res, type, absentRollNumbers, presentRollNumbers, req.query.time, filter);

  res.status(200).json({
    success: true,
    message: 'Attendance updated successfully',
    attendees: presentRollNumbers.length,
    absentees: absentRollNumbers.length
  });
});

function getCurrentTimestamp(currentDate) {
  return currentDate.toISOString().split('T')[0];
}

function getCurrentPeriod(periods, givenTime) {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  return periods.find(period => {
    const startTime = new Date(`${getCurrentTimestamp(new Date())} ${period.StartTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(`${getCurrentTimestamp(new Date())} ${period.EndTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    return currentTime >= startTime && currentTime <= endTime;
  });
}

const AttendanceHistoryManuplation = asyncHandler(async (req, res, type, rollNumbers, presentrnos, time, filter) => {
  const currentDate = new Date();
  const { startTime, endTime, currentTime } = req.body;
  let periodCode = '';

  await Promise.all(rollNumbers.map(async rno => {
    const rollNumberEntry = await AttendanceHistory.findOne({ RollNumber: rno });
    const currentPeriod = getCurrentPeriod(rollNumberEntry.TimeTable.find(entry => entry.date === getCurrentTimestamp(currentDate)).Periods, startTime, endTime);

    if (currentPeriod) {
      periodCode = currentPeriod.Subjectcode;
      currentPeriod.present = false;
    }

    await rollNumberEntry.save();
  }));

  updateIndividualClassSubjectAttendance(req, res, presentrnos, periodCode, filter);
});

function getCurrentPeriod(periods, startTime, endTime) {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const startTimeFormatted = new Date(`${getCurrentTimestamp(new Date())} ${startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const endTimeFormatted = new Date(`${getCurrentTimestamp(new Date())} ${endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return periods.find(period => {
    const periodStartTime = new Date(`${getCurrentTimestamp(new Date())} ${period.StartTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const periodEndTime = new Date(`${getCurrentTimestamp(new Date())} ${period.EndTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return currentTime >= periodStartTime && currentTime <= periodEndTime;
  });
}

const adjustAttendance = asyncHandler(async (req, res) => {
  const filter = {
    Section: req.query.section,
    Department: req.query.department,
    Regulation: req.query.regulation
  };
  const { selectedDate, startTime, endTime } = req.body;

  const students = await AttendanceHistory.find(filter);
  
  const filteredArr = await Promise.all(students.map(async stu => {
    const currentPeriod = getCurrentPeriod(stu.TimeTable.find(entry => entry.date === selectedDate).Periods, startTime, endTime);
    return { RollNo: stu.RollNumber, Present: currentPeriod.present };
  }));

  res.status(200).json(filteredArr);
});

const adgustAttendanceUpdate = asyncHandler(async (req, res) => {
  const filter = { RollNumber: req.query.rollNo };
  const { selectedDate, startTime, endTime } = req.body;
  
  const students = await AttendanceHistory.findOne(filter);
  const currentPeriod = getCurrentPeriod(students.TimeTable.find(entry => entry.date === selectedDate).Periods, startTime, endTime);

  currentPeriod.present = !currentPeriod.present;
  await students.save();

  res.status(200).send("Document saved successfully");
});

const updateIndividualClassSubjectAttendance = asyncHandler(async (req, res, presentrnos, periodcode, filter) => {
  const current = await individualClassAttendance.findOne(filter);

  if (current) {
    await Promise.all(presentrnos.map(async rollNo => {
      const studentIndex = current.Students.findIndex(student => student.RollNo === rollNo);

      if (studentIndex !== -1) {
        const subjectIndex = current.Students[studentIndex].Subjects.findIndex(subject => subject.SubjectCode === periodcode);

        if (subjectIndex !== -1) {
          current.Students[studentIndex].Subjects[subjectIndex].Attendance += 1;
        }
      }
    }));

    await current.save();
  }
});







module.exports = {setAttendance,adjustAttendance,adgustAttendanceUpdate};






































































  

  
 
// module.exports = {setAttendance,adjustAttendance,adgustAttendanceUpdate}; 






