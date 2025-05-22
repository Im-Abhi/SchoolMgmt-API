const db = require('../services/db');

const addSchool = async (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    try {
        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        const result = await db.query(query, [name, address, latitude, longitude]);

        if (result.affectedRows) {
            res.status(201).json({
                message: "School added Successfully",
                name: name,
                address: address,
                latitude: latitude,
                longitude: longitude
            })
        } else {
            res.status(400).json({
                message: "Couldn't add the school, Please try again!"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(501).json({
            message: "Internal server error, Please try again later !"
        })
    }
}

module.exports = { addSchool }