const db = require('../services/db');

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

const listSchools = async (req, res, next) => {
    const { latitude, longitude } = req.query;
    
    const userLat = parseFloat(latitude)
    const userLong = parseFloat(longitude)

    try {
        const schools = await db.query(`SELECT * FROM schools`);
        const sortedSchools = schools.map(school => {
            const distance = haversineDistance(userLat, userLong, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);

    } catch (err) {
        console.error('Error fetching schools:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    listSchools
}