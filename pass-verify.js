const bcrypt = require('bcrypt');

async function verifyPassword() {
    const myPasswort = 'admin123'
    const hash = '$2b$10$qq6G1QF3/PFlf8VVlWpb.OL4CQ91vkWsTgJxTAInpamPks38IOrxO'
    const isMatch = await bcrypt.compare(myPasswort,hash)
    console.log(isMatch);
}

verifyPassword()