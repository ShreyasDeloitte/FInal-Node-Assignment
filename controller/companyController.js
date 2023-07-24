const { Company } = require("../model/companySchema");

const listParticipantController = async(req,res)=>{
    try {
        const companyId = req.params.companyId;
        const hackathonId = req.params.hackathonId;
    

        const company = await Company.findById(companyId);
    
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
    
        const hackathon = await HackathonEvent.findById(hackathonId).populate('participants');
    
        if (!hackathon) {
          return res.status(404).json({ message: 'Hackathon not found' });
        }
    
        const organizerId = company.id; 
        if (hackathon.organizer.toString() !== organizerId || company._id.toString() !== hackathon.organizer.toString()) {
          return res.status(403).json({ message: 'Unauthorized. You are not the organizer of this Hackathon or not associated with the specified Company.' });
        }
    
        res.status(200).json({
          companyId: company._id,
          companyName: company.name,
          hackathonId: hackathon._id,
          title: hackathon.title,
          participants: hackathon.participants,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching participants', error: error.message });
      }
}

const deleteHackathonController = async(req,res) =>{
    try {
        const hackathonId = req.params.hackathonId;
        const companyId = req.params.companyId;
    
        const hackathon = await HackathonEvent.findById(hackathonId);
        const company = await Company.findById(companyId);
    
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
    
        if (!hackathon) {
          return res.status(404).json({ message: 'Hackathon not found' });
        }
    
        const organizerId = company.id; 
        if (hackathon.organizer.toString() !== organizerId) {
          return res.status(403).json({ message: 'Unauthorized. You are not the organizer of this Hackathon.' });
        }
    
        await hackathon.remove();
    
        res.status(200).json({ message: 'Hackathon successfully deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting Hackathon', error: error.message });
      }

}

const hostedEventListContoller = async(req,res) =>{
    try {
        const organizerId = req.params.companyId;
    
        const organizer = await Company.findById(organizerId);
    
        if (!organizer) {
          return res.status(404).json({ message: 'Organizer not found' });
        }
    
        const hackathons = await HackathonEvent.find({ organizer: organizer.id });
    
        res.status(200).json({
          organizerId: organizer._id,
          organizerName: organizer.name,
          hackathons,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching hackathons', error: error.message });
      }
}

 const modifyHostedEventController = async(req,res)=>{
  try {
    const companyId = req.params.companyId;
    const hackathonId = req.params.hackathonId;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const hackathon = await HackathonEvent.findById(hackathonId);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    const organizerId = company.id;
    if (hackathon.organizer.toString() !== organizerId || company._id.toString() !== hackathon.organizer.toString()) {
      return res.status(403).json({ message: 'Unauthorized. You are not the organizer of this Hackathon or not associated with the specified Company.' });
    }

    const currentDate = new Date();
    if (currentDate >= hackathon.registrationOpen) {
      return res.status(400).json({ message: 'Registration has already started. Cannot modify the Hackathon.' });
    }

    const updatedHackathon = await HackathonEvent.findByIdAndUpdate(
      hackathonId,
      { $set: req.body },
      { new: true } // To get the updated document as the result
    );

    res.status(200).json({ message: 'Hackathon information updated successfully', hackathon: updatedHackathon });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Hackathon information', error: error.message });
  }
 }
module.exports = {
    listParticipantController,
    deleteHackathonController,
    hostedEventListContoller,
    modifyHostedEventController
}