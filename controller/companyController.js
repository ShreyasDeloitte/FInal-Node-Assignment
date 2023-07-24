const { Company } = require("../model/companySchema");

const listParticipantController = async()=>{
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

module.exports == {
    listParticipantController
}