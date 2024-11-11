import * as donationService from '../services/donationService.js';

const getDonations = async (req, res) => {
    try {
        const donations = await donationService.getAllDonations();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching donations' });
    }
};

const addDonation = async (req, res) => {
    const { donorName, address, items, amount } = req.body;
    try {
        const newDonation = await donationService.createDonation(donorName, address, items, parseInt(amount));
        res.json(newDonation);
    } catch (error) {
        res.status(500).json({ error: 'Error adding donation' });
    }
};

export { getDonations, addDonation };
