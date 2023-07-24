const { Employee } = require("../model/employeeSchema");
const { HackathonEvent } = require("../model/hackatonEventSchema");
const { registerHackathonEventService } = require("../service/employeeService");


const registerHackathonController = async(req, res) => {
    try {
        const { employeeId, hackathonId } = req.body;
        const employee = await Employee.findOne({employeeId});
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }

        //Find the hackathon by ID
        const hackathon = await HackathonEvent.findOne({hackathonId});
        if (!hackathon) {
          return res.status(404).json({ error: 'Hackathon not found' });
        }
        // Check whether max particpant is execeeded or not
        const maxParticipantCount = hackathon.participants.length();
        if(maxParticipantCount>=hackathon.maxParticipants){
          return res.status(404).json({error:'Max Participant exceeded'});
        }

        // Check whether year of experience is exceeded
        const experience = hackathon.experience;
        if(experience<=1){
          return res.status(404).json({error:'Minimum of 1 year experience expected'});
        }

      // Check whether register date is passed
      const startDate = hackathon.startDate
      if(startDate){
        return res.status(404).json({error:'register date is passed'});
      }


        // Check if the employee is already registered for the hackathon
        if (employee.registeredHackathons.includes(hackathonId)) {
          return res.status(400).json({ error: 'Employee is already registered for this hackathon' });
        }
        const registeredHackathons = await HackathonEvent.find({
          _id: { $in: employee.registeredHackathons },
        });
        const hasSchedulingConflict = registeredHackathons.some(
          (registeredHackathon) => {
            return (
              hackathon.startDate < registeredHackathon.endDate &&
              hackathon.endDate > registeredHackathon.startDate
            );
          }
        );
        if (hasSchedulingConflict) {
          return res
            .status(409)
            .json({
              error:
                "Employee has a scheduling conflict with another registered hackathon",
            });
        }
        // If there are no conflicts, register the employee for the new hackathon
        employee.registeredHackathons.push(hackathon.id);
        await employee.save()
        hackathon.participants.push(employee.id);
        hackathon.maxParticipants = hackathon.maxParticipants - 1;
        hackathon.save()
        .then(() => {
        res.status(200).json({ message: "Employee successfully registered to Hackathon Event" });
        })
        .catch(() => {
        res.status(400).json({ message: "Hackathon registration failed" });
        });    
  }
  catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ error: 'Error registering employee' });
  };
};
  
module.exports = { registerHackathonController };