const bcrypt = require('bcrypt');

async function hashPassword() {
    const myPasswort = 'admin123'
    const hash = await bcrypt.hash(myPasswort,10)
    console.log(hash); //$2b$10$qq6G1QF3/PFlf8VVlWpb.OL4CQ91vkWsTgJxTAInpamPks38IOrxO

}

hashPassword()